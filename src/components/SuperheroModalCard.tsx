// import { Typography, Modal, IconButton } from "@mui/material";

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SuperheroForm from "./SuperheroForm";
import type { Superhero } from "../types/Superhero";

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
              ×
            </button>
            {selectedSuperhero && (
              <div>
                <h2>{selectedSuperhero.nickname}</h2>
                <p>
                  <strong>Справжнє ім'я:</strong> {selectedSuperhero.real_name}
                </p>
                <p>
                  <strong>Походження:</strong>{" "}
                  {selectedSuperhero.origin_description}
                </p>
                <p>
                  <strong>Суперсили:</strong>{" "}
                  {selectedSuperhero.superpowers.join(", ")}
                </p>
                <p>
                  <strong>Крилата фраза:</strong>{" "}
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
                        src={`http://localhost:5001${image}`}
                        alt={`${selectedSuperhero.nickname} image ${index + 1}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button onClick={() => handleEdit(selectedSuperhero)}>
                  Редагувати
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedSuperhero._id!);
                    handleCloseDetail();
                  }}
                >
                  Видалити
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
            />
          </div>
        </div>
      )}
    </>
  );
}
