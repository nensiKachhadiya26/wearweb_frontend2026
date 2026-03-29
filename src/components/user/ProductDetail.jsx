import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // API call to fetch single product details
    axios
      .get(`/productApi/product/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        toast.error("Product details fetch karva ma bhul thai!");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Maherbani kari ne pehla Login karo!");
      navigate("/login");
      return;
    }

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.warn("Maherbani kari ne size select karo!");
      return;
    }

    try {
      const res = await axios.post(
        "/cartApi/cart",
        {
          product_id: product._id,
          quantity: 1,
          size: selectedSize, // Selected size cart ma mokalva mate
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Product cart ma add thai gayu! 🛒");
        navigate("/user/cartpage");
      }
    } catch (err) {
      console.error("Cart error:", err);
      toast.error("Cart ma add karva ma kaik vandho aavyo.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#FFF0F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff3f6c]"></div>
        <p className="mt-4 text-[#ff3f6c] font-medium">Loading Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-700">Product male nathi!</h2>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-4 text-[#ff3f6c] underline"
        >
          Pacha jao
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF0F5] min-h-screen pb-12">
      <div className="max-w-7xl mx-auto p-4 md:p-10">
        
        {/* Breadcrumb - Optional */}
        <div className="mb-6 text-sm text-gray-500">
           Home / {product.categoryId?.name} / <span className="text-gray-800 font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* --- LEFT SIDE: IMAGE SECTION --- */}
          <div className="md:col-span-7 lg:col-span-6 group">
            <div className="sticky top-24 overflow-hidden rounded-3xl bg-white shadow-2xl border border-pink-100">
              <img
                src={product.image?.[0] || "/placeholder.jpg"}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                style={{ maxHeight: '750px' }}
                alt={product.name}
              />
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTENT SECTION --- */}
          <div className="md:col-span-5 lg:col-span-6 space-y-8 py-4">
            
            {/* Title & Brand */}
            <div className="border-b border-pink-100 pb-6">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-xl text-[#ff3f6c] font-semibold mt-3 tracking-wide uppercase">
                {product.categoryId?.name || "Premium Wear"}
              </p>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-gray-900">₹{product.price}</span>
              <div className="flex flex-col">
                <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-0.5 rounded">Special Offer</span>
                <span className="text-gray-400 text-xs">Inclusive of all taxes</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#ff3f6c] rounded-full"></span>
                Product Details
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description || "Aa product khub j unchi quality na material mathi banavel che je tamne comfort ane style banne apshe."}
              </p>
            </div>

            {/* Size Selection Logic */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Select Size</h3>
                  <span className="text-xs text-[#ff3f6c] font-bold cursor-pointer underline">Size Chart</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 border-2 ${
                        selectedSize === size
                          ? "border-[#ff3f6c] bg-[#ff3f6c] text-white shadow-lg scale-110"
                          : "border-gray-200 bg-white text-gray-700 hover:border-pink-300 hover:text-[#ff3f6c]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* --- ACTION BUTTONS --- */}
            <div className="flex flex-col sm:flex-row gap-5 pt-8">
              <button
                onClick={handleAddToCart}
                className="flex-[2] bg-[#ff3f6c] text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-[#e6335f] shadow-xl shadow-pink-200 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">🛒</span> ADD TO CART
              </button>

              <button
                onClick={() => toast.info("Checkout process jald hi aavse!")}
                className="flex-1 bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200"
              >
                BUY NOW
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-pink-100">
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
                    <span className="bg-pink-100 p-2 rounded-full text-[#ff3f6c]">🚚</span>
                    Fast Delivery
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
                    <span className="bg-pink-100 p-2 rounded-full text-[#ff3f6c]">🔄</span>
                    7 Days Return
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;