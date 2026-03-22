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

    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        categoryId: '', 
        subCategoryId: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. પ્રોડક્ટનો ડેટા મેળવો
                const productRes = await axios.get(`/productApi/product/${id}`);
                const data = productRes.data.data;

                // જો ડેટાબેઝમાંથી categoryId ઓબ્જેક્ટ તરીકે આવતી હોય, તો ફક્ત ID સ્ટોર કરો
                setProduct({
                    name: data.name || '',
                    price: data.price || '',
                    description: data.description || '',
                    categoryId: data.categoryId?._id || data.categoryId || '',
                    subCategoryId: data.subCategoryId?._id || data.subCategoryId || ''
                });

                // 2. બધી કેટેગરી મેળવો
                const catRes = await axios.get("/categoryApi/categories");
                setCategories(catRes.data.data);

                // 3. બધી સબ-કેટેગરી મેળવો
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

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            
            // ઈમેજ અપલોડ કરવા માટે FormData જરૂરી છે
            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("price", product.price);
            formData.append("description", product.description);
            formData.append("categoryId", product.categoryId);
            formData.append("subCategoryId", product.subCategoryId);
            
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
                toast.success("Product updated successfully!");
                navigate('/seller/myproduct'); 
            }
        } catch (err) {
            console.error("Update Error:", err);
            toast.error(err.response?.data?.message || "Update failed. Check backend.");
        }
    };

    return (
        <div className="p-10 max-w-lg mx-auto border rounded-xl shadow-2xl bg-white mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center border-b pb-3">Edit Product</h2>
            <form onSubmit={handleUpdate} className="space-y-5">
                
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Product Name</label>
                    <input name="name" value={product.name} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Enter Name" required />
                </div>
                
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Price (₹)</label>
                    <input name="price" type="number" value={product.price} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Enter Price" required />
                </div>

                {/* --- Category --- */}
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Category</label>
                    <select name="categoryId" value={product.categoryId} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none" required>
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* --- Subcategory (Filtered) --- */}
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Subcategory</label>
                    <select name="subCategoryId" value={product.subCategoryId} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none">
                        <option value="">Select Subcategory</option>
                        {subCategories
                            .filter(sub => {
                                const subParentId = sub.categoryId?._id || sub.categoryId;
                                return String(subParentId) === String(product.categoryId);
                            }) 
                            .map(sub => (
                                <option key={sub._id} value={sub._id}>{sub.name}</option>
                            ))
                        }
                    </select>
                </div>

                {/* --- Image --- */}
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Update Image (Optional)</label>
                    <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded bg-gray-50" accept="image/*" />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
                    <textarea name="description" value={product.description} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Describe your product..." rows="3" />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300 shadow-md">
                    Update Product
                </button>
            </form>
        </div>
    );
};