import { create } from "zustand";

const useSotreCart = create((set) => ({
  cart:[],
  addProductToCart: (product, cuantity) => set(state => ({
    // cart: state.cart.map(p => p.product.id === product.id ? {...p, cuantity} : p)
    cart: [...state.cart, {id: crypto.randomUUID(), product, cuantity}]
  })),
  removeProductCart: (productId) => set(state => ({
    cart: state.cart.filter(p => p.id !== productId)

  })),
  updateProductQuantityCart: (product, cuantity) => set(state => ({
    cart: state.cart.map(p => p.product.id === product.id ? {...p, cuantity: p.cuantity + cuantity} : p)
  })),
  addValuesToCart: (subtotal,total) => set(state => ({
    cart: [...state.cart, {subtotal: subtotal, total: total}]
  })),
  resetCart: () => set( () => ({ cart: []})),
  quantity: 0,
  setQuantity: (newQuantity) => set({ quantity: newQuantity }),


}) );

export default useSotreCart;