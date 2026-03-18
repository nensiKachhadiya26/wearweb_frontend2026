import React from "react";
import { FaBoxOpen, FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { SellerSidebar } from "./SellerSidebar"; 

export const SellerHome = () => {
  return (
    <div className="flex min-h-screen bg-[#FFF0F3]">

      {/* Sidebar */}
      <div className="w-64 fixed h-full">
        <SellerSidebar /> 
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-[#FF3F6C] mb-6">
          Seller Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <FaBoxOpen className="text-3xl text-[#FF3F6C]" />
            <h2 className="text-xl font-semibold mt-2">50</h2>
            <p className="text-gray-500">Total Products</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <FaShoppingCart className="text-3xl text-[#FF3F6C]" />
            <h2 className="text-xl font-semibold mt-2">120</h2>
            <p className="text-gray-500">Orders</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <FaRupeeSign className="text-3xl text-[#FF3F6C]" />
            <h2 className="text-xl font-semibold mt-2">₹1,75,000</h2>
            <p className="text-gray-500">Revenue</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-[#FF3F6C]">
            Recent Orders
          </h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-2">#201</td>
                <td>T-shirt</td>
                <td>2</td>
                <td className="text-green-500">Delivered</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">#202</td>
                <td>Shoes</td>
                <td>1</td>
                <td className="text-yellow-500">Pending</td>
              </tr>
              <tr>
                <td className="py-2">#203</td>
                <td>Jeans</td>
                <td>3</td>
                <td className="text-blue-500">Shipped</td>
              </tr>
            </tbody>
          </table>
        </div>

      <Outlet />  
  
   </div>
    </div>
  );
};