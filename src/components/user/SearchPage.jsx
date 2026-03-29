import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q"); // URL માંથી સર્ચ મેળવો

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token"); // ટોકન મેળવો
      const res = await axios.get("/productApi/products", {
        headers: {
          Authorization: `Bearer ${token}` // હેડરમાં ટોકન પાસ કરો
        }
      });
      setProducts(res.data.data);
    } catch (err) {
      console.error("Search fetch error:", err);
      // જો ટોકન એક્સપાયર થઈ ગયું હોય તો લોગિન પર મોકલી શકાય
    }
  };

  fetchProducts();
}, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query?.toLowerCase()) ||
    p.subCategoryId?.name?.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#FFF0F5] min-h-screen">
      <h2 className="text-xl font-bold mb-6 text-gray-700">
        Results for: <span className="text-pink-500">"{query}"</span>
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition">
             <img src={product.image?.[0]} className="w-full aspect-[3/4] object-cover rounded-lg mb-3" />
             <h3 className="font-bold text-sm truncate">{product.name}</h3>
             <p className="text-pink-500 font-bold">₹{product.price}</p>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-400">કંઈ મળ્યું નથી, કંઈક બીજું સર્ચ કરો!</div>
      )}
    </div>
  );
};

export default SearchPage;