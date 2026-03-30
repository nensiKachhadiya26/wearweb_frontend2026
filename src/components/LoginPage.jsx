import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import image_login from "../assets/images/Image_Login.png"

export const LoginPage = () => {

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" })

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/userApi/login", data)
      if (res.status == 200) {
        toast.success("Login Success")
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("role", res.data.role)

        if (res.data.role == "user" || res.data.role == "USER") {
          navigate("/user")
        }
        else if (res.data.role == "admin" || res.data.role == "ADMIN") {
          navigate("/admin")
        }
        else if (res.data.role == "seller" || res.data.role == "SELLER") {
          navigate("/seller")
        }
        else {
          toast.error("Invalid Role")
          navigate("/")
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed")
    }
  }

  const validationSchema = {
    emailValidator: {
      required: { value: true, message: 'Email is required..' }
    },
    passwordValidator: {
      required: { value: true, message: 'Password is required..' },
      minLength: { value: 8, message: 'Minimum 8 character is required..' },
      maxLength: { value: 16, message: 'Maximum 16 character is allow..' },
      pattern: {
        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%&*]).{8,}$/,
        message: "Password must contain Capital, Small, Number & Special character"
      },
    },
  }

  return (
    // આખું પેજ સેન્ટર કરવા માટે
    <div className="min-h-screen flex items-center justify-center bg-[#FF3F6C]/10 p-4">
      
      {/* મેઈન કન્ટેનર: ફ્લેક્સ રો (Flex Row) */}
      <div className="bg-white flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        
        {/* ડાબી બાજુ: ઈમેજ સેક્શન */}
        <div className="md:w-1/2 bg-white flex items-center justify-center p-6">
          <img 
            src={image_login} // અહીં તમારી ઈમેજનો સાચો પાથ આપો
            alt="Login Illustration" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* જમણી બાજુ: લોગિન ફોર્મ સેક્શન */}
        <div className="md:w-1/2 p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Login
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/20 focus:border-[#FF3F6C]"
                {...register("email", validationSchema.emailValidator)}
              />
              <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/20 focus:border-[#FF3F6C]"
                {...register("password", validationSchema.passwordValidator)}
              />
              <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
            </div>

            {/* Button */}
            <button type="submit" className="w-full bg-[#ff3f6c] hover:bg-[#e6335f] text-white py-2 rounded-lg transition duration-300 font-semibold shadow-md">
              Login
            </button>
          </form>

          {/* Extra Links */}
          <p className="text-sm text-center text-gray-600 mt-6">
            Don't have an account ? 
            <Link to="/signup" className="text-purple-600 font-semibold hover:underline ml-1">
              Sign Up
            </Link>
          </p>
          
          <p className="text-sm text-center text-gray-600 mt-6">
            Forgot Password ??{" "}
            <Link to="/forgotpassword" className="text-purple-600 font-semibold hover:underline ml-1">
              FORGOT PASSWORD
            </Link>
          </p>
          
        </div>

      </div>
    </div>
  )
}