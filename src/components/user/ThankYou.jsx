import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ThankYou = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // PaymentComponents માંથી મોકલેલો paymentId અહીં મેળવો
    const referenceId = location.state?.paymentId || "N/A";

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold">
                    ✓
                </div>
                
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Thank You!</h1>
                <p className="text-gray-600 mb-8">Your order has been placed successfully. We are preparing it for delivery!</p>
                
                <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left border border-gray-100">
                    <p className="text-gray-400 text-xs uppercase font-bold mb-1 tracking-widest">Order Reference</p>
                    {/* અહીં referenceId નો ઉપયોગ કર્યો છે જેથી હવે 'orderId is not defined' એરર નહીં આવે */}
                    <p className="font-mono text-gray-800 font-bold text-lg">
                        #{referenceId !== "N/A" ? referenceId : "REFERENCE-NOT-FOUND"}
                    </p>
                </div>

                <div className="space-y-4">
                    <button 
                        onClick={() => navigate('/user')} 
                        className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-pink-700 transition-all shadow-lg active:scale-95"
                    >
                        Continue Shopping
                    </button>
                    <button 
                        onClick={() => navigate('/user/orderhistory')} 
                        className="w-full bg-white text-gray-700 py-3 rounded-2xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all"
                    >
                        View Order History
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;