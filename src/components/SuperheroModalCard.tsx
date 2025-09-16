import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { Superhero } from "../types/Superhero";
import SuperheroForm from "./SuperheroForm";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { SquarePen, Trash, SquareX } from "lucide-react";

interface SuperheroModalCardProps {
  openModal: boolean;
  openEditModal: boolean;

  handleCloseEdit: () => void;
  handleCloseDetail: () => void;
  handleDelete: (id: string) => void;
  handleEdit: (superhero: Superhero) => void;

  selectedSuperhero: Superhero | null;
  editingSuperhero: Superhero | undefined;
}

export default function SuperheroModalCard({
  openModal,
  openEditModal,

  handleCloseEdit,
  handleCloseDetail,
  handleDelete,
  handleEdit,

  selectedSuperhero,
  editingSuperhero,
}: SuperheroModalCardProps) {
  return (
    <>
      {openModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseDetail}>
              <SquareX />
            </button>
            {selectedSuperhero && (
              <div>
                <div className="modal-header">
                  <h2>{selectedSuperhero.nickname}</h2>
                  <button
                    className="action-btn"
                    onClick={() => handleEdit(selectedSuperhero)}
                  >
                    <SquarePen />
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => {
                      handleDelete(selectedSuperhero._id!);
                      handleCloseDetail();
                    }}
                  >
                    <Trash />
                  </button>
                </div>
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
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  spaceBetween={50}
                  slidesPerView={1}
                >
                  {selectedSuperhero.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`${selectedSuperhero.nickname} image ${index + 1}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      )}
      {openEditModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseEdit}>
              <SquareX />
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
