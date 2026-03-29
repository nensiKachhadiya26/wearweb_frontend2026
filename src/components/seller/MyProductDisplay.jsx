import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Icons ઉમેર્યા

export const MyProductsDisplay = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchMyProducts = async () => {
        try {
            const token = localStorage.getItem("token"); 
            const res = await axios.get("/productApi/my-products", { // URL ચેક કરી લેવી
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error("Error while fetching product");
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`/productApi/product/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Product deleted successfully");
                fetchMyProducts();
            } catch (err) {
                toast.error("Error while deleting product");
            }
        }
    };

    useEffect(() => {
        fetchMyProducts();
    }, []);

    if (loading) return <div className="p-10 text-center text-[#FF3F6C] font-bold">Loading Your Products...</div>;

    return (
        <div className="p-8 bg-[#FFF0F3] min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">My Products Inventory</h1>
            
            {products.length === 0 ? (
                <div className="bg-white p-10 rounded-xl shadow text-center">
                    <p className="text-gray-500 text-lg">No products found. Start adding some!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
                            
                            {/* --- Status Badge (Top Right) --- */}
                            <div className="absolute top-3 right-3 z-10">
                                {product.status === "pending" && (
                                    <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-black shadow-sm border border-yellow-200">
                                        <FaClock /> PENDING
                                    </span>
                                )}
                                {product.status === "approved" && (
                                    <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black shadow-sm border border-green-200">
                                        <FaCheckCircle /> APPROVED
                                    </span>
                                )}
                                {product.status === "rejected" && (
                                    <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-black shadow-sm border border-red-200">
                                        <FaTimesCircle /> REJECTED
                                    </span>
                                )}
                            </div>

                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-56 object-cover" 
                            />

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-xl font-bold text-gray-800 truncate w-2/3">{product.name}</h2>
                                    <p className="text-lg font-black text-[#FF3F6C]">₹{product.price}</p>
                                </div>
                                
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{product.description}</p>
                                
                                <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-4 bg-gray-50 p-2 rounded">
                                    Category: {product.categoryId?.name || "N/A"}
                                </div>

                                {/* --- Edit & Delete Buttons --- */}
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => navigate(`/seller/edit-product/${product._id}`)}
                                        className="flex-1 bg-red-50 text-red-500 py-2.5 rounded-xl font-bold hover:bg-red-500 hover:text-white transition border border-red-100"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteProduct(product._id)}
                                        className="flex-1 bg-red-50 text-red-500 py-2.5 rounded-xl font-bold hover:bg-red-500 hover:text-white transition border border-red-100"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};