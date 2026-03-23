import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("/orderApi/order", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(res.data.data);
            } catch (err) {
                console.error("Error fetching orders", err);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Order History</h2>
                
                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <p className="text-gray-500 text-lg">Your order history is empty.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 transition-hover duration-300 hover:shadow-lg">
                                
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Order Number</p>
                                        <p className="text-sm font-bold text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Date</p>
                                        <p className="text-sm font-medium text-gray-800">
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : "Date Not Available"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Total Amount</p>
                                        <p className="text-lg font-bold text-pink-600">₹{order.total_amount}</p>
                                    </div>
                                    <span className="px-4 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                        {order.order_status || "Confirmed"}
                                    </span>
                                </div>

                                <div className="p-6">
                                    <Link to={`/user/order-detail/${order._id}`} className="text-pink-600 font-bold">
                                        Order Detail →
                                    </Link>    
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;