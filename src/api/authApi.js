import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_BACKEND}/api`;


export const registerUser = async ( userData) => {
  return await axios.post(`${baseUrl}/users`, userData)
}

export const login = async ( userData ) => {
  try {    
    return await axios.post(`${baseUrl}/users/login`, userData);
  } catch (error) {
    console.log(error);    
  }
  
}