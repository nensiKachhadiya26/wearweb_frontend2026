import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const MyProductsDisplay = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyProducts = async () => {
        try {
            const token = localStorage.getItem("token"); // લોગિન વખતે સેવ કરેલું ટોકન
            
            const res = await axios.get("/productApi/my-products", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setProducts(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error("error while fetching product");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyProducts();
    }, []);

    if (loading) return <div className="p-5 text-center">Loading...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">My Products</h1>
            
            {products.length === 0 ? (
                <p className="text-gray-500">No Add Any Products</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-48 object-cover rounded-md mb-4" 
                            />
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                            <p className="text-blue-600 font-bold">₹{product.price}</p>
                            <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                            <div className="mt-3 text-xs bg-gray-100 p-2 rounded">
                                Category: {product.categoryId?.name}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};