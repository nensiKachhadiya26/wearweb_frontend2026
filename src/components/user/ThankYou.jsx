import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ThankYou = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const referenceId = location.state?.paymentId || "N/A";

   return (
   
    <div className="min-h-screen bg-[#FFF0F5] flex items-center justify-center p-6 text-center">
        
       
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-pink-100">
            
         
            <div className="w-20 h-20 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold shadow-inner">
                ✓
            </div>
            
           
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Thank You!</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
                Your order has been placed successfully. <br/>
                We are preparing it for delivery!
            </p>
            
           
            <div className="bg-[#FFF9FA] rounded-2xl p-5 mb-8 text-left border border-pink-50">
                <p className="text-pink-400 text-xs uppercase font-bold mb-1 tracking-widest">Order Reference</p>
                <p className="font-mono text-gray-700 font-bold text-lg">
                    #{referenceId !== "N/A" ? referenceId : "REFERENCE-NOT-FOUND"}
                </p>
            </div>

            <div className="space-y-4">
               
                <button 
                    onClick={() => navigate('/user')} 
                    className="w-full bg-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-pink-600 transition-all shadow-lg shadow-pink-200 active:scale-95"
                >
                    Continue Shopping
                </button>

               
                <button 
                    onClick={() => navigate('/user/orderhistory')} 
                    className="w-full bg-white text-pink-600 py-3 rounded-2xl font-semibold border-2 border-pink-100 hover:bg-pink-50 transition-all"
                >
                    View Order History
                </button>
            </div>
        </div>
    </div>
);
};

export default ThankYou;