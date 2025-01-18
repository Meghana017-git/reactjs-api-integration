import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalQuantity: 0,
  },
  reducers: {
    addCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        existingItem.totalQuantity = existingItem.totalQuantity + 1;
      } else {
        state.cart.push({ ...item, totalQuantity: 1 });
      }
      state.totalQuantity += 1;
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((cartItem) => cartItem.id !== action.payload);
      state.cart = removeItem;
      state.totalQuantity -= 1;
    },
   
  },
});

export const { addCart, removeItem } = CartSlice.actions;
export default CartSlice.reducer;
