import React from "react";
import { FaUsers, FaShoppingBag, FaBoxOpen, FaRupeeSign } from "react-icons/fa";
import { AdminSidebar } from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export const AdminHome = () => {
  return (
    <div className="flex min-h-screen bg-[#FFF0F3]">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#FF3F6C] mb-6">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <FaUsers className="text-3xl text-[#FF3F6C]" />
            <h2 className="text-xl font-semibold mt-2">1200</h2>
            <p className="text-gray-500">Total Users</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <FaShoppingBag className="text-3xl text-[#FF3F6C]" />
            <h2 className="text-xl font-semibold mt-2">350</h2>
            <p className="text-gray-500">Orders</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <FaBoxOpen className="text-3xl text-[#FF3F6C]" />
            <h2 className="text-xl font-semibold mt-2">150</h2>
            <p className="text-gray-500">Products</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <FaRupeeSign className="text-3xl text-[#FF3F6C]" />
            <h2 className="text-xl font-semibold mt-2">₹2,50,000</h2>
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
                <th>User</th>
                <th>Product</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-2">#1021</td>
                <td>Nensi</td>
                <td>T-shirt</td>
                <td className="text-green-500">Delivered</td>
              </tr>

              <tr className="border-b">
                <td className="py-2">#1022</td>
                <td>Rahul</td>
                <td>Shoes</td>
                <td className="text-yellow-500">Pending</td>
              </tr>

              <tr>
                <td className="py-2">#1023</td>
                <td>Priya</td>
                <td>Jeans</td>
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