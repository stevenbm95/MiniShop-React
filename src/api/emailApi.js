import axios from 'axios';

const url = import.meta.env.VITE_API_BACKEND 

export const emailAPi = async(emailData) => {

  try {
    const resp = await axios.post(`${url}/api/mailMasive`, emailData);

    return resp.status === 200;
    
  } catch (error) {
    console.log('Error en la consulta API:', error);
    throw error;
  }
}