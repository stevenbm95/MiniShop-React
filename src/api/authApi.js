import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_BACKEND}/api`;


export const register = async ( userData) => {
  return await axios.post(`${baseUrl}/users`, userData)
}

export const login = async ( userData ) => {
  return await axios.post(`${baseUrl}/users/login`, userData);
}