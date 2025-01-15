import { createSlice } from "@reduxjs/toolkit";

 const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addCart: (state, action) => {
      state.cart.push(action.payload);
    },
  },
});

export const { addCart } = CartSlice.actions;
export default CartSlice.reducer;