import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // ૧. CartPage પરથી ડેટા મેળવો
    const { cartItems, totalAmount: receivedTotal } = location.state || { cartItems: [], totalAmount: 0 };

    // ૨. ટોટલ ગણતરી (સ્કીમામાં total_amount તરીકે જશે)
    const totalAmount = receivedTotal > 0 ? receivedTotal : cartItems.reduce((acc, item) => {
        const price = item.productId?.price || item.price || 0;
        return acc + (price * item.quantity);
    }, 0);

    const [address, setAddress] = useState({
        fullName: '',
        phone: '',
        address: '', // આ સ્કીમાના address ફિલ્ડમાં જશે
        city: '',
        pincode: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('COD');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirmOrder = async (e) => {
        e.preventDefault();

        if (totalAmount <= 0) {
            toast.error("Total amount is 0. Cannot place order.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            
            // ૩. આઈટમ્સ ક્લીનિંગ
            const cleanedCartItems = cartItems.map(item => ({
                productId: item.productId?._id || item.product_id || item._id,
                quantity: item.quantity,
                price: item.productId?.price || item.price || 0
            }));

            // ૪. ઓર્ડર ક્રિએટ કરો (બધા સ્પેલિંગ સ્કીમા મુજબ છે)
            const orderRes = await axios.post("/orderApi/order", {
                cartItems: cleanedCartItems,
                total_amount: Number(totalAmount), // સ્કીમા મુજબ total_amount
                shippingAddress: {
                    address: address.address, // સ્ટેટમાંથી address ફિલ્ડ
                    city: address.city,
                    pincode: String(address.pincode),
                    phone: String(address.phone)
                }
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (orderRes.status === 201 || orderRes.status === 200) {
                const newOrderId = orderRes.data.data?._id || orderRes.data._id;

                const paymentData = {
                    order_id: newOrderId,
                    payment_method: paymentMethod,
                    payment_status: "Success"
                };

                // ૫. પેમેન્ટ સેવ કરો
                const payRes = await axios.post("/paymentApi/payment", paymentData, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (payRes.status === 201 || payRes.status === 200) {
                    toast.success("Order placed successfully! 🎉");
                    navigate('/user/thankyou', { state: { orderId: newOrderId } });
                }
            }
        } catch (err) {
            console.error("Order Error Details:", err.response?.data);
            toast.error(err.response?.data?.error || "Order failed. Check console.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-12">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="space-y-6">
                    <div className="bg-white p-8 shadow-xl rounded-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Delivery Address</h2>
                        <form onSubmit={handleConfirmOrder} className="space-y-4">
                            <input name="fullName" value={address.fullName} onChange={handleChange} placeholder="Full Name" className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pink-500" required />
                            <input name="phone" value={address.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pink-500" required />
                            <textarea name="address" value={address.address} onChange={handleChange} placeholder="Full House Address" className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pink-500" rows="3" required />
                            <div className="grid grid-cols-2 gap-4">
                                <input name="city" value={address.city} onChange={handleChange} placeholder="City" className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pink-500" required />
                                <input name="pincode" value={address.pincode} onChange={handleChange} placeholder="Pincode" className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pink-500" required />
                            </div>

                            <div className="mt-8 pt-6 border-t">
                                <h3 className="text-xl font-bold mb-4 text-gray-800">Payment Method</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-pink-600" />
                                        <span className="font-semibold text-gray-700">Cash on Delivery (COD)</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input type="radio" name="payment" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-pink-600" />
                                        <span className="font-semibold text-gray-700">UPI / Online Payment</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="pt-4">
                                <button type="submit" className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-700 shadow-lg">
                                    Confirm Order (₹{totalAmount})
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="bg-white p-8 shadow-xl rounded-2xl h-fit">
                    <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Order Summary</h3>
                    {/* ... (બાકીનો Summary કોડ તમે જે રાખ્યો હતો તે જ આવશે) ... */}
                    <div className="flex justify-between text-2xl font-extrabold text-pink-600 pt-2 border-t">
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};