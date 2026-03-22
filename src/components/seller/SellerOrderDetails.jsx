import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SellerOrderDetails = () => {
    const { id } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrderDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`/orderApi/order/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrderData(res.data.data);
            setLoading(false);
        } catch (err) {
            toast.error("Error fetching details");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    // ઓર્ડર સ્ટેટસ અપડેટ કરવા માટેનું ફંક્શન
const handleStatusChange = async (newStatus) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`/orderApi/order/status/${id}`, 
            { order_status: newStatus }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
            // સુધારો: orderData ની અંદર order ઓબ્જેક્ટ છે, તેને આ રીતે અપડેટ કરો
            setOrderData(prev => ({
                ...prev,
                order: {
                    ...prev.order,
                    order_status: newStatus
                }
            }));
            
            toast.success(`Order status updated to ${newStatus}`);
        }
    } catch (err) {
        console.error("Status Update Error:", err);
        toast.error("Failed to update status");
    }
};

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!orderData) return <div className="p-10 text-center">Order not found!</div>;

    const { order, items } = orderData;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
                    {/* સ્ટેટસ અપડેટ ડ્રોપડાઉન */}
                    <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border">
                        <span className="text-sm font-semibold text-gray-500">Change Status:</span>
                        <select 
                            value={order?.order_status || "Pending"}
                          onChange={(e) => handleStatusChange(e.target.value)}
                            className="bg-gray-50 border-none text-sm font-bold text-blue-600 focus:ring-0 cursor-pointer"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Items List */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6">
                        <h3 className="font-bold text-gray-700 mb-4">Items Information</h3>
                        {items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 py-4 border-b last:border-0">
                                <img src={item.product_id?.image} alt="" className="w-20 h-20 object-cover rounded-xl" />
                                <div className="flex-1">
                                    <p className="font-bold text-gray-800">{item.product_id?.name}</p>
                                    <p className="text-sm text-gray-500">Price: ₹{item.product_id?.price} | Qty: {item.quantity}</p>
                                </div>
                                <p className="font-bold text-gray-800">₹{ (item.product_id?.price || 0) * item.quantity }</p>
                            </div>
                        ))}
                        <div className="mt-6 flex justify-between items-center p-4 bg-pink-50 rounded-xl">
                            <span className="font-bold text-pink-600">Total Earnings</span>
                            <span className="text-2xl font-black text-pink-600">₹{order.total_amount}</span>
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <h3 className="font-bold text-gray-700 mb-4">Customer Details</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Name</p>
                                    <p className="font-medium">{order?.user_id ? `${order.user_id.firstName} ${order.user_id.lastName}` : "Name not found"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Email</p>
                                    <p className="font-medium">{order.user_id?.email || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                       <div className="bg-white rounded-2xl shadow-sm border p-6">
                        <h3 className="font-bold text-gray-700 mb-4">Shipping Address</h3>
                        {order.shippingAddress ? (
                            <div className="space-y-1 text-gray-600">
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city} - {order.shippingAddress.pincode}</p>
                            <p>Phone: {order.shippingAddress.phone}</p>
                            </div>
                        ) : (
                            <p className="text-gray-400 italic">Address not provided</p>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerOrderDetails;