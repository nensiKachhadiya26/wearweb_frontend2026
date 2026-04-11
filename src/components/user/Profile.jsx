import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, ShieldCheck, Calendar, LogOut, Edit3, LayoutDashboard, ShoppingBag, X, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({ 
        firstName: '', 
        lastName: '', 
        email: '' 
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const res = await axios.get("/userApi/profile", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setUser(res.data);
            // ડેટા સેટ કરતી વખતે ખાતરી કરો કે વેલ્યુ ખાલી ના રહે
            setFormData({ 
                firstName: res.data.firstName || '', 
                lastName: res.data.lastName || '', 
                email: res.data.email || '' 
            });
        } catch (err) {
            console.error("Error fetching profile", err);
            if (err.response?.status === 401) navigate("/login");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            data.append("firstName", formData.firstName);
            data.append("lastName", formData.lastName);
            data.append("email", formData.email);
            
            if (selectedImage) {
                data.append("profilePic", selectedImage);
            }

            // CRITICAL: જો Admin માટે અલગ API હોય તો અહીં કન્ડિશન મૂકવી
            // અત્યારે આપણે ધારી લઈએ છીએ કે /userApi/updateProfile જ વાપરવાનું છે
            const res = await axios.put("/userApi/updateProfile", data, {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.status === 200 || res.status === 201) {
                toast.success("Profile Updated successfully! 🚀");
                setIsEditing(false);
                setSelectedImage(null); // ઈમેજ ક્લિયર કરો
                fetchProfile(); 
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed!");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="flex justify-center items-center h-screen">Loading Profile...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 relative">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-pink-100">
                
                {/* Header Section */}
                <div className="bg-pink-500 p-8 flex flex-col items-center">
                   <div className="relative w-32 h-32 md:w-40 md:h-40">
                    <img 
                        src={user.profilePic ? user.profilePic : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                        alt="Profile" 
                        className="w-full h-full rounded-full border-4 border-white shadow-xl object-cover aspect-square"
                    />
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-pink-200 hover:bg-pink-50 transition-transform active:scale-90"
                        >
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
                    {/* Email Card */}
                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-pink-50/50 border border-pink-100">
                        <div className="bg-pink-100 p-3 rounded-lg text-pink-600"><Mail size={22}/></div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                            <p className="text-gray-700 font-medium">{user.email}</p>
                        </div>
                    </div>

                    {/* Status Card */}
                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-pink-50/50 border border-pink-100">
                        <div className="bg-pink-100 p-3 rounded-lg text-pink-600"><ShieldCheck size={22}/></div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
                            <p className="text-green-600 font-bold uppercase">{user.status || "Active"}</p>
                        </div>
                    </div>

                    {/* Joined Card */}
                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-pink-50/50 border border-pink-100">
                        <div className="bg-pink-100 p-3 rounded-lg text-pink-600"><Calendar size={22}/></div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Joined</p>
                            <p className="text-gray-700 font-medium">
                                {user.created_at ? new Date(user.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "New Member"}
                            </p>
                        </div>
                    </div>

                    {/* Sign Out Card */}
                    <div onClick={handleLogout} className="flex items-center space-x-4 p-4 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 transition cursor-pointer">
                        <div className="bg-red-200 p-3 rounded-lg text-red-600"><LogOut size={22}/></div>
                        <div>
                            <p className="text-red-600 font-bold uppercase">Sign Out</p>
                            <p className="text-xs text-gray-400 font-medium">Logout from session</p>
                        </div>
                    </div>
                </div>
                {/* Navigation Buttons */}
                <div className="border-t border-gray-100 p-6 bg-gray-50 flex flex-wrap justify-center gap-4">
                    {user.role === 'admin' && (
                        <button onClick={() => navigate("/admin")} className="flex items-center gap-2 bg-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-pink-600 transition">
                            <LayoutDashboard size={20}/> Admin Panel
                        </button>
                    )}
                    {user.role === 'seller' && (
                        <button onClick={() => navigate("/seller")} className="flex items-center gap-2 bg-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-pink-600 transition">
                            <ShoppingBag size={20}/> Seller Panel
                        </button>
                    )}
                    {user.role === 'user' && (
                        <button onClick={() => navigate("/user")} className="bg-pink-500 text-white px-10 py-3 rounded-full font-bold shadow-lg hover:bg-pink-600 transition">
                            Home
                        </button>
                    )}
                </div>
            </div>

            {/* --- Edit Profile Modal --- */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-xl font-bold text-gray-800">Update Profile</h3>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 transition"><X size={24}/></button>
                        </div>

                        <form onSubmit={handleUpdate} className="p-6 space-y-4">
                            <div className="flex flex-col items-center mb-2">
                                <label className="relative cursor-pointer group">
                                    <div className="w-24 h-24 rounded-full border-2 border-pink-100 overflow-hidden bg-gray-50 shadow-inner">
                                        <img 
                                            src={selectedImage ? URL.createObjectURL(selectedImage) : (user.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")} 
                                            className="w-full h-full object-cover" 
                                            alt="Preview" 
                                        />
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full text-white border-2 border-white shadow-lg group-hover:scale-110 transition">
                                        <Camera size={14}/>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">First Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition" 
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Last Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition" 
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition font-medium text-gray-700" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className={`w-full p-4 rounded-xl font-bold text-white shadow-lg transition active:scale-95
                                        ${loading ? 'bg-gray-300' : 'bg-pink-500 hover:bg-pink-600'}`}
                                >
                                    {loading ? "Saving Changes..." : "Update Profile"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;