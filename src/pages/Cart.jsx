import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCart,
  increaseCart,
  removeItem,
  totalCartAmount,
  clearAllCart,
} from "../cart/CartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  const dispatch = useDispatch();
  
  const handleIncreaseCart = (cartid) => {
    dispatch(increaseCart({ id: cartid }));
    
  };
  useEffect(() => {
    dispatch(totalCartAmount());
  }, [dispatch, cartItems])
  
   const handlePayment = () => {
     const options = {
       key: "rzp_test_oQv2jp6M7fDLH6", 
       amount: totalAmount * 100, 
       currency: "INR",
       name: "Ecommerce App",
       description: "Testing",
       handler: function (response) {
         alert("Payment Successful!");
         console.log(response); 
       },
       prefill: {
         name: "Meghana K", 
         email: "kulalmeghu@gmail.com", 
         contact: "7356716131", 
       },
       theme: {
         color: "#3399cc",
       },
     };

     const rzp = new window.Razorpay(options);
     rzp.open();

     rzp.on("payment.failed", function (response) {
       alert("Payment Failed!");
       console.error(response.error); 
     });
   };

  return (
    <>
      <div className="container mx-auto">
        <button
          className="bg-blue-500 text-white px-2 py-2 hover:bg-blue-700"
          onClick={() => dispatch(clearAllCart())}
        >
          Clear All
        </button>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            {cartItems.length === 0 ? (
              <div className="text-center py-10">
                <h1 className="text-4xl text-semibold"> Cart Empty</h1>
              </div>
            ) : (
              cartItems.map((cart) => {
                return (
                  <div key={cart.id}>
                    <div className="border border-gray-300 p-2 mb-3">
                      <img className="w-50 h-24" src={cart.image} />

                      <h2 className="text-xl  text-cyan-600">{cart.title}</h2>
                      <h5 className="text-xl text-black">
                        ₹{cart.price * cart.totalQuantity}
                      </h5>
                      <div className="flex align-center gap-4 my-3">
                        <button
                          onClick={() =>
                            dispatch(decreaseCart({ id: cart.id }))
                          }
                        >
                          <AiOutlineMinus className="text-xl border border-gray-500" />
                        </button>
                        <span>{cart.totalQuantity}</span>
                        <button onClick={() => handleIncreaseCart(cart.id)}>
                          <AiOutlinePlus className="text-xl  border border-gray-500" />
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeItem(cart.id))}
                        className="bg-red-400 hover:bg-red-600 text-white px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="">
            <div className="border border-gray-300 px-4 py-4 h-screen">
              <h1 className="text-2xl font-semibold">Price Details</h1>
              <p>Price {cartItems.length} items </p>
              <p>Total Amount {totalAmount}</p>
              <button
                onClick={handlePayment}
                className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
