import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BACKEND + "/api/users";

export const getUsersApi = async () => {
  try {
    const resp = await axios.get(baseUrl);
    const data = resp.data;
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("Error al obtener usuarios", error);
    throw error;
  }
}

export const getUserByIdAPi = async (id) => {
  try {
    const resp = await axios.get(`${baseUrl}/${id}`);
    const data = resp.data;
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("Error al obtener usuarios", error);
    throw error;
  }
}