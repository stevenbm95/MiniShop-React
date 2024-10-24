import { create } from "zustand";
import { getProductsApi, createProductApi, deleteProductApi } from "../../api/productsApi";

const useStoreProducts = create((set) => ({
  //Estado del formulario
  product: {},

  setFormData: (data) => set(() => ({ product: data })),
  clearFormData: () => set(() => ({ product: {} })),

  //Crear un producto
  products: [],
  loadProducts: async () => {
    const localStorageData = localStorage.getItem("products");
    if(localStorageData ) {   
      const apiProducts = await getProductsApi();
      localStorage.setItem("products", JSON.stringify(apiProducts));
      const parsedProducts = JSON.parse(localStorageData);
      set(() => ({ products: parsedProducts }));
    }else{
      const apiProducts = await getProductsApi();
      console.log("apiProducts", apiProducts);      
      set({ products: apiProducts});
      localStorage.setItem("products", JSON.stringify(apiProducts));
    }
  },


  getProducts: () => set((state) => ({ products: state.products })),
  createProduct: async (product) =>{     
     await  createProductApi(product);
     const apiProducts = await getProductsApi();

     set({ products: apiProducts});
  },
  deleteProduct: async (pdouctId) => {
    await deleteProductApi(pdouctId);
     const apiProducts = await getProductsApi();
     set({ products: apiProducts});
  },

    // createProduct: ({ nameProduct, price, stock, description }) =>
    //   set((state) => {
    //     const newProduct = {
    //       id: crypto.randomUUID(),
    //       nameProduct,
    //       price,
    //       stock,
    //       description,
    //       image: "",
    //       isActive: true,
    //     };
    //     const newArray = [...state.products, newProduct];
    //     localStorage.setItem("products", JSON.stringify(newArray));
    //     return {
    //       products: newArray,
    //     };
    //   }),
  // updateProducts: (productId, data) => set((state) => {
    
  //   const newArray = state.products.map((p) => {
  //     if (p.id === productId) {
  //       const updatedProduct = {
  //         ...p,
  //         ...data,
  //       };
  //       return updatedProduct;
  //     }
  //     return p;
  //   });
  //   localStorage.setItem("products", JSON.stringify(newArray));
  //   return {
  //     products: newArray,
  //   };
  // }),
  // deleteProduct: (productId) => set((state) => {
  //   const newArray = state.products.filter((p) => p.id !== productId);
  //   localStorage.setItem("products", JSON.stringify(newArray));
  //   return {
  //     products: newArray,
  //   };
  // }),
  isEditing: false,
  setIsEditing: (isEditing) => set(() => ({ isEditing })),
  getIsEditing: () => set((state) => ({ isEditing: state.isEditing })),
}));

export default useStoreProducts;
