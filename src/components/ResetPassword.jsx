import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

export const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: "all" });

  const newPassword = watch("newPassword", "");

  const submitHandler = async (data) => {
    try {
      console.log("Payload:", data);

      // Backend API call example
      // const res = await axios.post("https://node5.onrender.com/user/resetpassword", data);

      toast.success("Password updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FF3F6C]/10">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Reset Password</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Enter your old password and choose a new one</p>

        <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>

          {/* Old Password */}
          <div>
            <label className="block text-gray-600 mb-1">Old Password</label>
            <input
              type="password"
              placeholder="Old Password"
              {...register("oldPassword", { required: "Old password is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/10 focus:border-[#FF3F6C]"
            />
            <p className="text-red-500 text-sm mt-1">{errors.oldPassword?.message}</p>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              {...register("newPassword", { 
                required: "New password is required", 
                minLength: { value: 8, message: "Minimum 8 characters required" } 
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/10 focus:border-[#FF3F6C]"
            />
            <p className="text-red-500 text-sm mt-1">{errors.newPassword?.message}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              {...register("confirmPassword", { 
                required: "Confirm password is required", 
                validate: value => value === newPassword || "Passwords do not match"
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3F6C]/10 focus:border-[#FF3F6C]"
            />
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
          </div>

          <button type="submit" className="w-full bg-[#ff3f6c] hover:bg-[#e6335f] text-white py-2 rounded-lg transition duration-300">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};