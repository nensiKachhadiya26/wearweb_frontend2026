import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Kids = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("productApi/products",{ headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddToCart = async (productId) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first!"); // જો toast ન ચાલતું હોય તો alert ચેક કરવા માટે
            navigate("/login");
            return;
        }

        // URL બરાબર ચેક કરજો (તમારા backend routes મુજબ)
        const res = await axios.post("/cartApi/cart", 
            { 
                product_id: productId, 
                quantity: 1 
            }, 
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        if (res.status === 201 || res.status === 200) {
            console.log("Cart updated:", res.data);
            if (typeof toast !== 'undefined') {
                toast.success("Product added to cart! 🛒");
            } else {
                alert("Product added to cart!");
            }
            navigate("/user/cartpage");
        }
    } catch (err) {
        console.error("Add to cart error:", err.response || err);
        if (err.response && err.response.status === 404) {
            alert("API Path not found (404). Please check your Backend Routes.");
        }
    }
};
  // ✅ filter correct
  const kidsProducts = products.filter(
    (product) => product.categoryId?.name === "Kids"
  );

  return (
    <div className="bg-[#FFF0F5] min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-6">Kids Collection</h1>
 
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {kidsProducts.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">

            <img
              src={product.image?.[0] || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-64 object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h2 className="text-sm font-semibold">{product.name}</h2>
              <p className="text-pink-500 font-bold">₹{product.price}</p>

              <button
                onClick={() => handleAddToCart(product._id)}
                className="mt-3 w-full bg-pink-500 text-white py-1 rounded hover:bg-pink-600" >
                Add to Cart
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Kids;