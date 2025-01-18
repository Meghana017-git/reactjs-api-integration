import React from "react";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      
    </div>
  );
};

export default App;
