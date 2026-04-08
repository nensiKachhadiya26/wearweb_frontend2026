import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };

    const [address, setAddress] = useState({ 
        fullName: '', 
        phone: '', 
        address: '', 
        city: '', 
        pincode: '' 
    });
    
    const [paymentMethod, setPaymentMethod] = useState('COD');

    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData ? userData._id : ""; 

    const handleConfirmOrder = (e) => {
        e.preventDefault();

        // Strict Validations
        const nameRegex = /^[A-Za-z\s]+$/;
        const digitRegex = /^\d+$/;

        if (!nameRegex.test(address.fullName)) return toast.error("Full Name: ફક્ત અક્ષરો જ લખો!");
        if (address.phone.length !== 10 || !digitRegex.test(address.phone)) return toast.error("Phone: ૧૦ આંકડાનો નંબર લખો!");
        if (address.address.trim().length < 10) return toast.error("Address: થોડું વધારે વિગતવાર એડ્રેસ લખો!");
        if (!nameRegex.test(address.city)) return toast.error("City: શહેરનું નામ સાચું લખો!");
        if (address.pincode.length !== 6 || !digitRegex.test(address.pincode)) return toast.error("Pincode: ૬ આંકડાનો પીનકોડ લખો!");

        const orderData = {
            totalAmount,
            fullName: address.fullName,
            phone: address.phone,
            address: address.address,
            city: address.city,
            pincode: address.pincode,
            cartItems,
            userId,
            paymentMethod
        };

        if (paymentMethod === 'UPI') {
            navigate("/booking", { state: orderData });
        } else {
            toast.success("Order Placed (COD) Successfully! 🎉");
        }
    };

    return (
        <div className="bg-pink-50/30 min-h-screen py-10 px-4 font-sans">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* --- LEFT SIDE: SHIPPING FORM --- */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-pink-100/50 border border-pink-100">
                        <h2 className="text-2xl font-black mb-8 text-pink-700 flex items-center gap-3 uppercase tracking-tight">
                            <span className="bg-pink-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-200">
                                <i className="fa-solid fa-truck-fast"></i>
                            </span>
                            Shipping Details
                        </h2>
                        
                        <form onSubmit={handleConfirmOrder} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-pink-900 ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Full Name"
                                        className="w-full border-2 border-pink-50 p-4 rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all bg-pink-50/50 text-gray-700 font-medium"
                                        value={address.fullName}
                                        onChange={(e) => setAddress({...address, fullName: e.target.value.replace(/[^A-Za-z\s]/g, '')})}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-pink-900 ml-1">Mobile Number</label>
                                    <input 
                                        type="text" 
                                        maxLength="10"
                                        placeholder="10 Digit Number"
                                        className="w-full border-2 border-pink-50 p-4 rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all bg-pink-50/50 text-gray-700 font-medium"
                                        value={address.phone}
                                        onChange={(e) => setAddress({...address, phone: e.target.value.replace(/\D/g, '')})}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-pink-900 ml-1">Delivery Address</label>
                                <textarea 
                                    placeholder="House No, Building, Street, Area..."
                                    className="w-full border-2 border-pink-50 p-4 rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all bg-pink-50/50 text-gray-700 font-medium"
                                    rows="3"
                                    value={address.address}
                                    onChange={(e) => setAddress({...address, address: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-pink-900 ml-1">Town / City</label>
                                    <input 
                                        type="text" 
                                        placeholder="Your City"
                                        className="w-full border-2 border-pink-50 p-4 rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all bg-pink-50/50 text-gray-700 font-medium"
                                        value={address.city}
                                        onChange={(e) => setAddress({...address, city: e.target.value.replace(/[^A-Za-z\s]/g, '')})}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-pink-900 ml-1">Pincode</label>
                                    <input 
                                        type="text" 
                                        maxLength="6"
                                        placeholder="6 Digit Pincode"
                                        className="w-full border-2 border-pink-50 p-4 rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all bg-pink-50/50 text-gray-700 font-medium"
                                        value={address.pincode}
                                        onChange={(e) => setAddress({...address, pincode: e.target.value.replace(/\D/g, '')})}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-lg font-black mb-4 text-pink-800 uppercase tracking-wider flex items-center gap-2">
                                    Payment Method
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className={`p-5 border-2 rounded-2xl cursor-pointer flex items-center justify-between transition-all ${paymentMethod === 'COD' ? 'border-pink-500 bg-pink-50 shadow-md shadow-pink-100' : 'border-gray-100 bg-white'}`}>
                                        <span className="font-bold text-gray-700">Cash On Delivery</span>
                                        <input type="radio" className="w-5 h-5 accent-pink-600" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                                    </label>
                                    <label className={`p-5 border-2 rounded-2xl cursor-pointer flex items-center justify-between transition-all ${paymentMethod === 'UPI' ? 'border-pink-500 bg-pink-50 shadow-md shadow-pink-100' : 'border-gray-100 bg-white'}`}>
                                        <span className="font-bold text-gray-700">Pay Online</span>
                                        <input type="radio" className="w-5 h-5 accent-pink-600" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} />
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-pink-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-pink-700 transition-all shadow-xl shadow-pink-200 uppercase tracking-widest active:scale-[0.98]">
                                Place Order • ₹{totalAmount}
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- RIGHT SIDE: ORDER SUMMARY --- */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-3xl shadow-xl shadow-pink-100/50 border border-pink-50 sticky top-10">
                        <h3 className="text-xl font-black mb-6 text-pink-700 border-b border-pink-50 pb-4">Bag Summary</h3>
                        
                        <div className="space-y-5 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                            {cartItems.map((item, index) => {
                                const product = item.product_id;
                                return (
                                    <div key={index} className="flex gap-4 items-center bg-pink-50/30 p-2 rounded-2xl border border-pink-50/50">
                                        <img 
                                            src={product?.image?.[0]} 
                                            className="w-16 h-20 object-cover rounded-xl shadow-sm" 
                                            alt="product" 
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{product?.name}</h4>
                                            <p className="text-gray-500 text-[10px] font-bold">QTY: {item.quantity}</p>
                                            <p className="text-pink-600 font-black text-sm mt-1">₹{Number(product?.price) * item.quantity}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-6 border-t border-pink-100 space-y-3">
                            <div className="flex justify-between text-gray-500 font-bold text-sm uppercase">
                                <span>Bag Total</span>
                                <span>₹{totalAmount}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 font-bold text-sm uppercase">
                                <span>Shipping</span>
                                <span className="text-green-500">Free</span>
                            </div>
                            <div className="flex justify-between text-2xl font-black text-pink-600 pt-4 border-t border-dashed border-pink-200">
                                <span>Payable</span>
                                <span>₹{totalAmount}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-pink-400 uppercase tracking-tighter bg-pink-50/50 py-3 rounded-xl">
                            <i className="fa-solid fa-shield-halved text-pink-500"></i>
                            100% Safe & Secure Payments
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};