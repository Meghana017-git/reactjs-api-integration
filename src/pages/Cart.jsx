import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../cart/CartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch= useDispatch();
  return (
    <>
      <div className="container mx-auto">
        {cartItems.map((cart) => {
          return (
            <div key={cart.id}>
              <div className="flex align-center gap-10 border border-gray-300 p-2 mb-3">
                <img className="w-25 h-12" src={cart.image} />
                <h2 className="text-xl  text-cyan-600">{cart.title}</h2>
                <h5 className="text-xl text-black">₹{cart.price}</h5>
                <button onClick={() =>dispatch(removeItem(cart.id))} className="bg-red-400 text-white px-2">Remove</button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
};

export default Cart;
