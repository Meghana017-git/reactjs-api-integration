import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../cart/CartSlice";

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
 
  useEffect(() => { 
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("error fetching products", error);
    }
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-8">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="max-w-sm border border-gray-200 rounded-lg shadow"
              >
                <img
                  className="w-full h-64 object-contain p-4"
                  src={product.image}
                ></img>
                <div className="px-4 py-2">
                  <h2 className="text-xl font-semibold text-cyan-800">
                    {product.title}
                  </h2>
                  <h5 className="text-xl text-black">₹{product.price}</h5>
                  <p className="">{product.description}</p>
                </div>
                <div className="px-4 py-2">
                <button onClick={() =>  dispatch(addCart(product))} className="bg-blue-500 text-white px-3 py-2">Add to Cart</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Products;
