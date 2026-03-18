import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
   const {register,handleSubmit,watch,formState: { errors }} = useForm();

    const navigate = useNavigate();
   
      const submitHandler = async(data)=>{
        try{
          const res = await axios.post("/userApi/register",data)
          if(res.status==201){
            toast.dismiss()
            toast.success("User registered successfully")
            navigate("/login")
          }
        }catch(err){
          toast.error(err.response.data.message)
        }
      }
      const onError = (errors) => {

          if (errors.firstName) {
            toast.error(errors.firstName.message)
          }

          else if (errors.lastName) {
            toast.error(errors.lastName.message)
          }

          else if (errors.email) {
            toast.error(errors.email.message)
          }

          else if (errors.password) {
            toast.error(errors.password.message)
          }
}

    
      const validationSchema = {
          firstNameValidator: {
              required: {
                value: true,
                message: "First Name is required.."
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "First Name must contain only letters"
              }
            },
            lastNameValidator: {
              required: {
                value: true,
                message: "Last Name is required.."
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Last Name must contain only letters"
              }
            },
            emailValidator: {
              required: {
                value: true,
                message: "Email is required.."
              }, 
              pattern: {
                value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter valid email"
              }
            },
          passwordValidator: {
              required: {
                value: true,
                message: "Password is required.."
              },
              minLength: {
                value: 8,
                message: "Minimum 8 characters required.."
              },
               maxLength: {
                value: 16,
                message: "Meximum 16 characters required.."
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%&*]).{8,}$/,
                message:
                  "Password must contain Capital, Small, Number & Special character"
              }
            }
          }

  return (
    // <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="min-h-screen flex items-center justify-center bg-[#FF3F6C]/10">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(submitHandler,onError)}>

          {/* Full Name */}
          <div>
            <label className="block text-gray-600 mb-2">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/10 
               focus:border-[#FF3F6C]"
              {...register("firstName", validationSchema.firstNameValidator)}
            />
            
          </div>
          {/* last name*/}
          <div>
            <label className="block text-gray-600 mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/10 
               focus:border-[#FF3F6C]"
              {...register("lastName", validationSchema.lastNameValidator)}
            />
            
          </div>
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/10 
               focus:border-[#FF3F6C]"
              {...register("email", validationSchema.emailValidator)}
            />
            
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/10 
               focus:border-[#FF3F6C]"
              {...register("password", validationSchema.passwordValidator)}
            />
            
          </div>
          <label><input type="radio" value="user" {...register("role")}  defaultChecked /> User</label>
          <label><input type="radio" value="admin" {...register("role")} /> Admin</label>
          <label><input type="radio" value="seller" {...register("role")} /> Seller</label>

         

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#ff3f6c] hover:bg-[#e6335f] text-white py-2 rounded-lg  transition duration-300">
            Sign Up
          </button>

        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?
          <span className="text-purple-600 cursor-pointer ml-1">
             <Link to="/login">Login</Link>
          </span>
        </p>

      </div>
    </div>
  )
}
