import React, { useEffect, useState } from "react";
import { FaUsers, FaShoppingBag, FaBoxOpen, FaRupeeSign, FaHistory } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminHome = () => {
  const [status, setStatus] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]); // તાજેતરના ઓર્ડર માટે સ્ટેટ
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // 1. Stats Fetch (પહેલા જેવું જ)
      const statsRes = await axios.get("/userApi/admin/status", { headers });
      if (statsRes.data.success) {
        setStatus(statsRes.data.stats);
      }

      // 2. Sales Fetch અને Pending ફિલ્ટર
      const salesRes = await axios.get("/userApi/view-sales", { headers });
      if (salesRes.data.success) {
        // અહીં filter વાપરીને ફક્ત 'Pending' સ્ટેટસ વાળા ઓર્ડર જ લીધા છે
        const pendingOnly = salesRes.data.data.filter(
          (order) => order.status === "Pending"
        );
        
        // છેલ્લા 5 પેન્ડિંગ ઓર્ડર બતાવવા માટે
        setRecentOrders(pendingOnly.slice(0, 5));
      }
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
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
        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-blue-500 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase mb-1">Total Users</p>
            <h2 className="text-3xl font-extrabold text-gray-800">{status.totalUsers}</h2>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl text-blue-500 text-2xl"><FaUsers /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-pink-500 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase mb-1">Orders</p>
            <h2 className="text-3xl font-extrabold text-gray-800">{status.totalOrders}</h2>
          </div>
          <div className="p-4 bg-pink-50 rounded-xl text-pink-500 text-2xl"><FaShoppingBag /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-orange-500 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase mb-1">Products</p>
            <h2 className="text-3xl font-extrabold text-gray-800">{status.totalProducts}</h2>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl text-orange-500 text-2xl"><FaBoxOpen /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-green-500 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase mb-1">Revenue</p>
            <h2 className="text-3xl font-extrabold text-gray-800">₹{status.totalRevenue?.toLocaleString("en-IN")}</h2>
          </div>
          <div className="p-4 bg-green-50 rounded-xl text-green-500 text-2xl"><FaRupeeSign /></div>
        </div>
      </div>

      {/* Recent Activity Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaHistory className="text-[#FF3F6C]" /> Recent Orders
          </h2>
          <button onClick={() => navigate("/admin/view-sales")} className="text-sm font-bold text-[#FF3F6C] hover:underline cursor-pointer">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          {recentOrders.length > 0 ? (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold">
                <tr>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Seller</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img src={order.product_image} alt="p" className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-semibold text-gray-700 text-sm truncate w-32">{order.product_name}</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-pink-500 font-bold">{order.seller_name}</td>
                    <td className="py-4 px-6 font-black text-gray-800">₹{order.amount?.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.status === "Delivered" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300 text-3xl">
                <FaShoppingBag />
              </div>
              <p className="text-gray-400 font-medium">No recent orders found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};