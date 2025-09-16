import axios from "axios";

export const API_URL = process.env.VITE_API_URL;

export async function fetchSuperheroes() {
  const response = await axios.get(`${API_URL}/api/superheroes`);
  return response.data;
}

export async function deleteSuperhero(id: string) {
  const response = await axios.delete(`${API_URL}/api/superheroes/${id}`);
  return response.data;
}

export async function createSuperhero(data: FormData) {
  const response = await axios.post(`${API_URL}/api/superheroes`, data);
  return response.data;
}

export async function updateSuperhero(id: string, data: FormData) {
  const response = await axios.put(`${API_URL}/api/superheroes/${id}`, data);
  return response.data;
}

export async function updateSuperheroImages(id: string, images: string[]) {
  const response = await axios.put(`${API_URL}/api/superheroes/${id}`, {
    images,
  });
  return response.data;
}
