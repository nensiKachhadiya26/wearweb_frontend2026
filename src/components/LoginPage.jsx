import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

export const LoginPage = () => {

  const navigate = useNavigate()
  const{register,handleSubmit,formState:{errors}}=useForm({mode:"all"})


   const submitHandler = async(data)=>{
        try{
             const res = await axios.post("/userApi/login",data)
             console.log(res)
             if(res.status==200){
                toast.success("Login Success")

                console.log(res.data.token)
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("role",res.data.role)

                if(res.data.role=="user" || res.data.role=="USER"){
                  navigate("/user")
                }
                else if(res.data.role=="admin" || res.data.role=="ADMIN"){
                  navigate("/admin")
                }
                else if(res.data.role=="seller" || res.data.role=="SELLER"){
                  navigate("/seller")
                }
                else{
                  toast.error("Invalid Role")
                  navigate("/")
                }
                
             }
        }catch(err){
          
          toast.error(err.response.data.message)
        }
      }

    const validationSchema = {
          emailValidator:{
            required:{
              value:true,
              message:'Email is required..'
            }
          },
          passwordValidator:{
            required:{
              value:true,
              message:'Password is required..'
            },
              minLength:{
                  value:8,
                  message:'Minimum 8 charater is requried..'
              },
              maxLength:{
                  value:16,
                  message:'Maximum 16 character is allow..'
              },
               pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%&*]).{8,}$/,
                  message: "Password must contain Capital, Small, Number & Special character"
               },
          },
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FF3F6C]/10">      
     <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
          
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/10 
               focus:border-[#FF3F6C] "
              {...register("email",validationSchema.emailValidator)}/>
             <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/10 
               focus:border-[#FF3F6C]"
              {...register("password",validationSchema.passwordValidator)}/>
              <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
          </div>

          {/* Button */}
          <button type="submit" className="w-full bg-[#ff3f6c] hover:bg-[#e6335f] text-white py-2 rounded-lg  transition duration-300">
            Login
          </button>

        </form>

        {/* Extra Links */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account? 
          <span className="text-purple-600 cursor-pointer ml-1">
           <Link to="/signup">Sign Up</Link>
          </span>
        </p>

      </div>
    </div>
  )
}
