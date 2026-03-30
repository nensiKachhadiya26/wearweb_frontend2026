import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

export const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/userApi/forgotpassword", data); 
      
      if (res.status === 200) {
        toast.success("Reset link sent to your email!");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("User not found or Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF0F3] p-4">
     
      <div className="bg-white rounded-[30px] shadow-2xl flex overflow-hidden max-w-4xl w-full">
        
        <div className="hidden md:flex md:w-1/2 bg-[#FF3F6C]/5 items-center justify-center p-12">
          <img 
            src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg" 
            alt="Forgot Password Illustration" 
            className="max-w-full h-auto rounded-2xl"
          />
        </div>

        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-800">Forgot</h2>
            <h2 className="text-3xl font-extrabold text-[#FF3F6C]">Password?</h2>
            <p className="text-gray-400 mt-2 text-sm">
            Don't worry! Enter your email address and we will send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email ID</label>
              <input 
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/20 focus:border-[#FF3F6C] transition-all"
                type="email" 
                placeholder="example@mail.com" 
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#FF3F6C] hover:bg-[#e6335f] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#FF3F6C]/30 transition-all transform hover:scale-[1.02]">
              Send Link
            </button>
          </form>

         
          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-gray-500 hover:text-[#FF3F6C] transition-colors" >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};