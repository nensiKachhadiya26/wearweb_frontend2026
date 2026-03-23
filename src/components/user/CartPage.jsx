import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const totalItemsCount = cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
  
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
        setTotalPrice(0);
      }
    } catch (err) {
      console.error("Cart Fetch Error:", err);
      toast.error("Cart Load Error!");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    if (!items || items.length === 0) {
      setTotalPrice(0);
      return;
    }

    const total = items.reduce((acc, item) => {
      const product = item.product_id;
      const price = Number(product?.price) || 0;
      const qty = Number(item.quantity) || 0;
      return acc + (price * qty);
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
      toast.error("Could not remove item!");
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.warning("Your Cart Is Empty..!");
      return;
    }

    navigate("/user/checkout", { 
      state: { 
        cartItems: cartItems, 
        totalAmount: totalPrice 
      } 
    });
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
          <p className="text-gray-500 text-xl font-medium mb-6">Your Cart Is Empty</p>
          <button onClick={() => navigate("/user/home")} className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition">
            Shop Now
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
         
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-6 w-full">
                  <img 
                    src={item.product_id?.image?.[0] || item.product_id?.image || "https://via.placeholder.com/150"} 
                    className="w-24 h-24 object-cover rounded-xl border border-pink-100"
                    alt="product"
                  />
                  <div className="flex-1">
                    <h2 className="font-bold text-lg text-gray-800">{item.product_id?.name}</h2>
                    <p className="text-pink-600 font-extrabold text-xl">₹{item.product_id?.price}</p>
                    <div className="mt-2">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                        Qty: {item?.quantity || 0}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemove(item.product_id?._id)} 
                  className="text-red-500 font-medium p-2 hover:bg-red-50 rounded-lg mt-4 sm:mt-0 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          
          <div className="lg:col-span-1">
            <div className="sticky top-10 bg-white p-6 rounded-3xl shadow-md border-t-8 border-pink-500">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h3>
              <div className="space-y-4 mb-6 text-gray-600">
                <div className="flex justify-between">
                  <span>Total Items:</span>
                  <b className="text-gray-900">{totalItemsCount}</b>
                </div>
                <div className="flex justify-between font-bold text-gray-900 border-t pt-4 text-xl">
                  <span>Total Payable:</span>
                  <span className="text-pink-600">₹{totalPrice}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder} 
                className="w-full bg-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-pink-600 shadow-lg transition active:scale-95"
              >
                Place Order 💳
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;