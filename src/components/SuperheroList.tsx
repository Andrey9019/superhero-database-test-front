import { useState, useEffect } from "react";

import axios from "axios";
import type { Superhero } from "../types/Superhero";
import SuperheroModalCard from "./SuperheroModalCard";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function SuperheroList() {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSuperhero, setSelectedSuperhero] = useState<Superhero | null>(
    null
  );
  const [editingSuperhero, setEditingSuperhero] = useState<
    Superhero | undefined
  >(undefined);
  const [openEditModal, setOpenEditModal] = useState(false);

  const fetchSuperheroes = async () => {
    try {
      const response = await axios.get(`${VITE_API_URL}/api/superheroes`);
      setSuperheroes(response.data);
    } catch (err) {
      console.error("Error fetching superheroes:", err);
    }
  };

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const handleOpenDetail = (superhero: Superhero) => {
    setSelectedSuperhero(superhero);
    setOpenModal(true);
  };

  const handleCloseDetail = () => {
    setOpenModal(false);
    setSelectedSuperhero(null);
  };

  const handleEdit = (superhero: Superhero) => {
    setEditingSuperhero(superhero);
    setOpenEditModal(true);
  };

  const handleCloseEdit = () => {
    setOpenEditModal(false);
    setEditingSuperhero(undefined);
    fetchSuperheroes();
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${VITE_API_URL}/api/superheroes/${id}`);
      fetchSuperheroes();
    } catch (err: any) {
      console.error(
        "Error deleting superhero:",
        err.response?.data || err.message
      );
    }
  };

  const handleCreate = () => {
    setEditingSuperhero(undefined);
    setOpenEditModal(true);
  };

  return (
    <main>
      <button onClick={handleCreate}>Add a superhero</button>
      <div className="superhero-grid">
        {superheroes.map((superhero) => (
          <div
            className="superhero-card"
            key={superhero._id}
            onClick={() => handleOpenDetail(superhero)}
          >
            {superhero.images[0] && (
              <img
                src={`${VITE_API_URL}/${superhero.images[0]}`}
                alt={superhero.nickname}
              />
            )}
            <p>{superhero.nickname}</p>
          </div>
        ))}
      </div>
      <SuperheroModalCard
        openModal={openModal}
        selectedSuperhero={selectedSuperhero}
        openEditModal={openEditModal}
        handleCloseDetail={handleCloseDetail}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleCloseEdit={handleCloseEdit}
        editingSuperhero={editingSuperhero}
      />
    </main>
  );
}
