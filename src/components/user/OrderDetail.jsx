
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderDetail = () => {
    const { id } = useParams(); // URL માંથી ઓર્ડર ID મેળવશે
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`/orderApi/order/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrder(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                toast.error("error while fetching order detail..");
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [id]);

    if (loading) return <div className="text-center p-10">Loading...</div>;
    if (!order) return <div className="text-center p-10">Order not found!</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
            <h2 className="text-2xl font-bold border-b pb-4 mb-6 text-pink-600">Order Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* ૧. પ્રોડક્ટની વિગતો */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-700">Items Ordered</h3>
                    {order.cartItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 border-b py-3">
                            <img src={item.productId?.image} alt="product" className="w-16 h-16 object-cover rounded" />
                            <div>
                                <p className="font-semibold text-gray-800">{item.productId?.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                            </div>
                            <p className="ml-auto font-bold text-gray-700">₹{item.quantity * item.price}</p>
                        </div>
                    ))}
                    <div className="mt-4 text-right">
                        <p className="text-xl font-extrabold text-pink-600">Total Amount: ₹{order.totalAmount}</p>
                    </div>
                </div>

                {/* ૨. એડ્રેસ અને સ્ટેટસ */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-700 mb-2">Shipping Address</h3>
                        <p className="text-gray-600">{order.shippingAddress?.fullName}</p>
                        <p className="text-gray-600">{order.shippingAddress?.address}</p>
                        <p className="text-gray-600">{order.shippingAddress?.city} - {order.shippingAddress?.pincode}</p>
                        <p className="text-gray-600 font-semibold">📞 {order.shippingAddress?.phone}</p>
                    </div>
                    
                    <div>
                        <h3 className="font-bold text-gray-700 mb-2">Order Status</h3>
                        <span className={`px-4 py-1 rounded-full text-white font-semibold ${
                            order.status === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}>
                            {order.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;