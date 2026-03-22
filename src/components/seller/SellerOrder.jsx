import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const SellerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/orderApi/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data && res.data.data) {
          setOrders(res.data.data);
        }
        setLoading(false);
      } catch (err) {
        toast.error("error while fetch order!");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Orders</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr className="text-gray-500 text-sm uppercase">
              <th className="py-4 px-6">Order ID</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Total Amount</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="py-4 px-6 font-medium text-blue-600">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="py-4 px-6">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-800">
                    ₹{order.total_amount}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.order_status === "Delivered" 
                        ? "bg-green-100 text-green-600" 
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {order.order_status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Link 
                        to={`/seller/orderdetail/${order._id}`} 
                        className="text-[#FF3F6C] hover:underline text-sm font-semibold" >
                        View Details
                    </Link>
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  {loading ? "Loading..." : "No orders found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrder;