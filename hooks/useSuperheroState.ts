/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { fetchSuperheroes, deleteSuperhero } from "../src/utils/api";
import type { Superhero } from "../src/types/Superhero";

export function useSuperheroState() {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSuperhero, setSelectedSuperhero] = useState<Superhero | null>(
    null
  );
  const [editingSuperhero, setEditingSuperhero] = useState<
    Superhero | undefined
  >(undefined);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchSuperheroes();
      setSuperheroes(data);
    } catch (err: any) {
      console.error("Error fetching superheroes:", err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenDetail = useCallback((superhero: Superhero) => {
    setSelectedSuperhero(superhero);
    setOpenModal(true);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setOpenModal(false);
    setSelectedSuperhero(null);
  }, []);

  const handleEdit = useCallback((superhero: Superhero) => {
    setEditingSuperhero(superhero);
    setOpenEditModal(true);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setOpenEditModal(false);
    setEditingSuperhero(undefined);
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        await deleteSuperhero(id);
        fetchData();
      } catch (err: any) {
        console.error("Error deleting superhero:", err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchData]
  );

  const handleCreate = useCallback(() => {
    setEditingSuperhero(undefined);
    setOpenEditModal(true);
  }, []);

  return {
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
  };
}
