import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: "all" });

  const newPassword = watch("newPassword", "");

  const submitHandler = async (data) => {
    try {
      const payload = {
        newPassword: data.newPassword,
        token: token,
      };

      const res = await axios.post("/userApi/resetpassword", payload);
      if (res.status === 200) {
        toast.success("Password updated successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Link expired or invalid!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF0F3]">
     
      <div className="bg-white p-10 rounded-[30px] shadow-xl w-full max-w-md border border-gray-100">
        
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Reset</h2>
          <h2 className="text-4xl font-extrabold text-[#FF3F6C] mb-4">Password</h2>
          <p className="text-gray-500 text-sm">Create a strong new password to secure your account.</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          
         
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: { value: 8, message: "Minimum 8 characters required" },
              })}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/20 focus:border-[#FF3F6C] transition-all"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === newPassword || "Passwords do not match",
              })}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/20 focus:border-[#FF3F6C] transition-all"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

        
          <button
            type="submit"
            className="w-full bg-[#FF3F6C] hover:bg-[#e6335f] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#FF3F6C]/30 transition duration-300 transform hover:scale-[1.02]" >
            Update Password
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
  );
};