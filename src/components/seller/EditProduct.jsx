import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null); 
    const [loading, setLoading] = useState(false); // Loading state add kari che

    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        categoryId: '', 
        subCategoryId: '',
        sizes: [] // Sizes array add karyu che
    });

    const availableSizes = ["S", "M", "L", "XL", "XXL"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productRes = await axios.get(`/productApi/product/${id}`);
                const data = productRes.data.data;

                setProduct({
                    name: data.name || '',
                    price: data.price || '',
                    description: data.description || '',
                    categoryId: data.categoryId?._id || data.categoryId || '',
                    subCategoryId: data.subCategoryId?._id || data.subCategoryId || '',
                    sizes: data.sizes || []
                });

                const catRes = await axios.get("/categoryApi/categories");
                setCategories(catRes.data.data);

                const subCatRes = await axios.get("/subCategoryApi/subCategories");
                setSubCategories(subCatRes.data.data);

            } catch (err) {
                console.error("Fetch Error:", err);
                toast.error("Error fetching product data");
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSizeChange = (size) => {
        const updatedSizes = product.sizes.includes(size)
            ? product.sizes.filter(s => s !== size)
            : [...product.sizes, size];
        setProduct({ ...product, sizes: updatedSizes });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("price", product.price);
            formData.append("description", product.description);
            formData.append("categoryId", product.categoryId);
            formData.append("subCategoryId", product.subCategoryId);
            
            // Sizes array append
            product.sizes.forEach(size => formData.append("sizes", size));
            
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const res = await axios.put(`/productApi/product/${id}`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data" 
                }
            });

            if(res.status === 200 || res.status === 201) {
                toast.success("Product updated successfully! 🚀");
                navigate('/seller/myproduct'); 
            }
        } catch (err) {
            console.error("Update Error:", err);
            toast.error(err.response?.data?.message || "Update failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 border-b pb-3">Edit Product</h2>
            
            <form onSubmit={handleUpdate} className="space-y-5">
                
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input name="name" value={product.name} onChange={handleChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition" required />
                </div>

                {/* Sizes Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
                    <div className="flex flex-wrap gap-3">
                        {availableSizes.map((size) => (
                            <label key={size} className="flex items-center space-x-2 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    checked={product.sizes.includes(size)}
                                    onChange={() => handleSizeChange(size)}
                                    className="w-4 h-4 accent-[#ff3f6c] rounded border-gray-300"
                                />
                                <span className="text-sm font-semibold text-gray-600 group-hover:text-[#ff3f6c] transition">
                                    {size}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input name="price" type="number" value={product.price} onChange={handleChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select name="categoryId" value={product.categoryId} onChange={handleChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none cursor-pointer" required>
                            <option value="">Select</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Subcategory */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                        <select name="subCategoryId" value={product.subCategoryId} onChange={handleChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none cursor-pointer">
                            <option value="">Select</option>
                            {subCategories
                                .filter(sub => String(sub.categoryId?._id || sub.categoryId) === String(product.categoryId))
                                .map(sub => (
                                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image (Optional)</label>
                    <input type="file" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 transition cursor-pointer" accept="image/*" />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition resize-none" rows="3" required></textarea>
                </div>

                {/* Update Button */}
                <button 
                    type='submit' 
                    disabled={loading}
                    className={`w-full p-3 rounded-lg font-bold text-white transition duration-300 shadow-md active:scale-95
                        ${loading 
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-[#ff3f6c] hover:bg-[#e6335f]'
                        }`}
                >
                    {loading ? "Updating..." : "UPDATE PRODUCT"}
                </button>
            </form>
        </div>
    );
};