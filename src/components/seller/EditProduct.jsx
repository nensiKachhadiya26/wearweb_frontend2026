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
    const [loading, setLoading] = useState(false);

    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        categoryId: '',
        subCategoryId: '',
        sizes: []
    });

    // ✅ CreateProduct  Size Data Structure
    const sizeData = {
        "Jeans ": ["28", "30", "32", "34", "36", "38"],
        "Shirt": ["S", "M", "L", "XL", "XXL"],
        "T Shirt": ["S", "M", "L", "XL", "XXL"],
        "Hoodie": ["S", "M", "L", "XL", "XXL"],
        "Jacket": ["S", "M", "L", "XL", "XXL"],
        "Kurti": ["S", "M", "L", "XL", "XXL"],
        "Tops": ["S", "M", "L", "XL"],
        "Skirt": ["26", "28", "30", "32"],
        "Chappal": ["3", "4", "5", "6", "7", "8"],
        "Dungaree": ["1-2Y", "2-3Y", "4-5Y", "6-7Y"],
        "Jeans": ["1-2Y", "2-3Y", "4-5Y", "6-7Y"],
        "TShirt": ["1-2Y", "2-3Y", "4-5Y", "6-7Y"],
        "Frock": ["1-2Y", "2-3Y", "4-5Y", "6-7Y"],
    };

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
        const { name, value } = e.target;
        
        if (name === "categoryId") {
            setProduct({ ...product, categoryId: value, subCategoryId: '', sizes: [] });
        } else {
            setProduct({ ...product, [name]: value });
        }
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

    const selectedSubCategoryName = subCategories.find(sub => sub._id === product.subCategoryId)?.name;

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
            toast.error(err.response?.data?.message || "Update failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Product</h2>
            
            <form onSubmit={handleUpdate} className="space-y-5">
                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input name="name" value={product.name} onChange={handleChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition" required />
                </div>

                {/* Category & Sub Category */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select name="categoryId" value={product.categoryId} onChange={handleChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none cursor-pointer" required>
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                        <select name="subCategoryId" value={product.subCategoryId} onChange={handleChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none cursor-pointer" required>
                            <option value="">Select Sub</option>
                            {subCategories
                                .filter(sub => String(sub.categoryId?._id || sub.categoryId) === String(product.categoryId))
                                .map(sub => (
                                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

              
                {selectedSubCategoryName && sizeData[selectedSubCategoryName] && (
                    <div className="p-4 bg-pink-50 rounded-xl border border-dashed border-pink-200 shadow-inner">
                        <label className="block text-sm font-bold text-pink-700 mb-3 uppercase tracking-wide">
                             Sizes for {selectedSubCategoryName}
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {sizeData[selectedSubCategoryName].map((size) => (
                                <label key={size} className="flex items-center space-x-2 cursor-pointer group bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:border-pink-400 transition shadow-sm active:scale-95">
                                    <input 
                                        type="checkbox" 
                                        checked={product.sizes.includes(size)}
                                        onChange={() => handleSizeChange(size)}
                                        className="w-4 h-4 accent-[#ff3f6c] cursor-pointer"
                                    />
                                    <span className="text-sm font-semibold text-gray-600 group-hover:text-[#ff3f6c]">
                                        {size}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Price & Image */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                        <input name="price" type="number" value={product.price} onChange={handleChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition" required />
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                         <input type="file" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 transition cursor-pointer" accept="image/*" />
                    </div>
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