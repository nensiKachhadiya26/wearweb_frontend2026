import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaShoppingCart, FaUserCircle, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const loadData = async () => {
        try {
            setLoading(true);
            const pRes = await axios.get(`/productApi/product/${id}`);
            setProduct(pRes.data.data);
            const rRes = await axios.get(`/reviewApi/product/${id}`);
            setReviews(rRes.data.data || []);
        } catch (err) {
            toast.error("પ્રોડક્ટ લોડ કરવામાં ભૂલ આવી!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (id) loadData(); }, [id]);

    const handleAddToCart = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) { toast.error("Please login first! 🔐"); return; }

            const res = await axios.post("/cartApi/cart", { 
                product_id: productId, 
                quantity: 1
            }, { headers: { Authorization: `Bearer ${token}` } });

            if (res.status === 201 || res.status === 200) {
                toast.success('Product added! 🛒');
                setTimeout(() => navigate('/user/cartpage'), 500);
            }
        } catch (error) {
            toast.error("Error adding to cart");
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token || !comment.trim()) { toast.error("Check login or comment!"); return; }

            const res = await axios.post("/reviewApi/add", {
                productId: id, rating, comment
            }, { headers: { Authorization: `Bearer ${token}` } });

            if (res.status === 201 || res.status === 200) {
                toast.success('Review added!');
                setComment(""); setRating(5); loadData();
            }
        } catch (error) { toast.error("Error submitting review"); }
    };

    if (loading) return <div className="p-10 text-center text-pink-600 font-bold">Loading...</div>;
    if (!product) return <div className="p-10 text-center text-red-500">Not Found!</div>;

    const imageUrl = product.image?.[0]?.startsWith('http') 
        ? product.image[0] 
        : `http://localhost:3000/${product.image?.[0]?.replace(/\\/g, '/')}`;

    return (
        <div className="max-w-5xl mx-auto p-4 font-sans text-sm md:text-base">
            
            {/* --- Product Main Section --- */}
            <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                
               
                <div className="w-full md:w-1/3 flex items-center justify-center bg-gray-50 rounded-xl p-4">
                    <img 
                        src={imageUrl} 
                        alt={product.productName} 
                        className="max-h-64 md:max-h-80 w-auto object-contain rounded-lg mix-blend-multiply transition-transform hover:scale-105" 
                    />
                </div>

             
                <div className="w-full md:w-2/3 flex flex-col justify-center space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">{product.productName}</h1>
                    <div className="text-2xl font-black text-[#ff3f6c]">₹{product.price}</div>
                    <p className="text-gray-500 leading-snug border-l-2 border-pink-200 pl-3">
                        {product.description || "No Description Available."}
                    </p>
                    
                    <button 
                        onClick={() => handleAddToCart(product._id)}
                        className="w-full md:w-48 bg-[#ff3f6c] hover:bg-[#e0375f] text-white py-2.5 rounded-lg  cursor-pointer font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                        <FaShoppingCart size={16} /> Add to Cart
                    </button>
                </div>
            </div>

            {/* --- Review Section --- */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Review Form (Compact) */}
                <div className="md:col-span-1 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-fit">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-[#ff3f6c] rounded-full"></span> Write Review
                    </h4>
                    <form onSubmit={handleReviewSubmit} className="space-y-3">
                        <div>
                            <label className="text-xs font-semibold text-gray-500">Rating:</label>
                            <div className="flex gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button key={s} type="button" onClick={() => setRating(s)}>
                                      <FaStar size={18} className={`${s <= rating ? "text-blue-400" : "text-gray-200"} cursor-pointer`} /> 
                                    </button>
                                ))}
                            </div>
                        </div>
                        <textarea 
                            rows="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your experience..."
                            className="w-full p-3 text-sm border border-gray-100 rounded-lg focus:ring-1 focus:ring-pink-200 outline-none bg-gray-50"
                        />
                        <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                            <FaPaperPlane size={12} /> Submit
                        </button>
                    </form>
                </div>

                {/* Review List */}
                <div className="md:col-span-2 space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 border-b-2 border-[#ff3f6c] w-fit pb-1 mb-4">Reviews</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {reviews.length > 0 ? reviews.map((r, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-gray-50 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <FaUserCircle size={24} className="text-pink-200" />
                                        <span className="font-bold text-xs text-gray-700">
                                         {r.userId?.firstName ? `${r.userId.firstName} ${r.userId.lastName}` : "Customer"}
                                        </span>
                                    </div>
                                    <div className="flex text-blue-400 gap-0.5">
                                        {[...Array(5)].map((_, idx) => (
                                            <FaStar key={idx} size={10} className={idx < r.rating ? "fill-current" : "text-gray-100"} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm italic">"{r.comment}"</p>
                            </div>
                        )) : <p className="text-gray-400 text-sm italic">No reviews yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;