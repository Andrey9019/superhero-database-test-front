import { useSuperheroState } from "../../hooks/useSuperheroState";
import SuperheroModalCard from "./SuperheroModalCard";
import { Plus } from "lucide-react";

export default function SuperheroList() {
  const {
    superheroes,
    openModal,
    openEditModal,
    isLoading,
    selectedSuperhero,
    editingSuperhero,

    handleOpenDetail,
    handleCloseDetail,
    handleEdit,
    handleCloseEdit,
    handleDelete,
    handleCreate,
  } = useSuperheroState();

  return (
    <main>
      <div className="headermain">
        <button className="add-button" onClick={handleCreate}>
          Add a superhero <Plus />
        </button>
      </div>
      {isLoading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading superheroes...</p>
        </div>
      ) : (
        <div className="superhero-grid">
          {superheroes.map((superhero) => (
            <div
              className="superhero-card"
              key={superhero._id}
              onClick={() => handleOpenDetail(superhero)}
            >
              {superhero.images[0] && (
                <img src={superhero.images[0]} alt={superhero.nickname} />
              )}
              <p>{superhero.nickname}</p>
            </div>
          ))}
        </div>
      )}
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
