import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("/cartApi/carts", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data && res.data.data && res.data.data.length > 0) {
        const items = res.data.data[0].items || [];
        setCartItems(items);
        calculateTotal(items); 
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Cart Fetch Error:", err);
      toast.error("Cart Load Generate Error!");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => {
      return acc + (item.product_id?.price * item.quantity || 0);
    }, 0);
    setTotalPrice(total);
  };

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/cartApi/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("Item removed! 🗑️");
      fetchCart(); 
    } catch (err) {
      console.error("Remove Error:", err);
      toast.error("Not Any Item Remove!");
    }
  };

  const handlePlaceOrder = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post("/orderApi/order", 
        { total_amount: totalPrice }, 
        { headers: { Authorization: `Bearer ${token}` } }
        );

        if(res.status === 201) {
            alert("Order Success! 🎉");
            navigate("/user/home");
        }
    } catch (err) {
        console.log("Order Error", err);
    }
};

  useEffect(() => {
    fetchCart();
  }, []);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF0F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-500"></div>
        <span className="ml-4 text-pink-500 font-bold text-xl">Loading your bag...</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-[#FFF0F5] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-pink-600 font-serif border-b-2 border-pink-200 pb-2">
        My Shopping Bag 🛍️
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl shadow-lg text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-500 text-xl font-medium mb-6">Your Cart Is Empty</p>
          <button 
            onClick={() => window.location.href = "/user/men"} 
            className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
                <div className="flex items-center gap-6 w-full">
                  <img 
                    src={item.product_id?.image?.[0] || "https://via.placeholder.com/150"} 
                    alt={item.product_id?.name} 
                    className="w-24 h-24 object-cover rounded-xl border border-pink-50"
                  />
                  <div className="flex-1">
                    <h2 className="font-bold text-lg text-gray-800">{item.product_id?.name}</h2>
                    <p className="text-pink-600 font-extrabold text-xl">₹{item.product_id?.price}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">Quantity: {item.quantity}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleRemove(item.product_id?._id)}
                  className="mt-4 sm:mt-0 bg-red-50 text-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-10 bg-white p-6 rounded-3xl shadow-md border-t-8 border-pink-500">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Total Items:</span>
                  <span className="font-bold">{cartItems.length}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span className="text-green-500 font-bold font-gujarati italic">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-4">
                  <span>Total Payable:</span>
                  <span className="text-pink-600">₹{totalPrice}</span>
                </div>
              </div>

              <button 
              onClick={handlePlaceOrder}
                className="w-full bg-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-pink-600 shadow-lg shadow-pink-200 transition active:scale-95">
                Place Order 💳
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">Safe & Secure Payments</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartPage;