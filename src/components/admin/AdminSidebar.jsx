import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaStore, FaBoxOpen,FaRupeeSign,FaHistory,FaSignOutAlt,FaUserCircle } from "react-icons/fa";
import { handleLogout } from "../utils/LogOut";


export const AdminSidebar = () => {
  const navigate = useNavigate();
 

  return (
    <div className="flex min-h-screen bg-[#FFF0F3]">
      {/* 1. Sidebar Section (Fixed) */}
      <div className="w-64 fixed h-screen bg-white shadow-xl border-r z-50 p-5 flex flex-col">
        <h2 className="text-2xl font-black text-[#FF3F6C] mb-10 ">Wear Admin</h2>
        <ul className="space-y-2 flex-1">
          <li onClick={() => navigate("/admin")} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition-all font-semibold text-gray-600">
            <FaTachometerAlt /> Dashboard
          </li>
          <li onClick={() => navigate("/admin/manage-user")} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition-all font-semibold text-gray-600">
            <FaUsers /> Manage Users
          </li>
          <li onClick={() => navigate("/admin/manage-seller")} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition-all font-semibold text-gray-600">
            <FaStore /> Manage Sellers
          </li>
          <li onClick={() => navigate("/admin/approve-products")} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition-all font-semibold text-gray-600">
            <FaBoxOpen  /> 
            Approve Products
          </li>
         <li onClick={() => navigate("/admin/view-sales")} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition-all font-semibold text-gray-600">
           <FaRupeeSign/> 
           View Sales
         </li>
         <li onClick={() => navigate("/admin/reviews")} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition-all font-semibold text-gray-600">
            <FaHistory />
             Reviews
          </li>
        </ul>
         <div className="mt-auto border-t pt-2">
        {/* <button onClick={() => handleLogout(navigate)}
        className="flex items-center gap-3 p-3 text-gray-500 hover:text-red-500 transition font-bold border-t mt-auto">
          <FaSignOutAlt /> Logout
        </button> */}
        <li onClick={() => navigate("/profile")} className="flex items-center gap-3 p-3 text-gray-500 hover:text-red-500 transition font-bold list-none cursor-pointer">
            <FaUserCircle />
             Profile
        </li>
        </div>
      </div>

      {/* 2. Main Content Area (Dynamic) */}
      {/* ml-64 etle mukyu che jethi content sidebar ni BAJU ma rahe, niche nahi */}
      <div className="flex-1 ml-64 min-h-screen">
        <Outlet /> 
      </div>
    </div>
  );
};