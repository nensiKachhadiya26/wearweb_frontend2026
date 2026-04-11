import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderDetail = () => {
    const { id } = useParams();
    const [orderData, setOrderData] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`/orderApi/order/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrderData(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Fetch Error:", err);
                toast.error("Error while fetching order details..");
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [id]);

    // પ્રિન્ટ કરવા માટેનું ફંક્શન
    const handlePrint = () => {
        window.print();
    };

    if (loading) return <div className="text-center p-10 font-bold text-pink-500">Loading Order Details...</div>;
    
    if (!orderData || !orderData.order) return (
        <div className="text-center p-10 font-bold text-gray-500">Order not found!</div>
    );

    const orderInfo = orderData.order; 
    const orderItems = orderData.items; 

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10 border border-gray-100 print:shadow-none print:my-0 print:border-none">
            
            {/* Header with Print Button */}
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h2 className="text-2xl font-bold text-pink-600">Order Details</h2>
                <button 
                    onClick={handlePrint}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-black transition flex items-center gap-2 no-print"
                >
                    <span>🖨️</span> Print Invoice
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* ડાબી બાજુ: પ્રોડક્ટ લિસ્ટ */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-700">Items Ordered</h3>
                    
                    {orderItems && orderItems.length > 0 ? (
                        orderItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 border-b py-3 hover:bg-gray-50 transition p-2 rounded">
                                <img 
                                    src={item.product_id?.image} 
                                    alt="product" 
                                    className="w-16 h-16 object-cover rounded shadow-sm border" 
                                    onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{item.product_id?.name || "Product Deleted"}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.product_id?.price || item.price}</p>
                                </div>
                                <p className="font-bold text-gray-700">₹{item.quantity * (item.product_id?.price || item.price)}</p>
                                
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No items found in this order.</p>
                    )}

                    <div className="mt-6 p-4 bg-pink-50 rounded-lg text-right border-r-4 border-pink-500">
                        <p className="text-sm text-gray-500 font-bold uppercase">Total Amount</p>
                        <p className="text-2xl font-black text-pink-600">₹{orderInfo.total_amount || orderInfo.totalAmount}</p>
                    </div>
                </div>

                {/* જમણી બાજુ: એડ્રેસ અને સ્ટેટસ */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-inner">
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-700 mb-3 border-b pb-1">Shipping Address</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p className="font-bold text-gray-800">{orderInfo.shippingAddress?.fullName || orderInfo.user_id?.firstName + " " + orderInfo.user_id?.lastName}</p>
                            <p>{orderInfo.shippingAddress?.address || "Address Detail Missing"}</p>
                            <p>{orderInfo.shippingAddress?.city} - {orderInfo.shippingAddress?.pincode}</p>
                            <p className="pt-2 font-semibold text-pink-600 flex items-center gap-1">
                                📞 {orderInfo.shippingAddress?.phone || "No Phone"}
                            </p>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="font-bold text-gray-700 mb-3 border-b pb-1">Order Status</h3>
                        <span className={`px-4 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider ${
                            orderInfo.order_status === 'Delivered' 
                                ? 'bg-green-100 text-green-600 border border-green-200' 
                                : 'bg-yellow-100 text-yellow-600 border border-yellow-200'
                        }`}>
                            {orderInfo.order_status || "Processing"}
                        </span>
                        <p className="text-[10px] text-gray-400 mt-3 italic">
                            Order Date: {new Date(orderInfo.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Print Only Footer (બિલના નીચેના ભાગમાં દેખાશે) */}
            <div className="hidden print:block mt-10 text-center border-t pt-4 text-gray-400 text-xs">
                Thank you for shopping with WearWeb! This is a computer-generated invoice.
            </div>
        </div>
    );
};

export default OrderDetail;