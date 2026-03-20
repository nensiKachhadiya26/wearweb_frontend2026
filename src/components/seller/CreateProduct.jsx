import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const CreateProduct = () => {
   const{register,handleSubmit}=useForm()
   const [categories, setcategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  const submitHandler = async (data) => {
  try {
    // આ લાઇન ઉમેરો: localStorage માંથી ટોકન લાવો
    const token = localStorage.getItem("token"); 

    // જો ટોકન ન હોય તો યુઝરને જણાવી દો
    if (!token) {
      toast.error("If you first login");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);
    formData.append("subCategoryId", data.subCategoryId);
    formData.append("image", data.image[0]);

    const res = await axios.post("/productApi/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // અહીં હવે 'token' વેરીએબલ કામ કરશે
        "Authorization": `Bearer ${token}`, 
      },
    });

    if (res.status === 201) {
      toast.success("Product created successfully!");
    }
  } catch (err) {
    console.error("Error:", err);
    toast.error("Error while creating product");
  }
};
  const fetchAllCategories = async()=>{
        const res = await axios.get("/categoryApi/categories")
        console.log(res.data.data)
        setcategories(res.data.data)
    }
  const fetchAllSubCategories = async()=>{
    const res = await axios.get("/subCategoryApi/subCategories")
    console.log(res.data.data)
    setSubCategories(res.data.data)
  }
    useEffect(()=>{
        fetchAllCategories()
        fetchAllSubCategories()
    },[])
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Product Name:</label>
          <input type='text' className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...register("name")}></input>
        </div>
        <div>
          <label>Price:</label>
          <input type='number' className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...register("price")}></input>
        </div>
        <div>
          <label>Description:</label>
          <input type='text' className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...register("description")}></input>
        </div>
        <div>
          <label>Category:</label>
          <select type='text' className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...register("categoryId" , { required: true })}>
            {
              categories.map((cat)=>{
                return <option key={cat._id} value={cat._id}>{cat.name}</option>
              })
            }
          </select>

        </div>
        <div>
          <label>Sub Category:</label>
          <select type='text' className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...register("subCategoryId")}>
            {
              subCategories.map((subcat)=>{
                return <option key={subcat._id} value={subcat._id}>{subcat.name}</option>
              })
            }
          </select>
        </div>
        <div>
          <label>Images:</label>
          <input type='file' className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...register("image")}></input>
        </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Create Product
      </button>
      </form>

    </div>
  )
}
