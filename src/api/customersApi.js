import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BACKEND + "/api/customers"

export const getCustomersApi = async () => {  
  try {
    const resp = await axios.get(baseUrl);
    const {costumers} = resp.data;
    return costumers;
  } catch (error) {
    console.error('Error en la consulta API:', error);
    throw error;    
  }


}