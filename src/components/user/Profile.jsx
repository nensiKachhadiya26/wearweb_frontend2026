import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, ShieldCheck, Calendar, LogOut, Edit3, LayoutDashboard, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // પૂરો URL વાપરવો જેથી પોર્ટની ભૂલ ન આવે
                const res = await axios.get("/userApi/profile", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setUser(res.data);
            } catch (err) {
                console.error("Error fetching profile", err);
                // જો ટોકન એક્સપાયર થઈ ગયો હોય તો લોગીન પર મોકલી દેવું
                if(err.response?.status === 401) navigate("/login");
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!user) return <div className="text-center mt-10">Loading Profile...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-pink-100">
                
                {/* Header Section */}
                <div className="bg-pink-500 p-8 flex flex-col items-center">
                    <div className="relative">
                        <img 
                            src={user.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md bg-white"
                        />
                        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-pink-200 hover:bg-pink-50">
                            <Edit3 size={18} className="text-pink-600" />
                        </button>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-white uppercase tracking-wide">
                        {user.firstName} {user.lastName}
                    </h2>
                    <span className="mt-1 px-4 py-1 bg-white/20 text-white rounded-full text-sm font-bold uppercase">
                        {user.role}
                    </span>
                </div>

                {/* Details Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-pink-50/50 border border-pink-100">
                        <div className="bg-pink-100 p-3 rounded-lg text-pink-600"><Mail size={22}/></div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                            <p className="text-gray-700 font-medium">{user.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-pink-50/50 border border-pink-100">
                        <div className="bg-pink-100 p-3 rounded-lg text-pink-600"><ShieldCheck size={22}/></div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
                            <p className="text-green-600 font-bold uppercase">{user.status || "Active"}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-pink-50/50 border border-pink-100">
                        <div className="bg-pink-100 p-3 rounded-lg text-pink-600"><Calendar size={22}/></div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Joined</p>
                            <p className="text-gray-700 font-medium">{user.created_at ? new Date(user.created_at).toLocaleDateString() : "No Date Available"}</p>
                        </div>
                    </div>

                    {/* Logout Option */}
                    <div onClick={handleLogout} className="flex items-center space-x-4 p-4 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 transition cursor-pointer">
                        <div className="bg-red-200 p-3 rounded-lg text-red-600"><LogOut size={22}/></div>
                        <div>
                            <p className="text-red-600 font-bold">Sign Out</p>
                            <p className="text-xs text-gray-400 font-medium">Logout from session</p>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons - Role Based */}
                <div className="border-t border-gray-100 p-6 bg-gray-50 flex flex-wrap justify-center gap-4">
                    {user.role === 'admin' && (
                        <button onClick={() => navigate("/admin")} className="flex items-center gap-2 bg-gray-800 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-black transition">
                            <LayoutDashboard size={20}/> Admin Panel
                        </button>
                    )}
                    
                    {user.role === 'seller' && (
                        <button onClick={() => navigate("/seller")} className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition">
                            <ShoppingBag size={20}/> Seller Panel
                        </button>
                    )}

                    {user.role === 'user' && (
                        <button onClick={() => navigate("/orders")} className="bg-pink-600 text-white px-10 py-3 rounded-full font-bold shadow-lg hover:bg-pink-700 transition">
                            Manage My Orders
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;