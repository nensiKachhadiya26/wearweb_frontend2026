import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Beauty = () => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All"); // ✅ Filter state add karyu
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("productApi/products", {
      headers: {
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
        alert("Please login first!");
        navigate("/login");
        return;
      }

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
        if (typeof toast !== 'undefined') {
          toast.success("Product added to cart! 🛒");
        } else {
          alert("Product added to cart!");
        }
        navigate("/user/cartpage");
      }
    } catch (err) {
      console.error("Add to cart error:", err.response || err);
    }
  };

  // ✅ Beauty category + Active Filter logic
  const filteredProducts = products.filter((product) => {
    const isBeauty = product.categoryId?.name === "Beauty";
    if (activeFilter === "All") return isBeauty;
    // Name mathi category shoahse
    return isBeauty && product.name.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <div className="bg-[#FFF0F5] min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Beauty Collection</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* --- Sidebar Filter Start --- */}
        <div className="w-full md:w-52 bg-white p-4 rounded-xl shadow-sm h-fit border border-pink-100">
          <h3 className="font-bold mb-4 text-gray-700 border-b pb-2 text-sm uppercase">Filters</h3>
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {["All", "Lipstick", "Perfume", "Foundation", "Moisturizer", "Face Wash"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap text-left ${
                  activeFilter === item
                    ? "bg-[#ff3f6c] text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-pink-50 border border-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {/* --- Sidebar Filter End --- */}

        {/* --- Products Grid Start --- */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col"
              >
                <div 
                  className="aspect-[3/4] w-full overflow-hidden bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/user/productdetail/${product._id}`)}
                >         
                 <img
                    src={product.image?.[0] || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-sm font-semibold text-gray-800 truncate">
                    {product.name}
                  </h2>
                  <p className="text-[#ff3f6c] font-bold text-lg mt-1">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="mt-auto w-full bg-[#ff3f6c] cursor-pointer text-white py-2 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                Beauty section ma "{activeFilter}" category ma haji products nathi.
              </div>
            )}
          </div>
        </div>
        {/* --- Products Grid End --- */}
      </div>
    </div>
  );
};

export default Beauty;