import axios from "axios";

const baseUrl = "/api/products";

export const getProductsApi = async () => {
  try {
    const resp = await axios.get(baseUrl);
    const data = resp.data;
    localStorage.setItem("products", JSON.stringify(data));
    console.log("Consulta api");
    return data;
  } catch (error) {
    console.log("Error al obtener productos", error);
    throw error;
  }
};

export const createProductApi = async (product) => {

  //Editar producto si recibimos un id por params
  if (product.id) {
    console.log(product);

    try {
      const resp = await axios.put(`${baseUrl}/${product.id}`, product);
      console.log(resp);
    } catch (error) {
      console.log("Error al actualizar el producto", error);
      throw error;
    }
  } else {
    //Crear un nuevo producto
    try {
      const resp = await axios.post(baseUrl, product);
      const data = resp.data;

      localStorage.setItem("products", JSON.stringify(data));
      console.log("Creado producto");
      return data;
    } catch (error) {
      console.log("Error al creer el producto", error);
      throw error;
    }
  }
};

export const deleteProductApi = async (productId) => {
  try {
    const resp = await axios.delete(`${baseUrl}/${productId}`);
    console.log("Eliminado producto");
    return resp.status === 204;
  } catch (error) {
    console.log("Error al eliminar el producto", error);
    throw error;
  }
}
