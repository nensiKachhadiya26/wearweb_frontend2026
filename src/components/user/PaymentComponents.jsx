import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentComponents = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { totalAmount, fullName, phone, cartItems, userId, address, city, pincode } = location.state || {};

    const [loading, setLoading] = useState(false);

    const handlePayNow = async () => {
        if (!totalAmount) return alert("Invalid amount");

        setLoading(true);
        try {
            // ૧. Razorpay ઓર્ડર ક્રિએટ કરવા માટે બેકએન્ડને રિક્વેસ્ટ
            const { data: { order } } = await axios.post("/paymentApi/create-order", {
                amount: totalAmount
            });

            const options = {
                key: "rzp_test_SYAluvy5Kx8UbX", 
                amount: order.amount,
                currency: "INR",
                name: "Wear Web",
                description: "Order Payment",
                order_id: order.id,
                prefill: {
                    name: fullName,
                    contact: phone
                },
                handler: async function (response) {
                    try {
                        const token = localStorage.getItem("token");

                        // ૨. Crypto વેરીફિકેશન અને પેમેન્ટ સેવ કરવા માટે બેકએન્ડ કોલ
                        const verifyData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            amount: totalAmount 
                        };

                        const verifyRes = await axios.post("/paymentApi/verify-payment", verifyData);

                        // જો બેકએન્ડમાં crypto વેરીફિકેશન સક્સેસ થાય
                        if (verifyRes.data.success) {
                            
                            // ૩. હવે ઓર્ડર ટેબલમાં ડેટા સેવ કરો
                            const orderData = {
                                paymentId: response.razorpay_payment_id,
                                orderId: order.id,
                                total_amount: totalAmount,
                                fullName: fullName,
                                shippingAddress: {
                                    address: address || "Not Provided",
                                    phone: phone || "0000000000",
                                    city: city || "Ahmedabad",
                                    pincode: pincode || "380001"
                                },
                                cartItems: cartItems.map(item => ({
                                    product_id: item.product_id._id || item.product_id,
                                    quantity: item.quantity,
                                    price: item.product_id.price || item.price
                                })),
                                userId: userId
                            };

                            const orderRes = await axios.post("/orderApi/order", orderData, {
                                headers: { Authorization: `Bearer ${token}` }
                            });

                            if (orderRes.status === 201 || orderRes.status === 200) {
                                // ૪. કાર્ટ ક્લિયર કરો
                                await axios.delete("/cartApi/clear", {
                                    headers: { Authorization: `Bearer ${token}` }
                                });
                                localStorage.removeItem('cartItems');

                                // ૫. Thank You પેજ પર મોકલો
                                navigate("/user/thankyou", { state: { paymentId: response.razorpay_payment_id } });
                            }
                        }
                    } catch (error) {
                        console.error("Verification/Order Error:", error.response?.data || error);
                        alert("Payment successful, but verification failed.");
                    }
                },
                theme: { color: "#3b82f6" }
            };

            // Razorpay વિન્ડો ઓપન કરવાની લાઇન
            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Checkout Error:", error);
            alert("Could not start payment. Check Server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
                <h2 className="text-2xl font-black text-center mb-8 text-blue-500 uppercase tracking-widest">
                    Wear Web Checkout
                </h2>
                <div className="space-y-6 mb-8">
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Customer</span>
                        <span className="font-bold">{fullName || 'Guest'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Total Amount</span>
                        <span className="font-bold text-blue-400 text-xl">₹ {totalAmount}</span>
                    </div>
                </div>
                <button 
                    onClick={handlePayNow} 
                    disabled={loading} 
                    className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                >
                    {loading ? "Processing..." : `PAY NOW ₹${totalAmount}`}
                </button>
            </div>
        </div>
    );
};

export default PaymentComponents;