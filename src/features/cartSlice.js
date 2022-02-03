import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const index = state.cart.findIndex(product => product.id === action.payload.id)
      // adding the product.
      if (index === -1) {
        state.cart.push(action.payload);
      } else {
        // updating its quantity.
        state.cart[index].quantity = parseInt(action.payload.quantity);
      }
    },
    updateGift: (state, action) => {
      const {id, gift} = action.payload;
      const index = state.cart.findIndex((obj) => obj.id === id);
      if (index !== -1) state.cart[index].gift = gift;
    },
    deleteProduct: (state, action) => {
      const index = action.payload;
      state.cart.splice(index, 1);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { 
  addProduct, 
  deleteProduct, 
  updateGift,
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = state => state.cart.cart;