import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import type { Superhero } from "../types/Superhero";
import SuperheroForm from "./SuperheroForm";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

interface SuperheroModalCardProps {
  openModal: boolean;
  selectedSuperhero: Superhero | null;
  openEditModal: boolean;
  handleCloseDetail: () => void;
  handleEdit: (superhero: Superhero) => void;
  handleDelete: (id: string) => void;
  handleCloseEdit: () => void;
  editingSuperhero: Superhero | undefined;
}

export default function SuperheroModalCard({
  openModal,
  selectedSuperhero,
  openEditModal,
  handleCloseDetail,
  handleEdit,
  handleDelete,
  handleCloseEdit,
  editingSuperhero,
}: SuperheroModalCardProps) {
  return (
    <>
      {openModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseDetail}>
              X
            </button>
            {selectedSuperhero && (
              <div>
                <h2>{selectedSuperhero.nickname}</h2>
                <p>
                  <strong>Real name:</strong> {selectedSuperhero.real_name}
                </p>
                <p>
                  <strong>Origin description:</strong>{" "}
                  {selectedSuperhero.origin_description}
                </p>
                <p>
                  <strong>Superpowers:</strong>{" "}
                  {selectedSuperhero.superpowers.join(", ")}
                </p>
                <p>
                  <strong>Catch phrase:</strong>{" "}
                  {selectedSuperhero.catch_phrase}
                </p>
                <Swiper
                  pagination={{ dynamicBullets: true }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  spaceBetween={50}
                  slidesPerView={1}
                >
                  {selectedSuperhero.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`${VITE_API_URL}${image}`}
                        alt={`${selectedSuperhero.nickname} image ${index + 1}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button onClick={() => handleEdit(selectedSuperhero)}>
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedSuperhero._id!);
                    handleCloseDetail();
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {openEditModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseEdit}>
              ×
            </button>
            <SuperheroForm
              superhero={editingSuperhero}
              onSubmit={handleCloseEdit}
              handleCloseDetail={handleCloseDetail}
            />
          </div>
        </div>
      )}
    </>
  );
}
