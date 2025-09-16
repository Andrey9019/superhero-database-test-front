/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useState, useEffect } from "react";
import type { Superhero } from "../types/Superhero";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

interface SuperheroFormProps {
  superhero?: Superhero;
  onSubmit: () => void;
  handleCloseDetail?: () => void;
}

export default function SuperheroForm({
  superhero,
  onSubmit,
  handleCloseDetail,
}: SuperheroFormProps) {
  const [formData, setFormData] = useState({
    nickname: superhero?.nickname || "",
    real_name: superhero?.real_name || "",
    origin_description: superhero?.origin_description || "",
    superpowers: superhero?.superpowers.join(", ") || "",
    catch_phrase: superhero?.catch_phrase || "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    superhero?.images || []
  );
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (images.length > 0) {
      const previews = images.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
      return () => previews.forEach((preview) => URL.revokeObjectURL(preview));
    }
  }, [images]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (images.length + newImages.length > 5) {
        setError("Max 5 images");
        return;
      }
      setImages((prev) => [...prev, ...newImages]);
      setError("");
    }
  };

  const removeNewImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = async (index: number) => {
    if (superhero) {
      const newExisting = [...existingImages];
      newExisting.splice(index, 1);
      console.log("Removing image:", newExisting);
      try {
        await axios.put(`${VITE_API_URL}/api/superheroes/${superhero._id}`, {
          images: newExisting,
        });
        setExistingImages(newExisting);
      } catch (err: any) {
        console.error(
          "Error removing image:",
          err.response?.data || err.message
        );
        setError("Image deletion error");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length + existingImages.length === 0) {
      setError("Please add at least one image.");
      return;
    }
    setIsLoading(true);
    const data = new FormData();
    data.append("nickname", formData.nickname);
    data.append("real_name", formData.real_name);
    data.append("origin_description", formData.origin_description);
    data.append(
      "superpowers",
      JSON.stringify(formData.superpowers.split(", ").map((s) => s.trim()))
    );
    data.append("catch_phrase", formData.catch_phrase);
    data.append("images", JSON.stringify(existingImages));
    images.forEach((image) => data.append("images", image));

    try {
      const url = superhero
        ? `${VITE_API_URL}/api/superheroes/${superhero._id}`
        : `${VITE_API_URL}/api/superheroes`;
      const method = superhero ? "put" : "post";

      await axios[method](url, data);
      onSubmit();
      if (handleCloseDetail) handleCloseDetail();
      setFormData({
        nickname: "",
        real_name: "",
        origin_description: "",
        superpowers: "",
        catch_phrase: "",
      });
      setImages([]);
      setImagePreviews([]);
      setExistingImages([]);
      setError("");
    } catch (err: any) {
      console.error("Error:", err.response?.data || err.message);
      setError(
        "Error: " + (err.response?.data?.error || "Something went wrong")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        Nickname:
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Real name:
        <input
          type="text"
          name="real_name"
          value={formData.real_name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Origin description:
        <input
          type="text"
          name="origin_description"
          value={formData.origin_description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Superpowers (with comma):
        <input
          type="text"
          name="superpowers"
          value={formData.superpowers}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Catch phrase:
        <input
          type="text"
          name="catch_phrase"
          value={formData.catch_phrase}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Image (up to 5):
        <input
          type="file"
          name="images"
          accept=".jpg,.png"
          multiple
          onChange={handleImageChange}
        />
      </label>
      {existingImages.length > 0 && (
        <>
          <h4>Image:</h4>
          <div className="image-preview-container">
            {existingImages.map((image, index) => (
              <div className="image-preview" key={index}>
                <img
                  src={image}
                  alt="Existing image"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {imagePreviews.length > 0 && (
        <>
          <h4>Image:</h4>
          <div className="image-preview-container">
            {imagePreviews.map((preview, index) => (
              <div className="image-preview" key={index}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <button type="button" onClick={() => removeNewImage(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? (
          <div className="spinner small"></div>
        ) : superhero ? (
          "Update"
        ) : (
          "Create"
        )}
      </button>
    </form>
  );
}
