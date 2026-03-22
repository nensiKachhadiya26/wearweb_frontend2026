import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export const CreateProduct = () => {
    const { register, handleSubmit, reset } = useForm()
    const [categories, setcategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const submitHandler = async (data) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("price", data.price)
            formData.append("description", data.description)
            formData.append("categoryId", data.categoryId)
            formData.append("subCategoryId", data.subCategoryId)
            
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
            console.error(err)
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
                
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition" type='text' {...register("name")} required />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition" type='number' {...register("price")} required />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition resize-none" rows="3" {...register("description")} required></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select className='w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition cursor-pointer' {...register("categoryId")} required>
                            <option value="">Select</option>
                            {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                        </select>
                    </div>

                    {/* Sub Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                        <select className='w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition cursor-pointer' {...register("subCategoryId")}>
                            <option value="">Select</option>
                            {subCategories.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                        </select>
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