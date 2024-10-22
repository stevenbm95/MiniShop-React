import { create } from "zustand";

const getLocalStorage = () => {
  const localStorageData = localStorage.getItem("products");
  if (localStorageData) {
    return JSON.parse(localStorageData);
  } else {
    return [];
  }
};

const useStoreProducts = create((set) => ({
  //Estado del formulario
  product: {},

  setFormData: (data) => set(() => ({ product: data })),
  clearFormData: () => set(() => ({ product: {} })),

  //Crear un producto
  products: getLocalStorage(),
  getProducts: () => set((state) => ({ products: state.products })),
  createProduct: ({ nameProduct, price, stock, description }) =>
    set((state) => {
      const newProduct = {
        id: crypto.randomUUID(),
        nameProduct,
        price,
        stock,
        description,
        image: "",
        isActive: true,
      };
      const newArray = [...state.products, newProduct];
      localStorage.setItem("products", JSON.stringify(newArray));
      return {
        products: newArray,
      };
    }),
  updateProducts: (productId, data) => set((state) => {
    
    const newArray = state.products.map((p) => {
      if (p.id === productId) {
        const updatedProduct = {
          ...p,
          ...data,
        };
        return updatedProduct;
      }
      return p;
    });
    localStorage.setItem("products", JSON.stringify(newArray));
    return {
      products: newArray,
    };
  }),
  deleteProduct: (productId) => set((state) => {
    const newArray = state.products.filter((p) => p.id !== productId);
    localStorage.setItem("products", JSON.stringify(newArray));
    return {
      products: newArray,
    };
  }),
  isEditing: false,
  setIsEditing: (isEditing) => set(() => ({ isEditing })),
  getIsEditing: () => set((state) => ({ isEditing: state.isEditing })),
}));

export default useStoreProducts;
