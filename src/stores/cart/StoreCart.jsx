import { create } from "zustand";

const useSotreCart = create((set) => ({
  cart:[],
  addProductToCart: (product, cuantity) => set(state => ({
    // cart: state.cart.map(p => p.product.id === product.id ? {...p, cuantity} : p)
    cart: [...state.cart, {id: crypto.randomUUID(), product, cuantity}]
  })),
  removeProductFromCart: (product) => set(state => ({
    cart: state.cart.filter(p => p.id !== product.id)
  })),
  updateProductQuantityCart: (product, cuantity) => set(state => ({
    cart: state.cart.map(p => p.product.id === product.id ? {...p, cuantity: p.cuantity + cuantity} : p)
  })),
  addTotalToCart: (total) => set(state => ({
    cart: [...state.cart, {total: total}]
  })),
  resetCart: () => set( () => ({ cart: []}))
  

}) );

export default useSotreCart;