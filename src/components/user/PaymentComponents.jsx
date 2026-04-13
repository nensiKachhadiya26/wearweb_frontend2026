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

                        
                        
                        const verifyData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            amount: totalAmount 
                        };

                        const verifyRes = await axios.post("/paymentApi/verify-payment", verifyData);

                       
                        
                        if (verifyRes.data.success) {
                            
                            
                            
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
                                
                                
                                await axios.delete("/cartApi/clear", {
                                    headers: { Authorization: `Bearer ${token}` }
                                });
                                localStorage.removeItem('cartItems');

                               
                                
                                navigate("/user/thankyou", { state: { paymentId: response.razorpay_payment_id } });
                            }
                        }
                    } catch (error) {
                        console.error("Verification/Order Error:", error.response?.data || error);
                        alert("Payment successful, but verification failed.");
                    }
                },
                theme: { color: "#ea5090" }
            };

           
            
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
  
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF0F5] text-gray-800 p-4">
        
      
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-pink-100">
            
          
            <h2 className="text-2xl font-black text-center mb-8 text-pink-600 uppercase tracking-widest">
                Wear Web Checkout
            </h2>

            <div className="space-y-6 mb-8">
              
                <div className="flex justify-between border-b border-pink-50 forced-colors:border-pink-100 pb-2">
                    <span className="text-gray-600">Customer</span>
                    <span className="font-bold text-gray-800">{fullName || 'Guest'}</span>
                </div>
                
                <div className="flex justify-between border-b border-pink-50 pb-2">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-bold text-pink-500 text-xl">₹ {totalAmount}</span>
                </div>
                <div className="flex justify-between border-b border-pink-50 pb-2">
                <span className="text-gray-600">Phone</span>
                <span className="font-bold text-gray-800">{phone}</span>
                 </div>

            <div className="flex flex-col border-b border-pink-50 pb-2">
                <span className="text-gray-600 text-sm">Shipping Address</span>
                <span className="font-semibold text-gray-700 text-sm">
                    {address}, {city} - {pincode}
                </span>
            </div>
            </div>

          
            <button 
                onClick={handlePayNow} 
                disabled={loading} 
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-pink-200"
            >
                {loading ? "Processing..." : `PAY NOW ₹${totalAmount}`}
            </button>

          
            <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-tighter">
                🔒 Secure SSL Encrypted Payment
            </p>
        </div>
    </div>
);
};

export default PaymentComponents;