import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Women = () => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const navigate = useNavigate();

  const allSizes = ["S", "M", "L", "XL", "XXL", "26", "28", "30", "32", "34", "3", "4", "5", "6", "7", "8"];

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

  const handleSizeClick = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
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
        toast.success("Product added to cart! 🛒");
        navigate("/user/cartpage");
      }
    } catch (err) {
      console.error("Add to cart error:", err.response || err);
      toast.error("Failed to add to cart");
    }
  };

  const filteredProducts = products.filter((product) => {
    const isWomen = product.categoryId?.name === "Women";
    
    const matchesCategory = activeFilter === "All" || 
      product.name.toLowerCase().includes(activeFilter.toLowerCase()) ||
      product.subCategoryId?.name?.toLowerCase() === activeFilter.toLowerCase();

    const matchesSize = selectedSizes.length === 0 || 
      product.sizes?.some(size => selectedSizes.includes(size));

    return isWomen && matchesCategory && matchesSize;
  });

  return (
    <div className="bg-[#FFF0F5] min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Women Collection</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* --- Sidebar Filter --- */}
        <div className="w-full md:w-64 bg-white p-5 rounded-xl shadow-sm h-fit border border-pink-100 sticky top-5">
          <h3 className="font-bold mb-4 text-gray-700 border-b pb-2 text-sm uppercase tracking-wider">Categories</h3>
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible mb-6">
            {["All", "Kurti", "Top", "Skirt", "Jeans", "Chappal"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all text-left whitespace-nowrap ${
                  activeFilter === item 
                    ? "bg-[#ff3f6c] text-white shadow-md" 
                    : "bg-white text-gray-600 hover:bg-pink-50 border border-gray-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <h3 className="font-bold mb-4 text-gray-700 border-b pb-2 text-sm uppercase tracking-wider">Select Size</h3>
          <div className="grid grid-cols-4 gap-2">
            {allSizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`py-2 rounded-md text-xs font-bold border transition-all ${
                  selectedSizes.includes(size)
                    ? "border-[#ff3f6c] bg-pink-50 text-[#ff3f6c]"
                    : "border-gray-200 text-gray-400 bg-white hover:border-pink-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {selectedSizes.length > 0 && (
            <button 
              onClick={() => setSelectedSizes([])}
              className="mt-4 w-full text-[11px] text-red-400 font-bold hover:underline"
            >
              RESET SIZES
            </button>
          )}
        </div>

        {/* --- Products Grid --- */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col">
                
                {/* 1. IMAGE - CLICKABLE */}
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
                 
                  <h2 
                    className="text-sm font-semibold text-gray-700 truncate  hover:text-[#ff3f6c] transition-colors"
                  >
                    {product.name}
                  </h2>

                  <p className="text-[#ff3f6c] font-bold text-lg mt-1">₹{product.price}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-1 mb-3">
                      {product.sizes?.slice(0, 4).map(s => (
                        <span key={s} className="text-[9px] font-bold bg-gray-100 text-gray-400 px-1 rounded">
                          {s}
                        </span>
                      ))}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="mt-auto w-full bg-[#ff3f6c] cursor-pointer text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#e6335f] transition-colors shadow-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-24 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400">Oops! No products found with these filters.</p>
                <button onClick={() => {setActiveFilter("All"); setSelectedSizes([])}} className="mt-3 text-[#ff3f6c] font-bold hover:underline">Reset All Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Women;