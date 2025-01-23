import { createSlice, current } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalQuantity: 0,
    totalAmount: 0,
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
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === action.payload
      );
      if (existingItem) {
        state.totalQuantity = state.totalQuantity - existingItem.totalQuantity;
        const removeItem = state.cart.filter(
          (cartItem) => cartItem.id !== action.payload
        );
        state.cart = removeItem;
      }
    },
    decreaseCart: (state, action) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (existingItem) {
        if (existingItem.totalQuantity > 1) {
          existingItem.totalQuantity -= 1;
        } else {
          setButtonDisabled(true);
        }
        state.totalQuantity -= 1;
      }
    },
    increaseCart: (state, action) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (existingItem) {
        existingItem.totalQuantity += 1;
        state.totalQuantity += 1;
      }
    },
    totalCartAmount: (state, action) => {
      const { total, quantity } = state.cart.reduce(
        (cartTotal, currentItems) => {
          const { totalQuantity, price } = currentItems;
          const sumCart = totalQuantity * price;

          cartTotal.total = cartTotal.total + sumCart;

          cartTotal.quantity += totalQuantity;
          return cartTotal;
        },

        { total: 0, quantity: 0 }
      );
      state.totalAmount = total;
      state.totalQuantity = quantity;
    },
    clearAllCart: (state, action) => {
      if (state.cart.length > 0) {
        state.cart = [];
      }
    },
  },
});

export const {
  addCart,
  removeItem,
  decreaseCart,
  increaseCart,
  totalCartAmount,
  clearAllCart,
} = CartSlice.actions;
export default CartSlice.reducer;
