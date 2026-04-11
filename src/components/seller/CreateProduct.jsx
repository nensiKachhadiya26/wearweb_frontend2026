import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export const CreateProduct = () => {
    const { register, handleSubmit, reset, watch } = useForm()
    const [categories, setcategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [loading, setLoading] = useState(false)

    // ✅ તમારી રિક્વાયરમેન્ટ મુજબ સાઈઝ ડેટા
    const sizeData = {
        // Men & Women Common
        "Jeans ": ["28", "30", "32", "34", "36", "38"],
        "Shirt": ["S", "M", "L", "XL", "XXL"],
        "T Shirt": ["S", "M", "L", "XL", "XXL"],
        "Hoodie": ["S", "M", "L", "XL", "XXL"],
        "Jacket": ["S", "M", "L", "XL", "XXL"],
        
        // Women Specific
        "Kurti": ["S", "M", "L", "XL", "XXL"],
        "Jeans ": ["28", "30", "32", "34", "36", "38"],
        "Tops": ["S", "M", "L", "XL"],
        "Skirt": ["26", "28", "30", "32"],
        "Chappal": ["3", "4", "5", "6", "7", "8"],

        // Kids Specific
        "Dungaree": ["1-2Y", "2-3Y", "4-5Y", "6-7Y"],
        "Jeans": ["1-2Y", "2-3Y", "4-5Y", "6-7Y"],
        "TShirt": ["1-2Y", "2-3Y", "4-5Y", "6-7Y"],
        "Frock": ["1-2Y", "2-3Y", "4-5Y", "6-7Y"],
        
    };

    
    const selectedCategoryId = watch("categoryId");
    const selectedSubCategoryId = watch("subCategoryId");


    const filteredSubCategories = subCategories.filter(sub => sub.categoryId === selectedCategoryId);

  
    const selectedSubCategoryName = subCategories.find(sub => sub._id === selectedSubCategoryId)?.name;

    const submitHandler = async (data) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("price", data.price)
            formData.append("description", data.description)
            formData.append("categoryId", data.categoryId)
            formData.append("subCategoryId", data.subCategoryId)
            
            if (data.sizes && data.sizes.length > 0) {
            data.sizes.forEach(size => {
                formData.append("sizes", size) // આ બરાબર છે
            })
        }

            if (data.image[0]) {
                formData.append("image", data.image[0])
            }
            
            const token = localStorage.getItem("token");
            const res = await axios.post("/productApi/product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`       
                }
            })

            if (res.status === 201 || res.status === 200) {
                toast.success("Product created successfully! 🚀")
                reset()
            }
        } catch (err) {
            console.error("Frontend Error:", err.response?.data);
            toast.error(err.response?.data?.message || "Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    const fetchAllData = async () => {
        try {
            const catRes = await axios.get("/categoryApi/categories")
            setcategories(catRes.data.data)
            const subRes = await axios.get("/subCategoryApi/subCategories")
            setSubCategories(subRes.data.data)
        } catch (err) {
            console.log("Error fetching data", err)
        }
    }

    useEffect(() => {
        fetchAllData()
    }, [])

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
            
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition" type='text' {...register("name")} required />
                </div>

                {/* Category & Filtered Sub Category */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select className='w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition cursor-pointer' {...register("categoryId")} required>
                            <option value="">Select Category</option>
                            {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                        <select className='w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition cursor-pointer' {...register("subCategoryId")} required>
                            <option value="">Select Sub</option>
                            {filteredSubCategories.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                        </select>
                    </div>
                </div>

                {/* ✅ Dynamic Sizes - Sub Category ના નામ મુજબ */}
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
                                        value={size} 
                                        {...register("sizes")} 
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

                {/* Price & Description */}
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                        <input className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition" type='number' {...register("price")} required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition resize-none" rows="3" {...register("description")} required></textarea>
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 transition cursor-pointer" {...register("image")} required />
                </div>

                {/* Submit Button */}
                <button 
                    type='submit' 
                    disabled={loading}
                    className={`w-full p-3 rounded-lg font-bold text-white transition duration-300 shadow-md active:scale-95
                        ${loading 
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-[#ff3f6c] hover:bg-[#e6335f]'
                        }`}
                >
                    {loading ? "Creating..." : "CREATE PRODUCT"}
                </button>
            </form>
        </div>
    )
}