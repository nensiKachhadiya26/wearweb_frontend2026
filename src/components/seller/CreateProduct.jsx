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

  const submitHandler  = async(data)=>{
    console.log("data",data)
    const res = await axios.post("/productApi/product",data,
     {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    
    try{
      if(res.status==201){
                toast.success("product added..")
                //navigate..
            }
    }catch(err){
        toast.error("error while create product")
    }
  }
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
          <select type='text' className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...register("categoryId")}>
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
