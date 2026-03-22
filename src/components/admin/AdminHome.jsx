import React, { useEffect, useState } from "react";
import { FaUsers, FaShoppingBag, FaBoxOpen, FaRupeeSign, FaHistory } from "react-icons/fa";
import axios from "axios";

export const AdminHome = () => {
  // 1. Stats State
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  // 2. Fetch Data from Backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Tamara backend route mujab
        const res = await axios.get("/userApi/admin/status");
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF3F6C]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-[#FFF0F3] min-h-screen">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">
          Welcome back, <span className="text-[#FF3F6C]">Admin!</span>
        </h1>
        <p className="text-gray-500 font-medium">Here is what's happening with your store today.</p>
      </div>

      {/* 4 Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Total Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-blue-500 hover:shadow-md transition-all duration-300 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase mb-1">Total Users</p>
            <h2 className="text-3xl font-extrabold text-gray-800">{stats.totalUsers}</h2>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl text-blue-500 text-2xl">
            <FaUsers />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-pink-500 hover:shadow-md transition-all duration-300 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase mb-1">Orders</p>
            <h2 className="text-3xl font-extrabold text-gray-800">{stats.totalOrders}</h2>
          </div>
          <div className="p-4 bg-pink-50 rounded-xl text-pink-500 text-2xl">
            <FaShoppingBag />
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-orange-500 hover:shadow-md transition-all duration-300 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase mb-1">Products</p>
            <h2 className="text-3xl font-extrabold text-gray-800">{stats.totalProducts}</h2>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl text-orange-500 text-2xl">
            <FaBoxOpen />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-green-500 hover:shadow-md transition-all duration-300 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase mb-1">Revenue</p>
            <h2 className="text-3xl font-extrabold text-gray-800">
              ₹{stats.totalRevenue?.toLocaleString("en-IN") || 0}
            </h2>
          </div>
          <div className="p-4 bg-green-50 rounded-xl text-green-500 text-2xl">
            <FaRupeeSign />
          </div>
        </div>

      </div>

      {/* Recent Activity Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaHistory className="text-[#FF3F6C]" /> Recent Orders
          </h2>
          <button className="text-sm font-bold text-[#FF3F6C] hover:underline cursor-pointer">View All</button>
        </div>
        
        <div className="p-10 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300 text-3xl">
                <FaShoppingBag />
            </div>
            <p className="text-gray-400 font-medium">No recent orders found in the database.</p>
        </div>
      </div>
    </div>
  );
};