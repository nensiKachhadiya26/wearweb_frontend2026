import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

export const SellerHome = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [revenue, setRevenue] = useState(0); // રેવન્યુ માટે નવું સ્ટેટ

  useEffect(() => {
    const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    // ૧. પ્રોડક્ટ્સ ફેચ કરો (આ લાઇન પહેલા રાખો)
    const prodRes = await axios.get("/productApi/my-products", { headers });
    if (prodRes.data && prodRes.data.data) {
      setTotalCount(prodRes.data.data.length);
    }

    // ૨. ઓર્ડર્સ ફેચ કરો (અહીં ખાતરી કરો કે orderRes બરાબર લખ્યું છે)
    const orderRes = await axios.get("/orderApi/order", { headers });
    
    // ચેક કરો કે orderRes માં ડેટા છે કે નહીં
    if (orderRes.data && orderRes.data.data) {
      const orders = orderRes.data.data;
      setTotalOrder(orders.length);

      const totalRev = orders.reduce((acc, curr) => {
        return acc + (Number(curr.total_amount) || 0);
      }, 0);
      setRevenue(totalRev);
    }
  } catch (err) {
    console.error("Fetch error:", err); // એરર જોવા માટે
  }
};

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#FF3F6C] mb-8">
        Seller Dashboard
      </h1>

      {/* Stats Cards - ડિઝાઇન એ જ રહેશે */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-pink-50 flex flex-col items-center text-center">
          <div className="bg-pink-50 p-4 rounded-full mb-3">
            <FaBoxOpen className="text-3xl text-[#FF3F6C]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{totalCount}</h2>
          <p className="text-gray-500 font-medium">Total Products</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-blue-50 flex flex-col items-center text-center">
          <div className="bg-blue-50 p-4 rounded-full mb-3">
            <FaShoppingCart className="text-3xl text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{totalOrder}</h2>
          <p className="text-gray-500 font-medium">Orders</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-green-50 flex flex-col items-center text-center">
          <div className="bg-green-50 p-4 rounded-full mb-3">
            <FaRupeeSign className="text-3xl text-green-500" />
          </div>
          {/* હવે અહીં ડાયનેમિક રેવન્યુ દેખાશે */}
          <h2 className="text-2xl font-bold text-gray-800">₹{revenue.toLocaleString()}</h2>
          <p className="text-gray-500 font-medium">Revenue</p>
        </div>
      </div>

      {/* Recent Orders Table - હાલ પૂરતું સ્ટેટિક રાખ્યું છે જેમ તમે કહ્યું એમ */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm uppercase tracking-wider">
                <th className="py-3 px-2">Order ID</th>
                <th className="py-3 px-2">Product</th>
                <th className="py-3 px-2">Quantity</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-4 px-2 font-medium">#201</td>
                <td className="py-4 px-2">T-shirt</td>
                <td className="py-4 px-2">2</td>
                <td className="py-4 px-2">
                   <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">Delivered</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};