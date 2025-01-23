import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CartSlice from "../cart/CartSlice";

const persistConfig = {
  key: "cart",
  storage,
};

const persistedReducer = persistReducer(persistConfig, CartSlice);
export const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
