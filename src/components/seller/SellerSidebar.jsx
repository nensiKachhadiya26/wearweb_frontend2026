import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaStore, 
  FaPlusSquare, 
  FaShoppingCart, 
  FaSignOutAlt, 
  FaUserCircle 
} from "react-icons/fa";
import { handleLogout } from "../utils/LogOut";
import DashboardFooter from "../DashboardFooter";


export const SellerSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#FFF0F3]">
      {/* 1. Sidebar Section (Fixed) */}
      <div className="w-64 fixed h-screen bg-white shadow-xl border-r z-50 p-5 flex flex-col">
        <h2 className="text-2xl font-black text-[#FF3F6C] mb-10 ">Wear Seller</h2>
        
        <ul className="space-y-2 flex-1">
          <li 
            onClick={() => navigate("/seller")} 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition-all font-semibold text-gray-600"
          >
            <FaTachometerAlt /> Dashboard
          </li>

          <li 
            onClick={() => navigate("/seller/myproduct")} 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition-all font-semibold text-gray-600"
          >
            <FaStore /> My Products
          </li>

          <li 
            onClick={() => navigate("/seller/createproduct")} 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition-all font-semibold text-gray-600"
          >
            <FaPlusSquare /> Create Product
          </li>

          <li 
            onClick={() => navigate("/seller/order")} 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition-all font-semibold text-gray-600"
          >
            <FaShoppingCart /> Orders
          </li>
        </ul>

        {/* Bottom Section: Logout & Profile */}
        <div className="mt-auto border-t pt-2">
          {/* <button 
            onClick={() => handleLogout(navigate)}
            className="w-full flex items-center gap-3 p-3 text-gray-500 hover:text-red-500 transition font-bold"
          >
            <FaSignOutAlt /> Logout
          </button> */}
          
          <li 
            onClick={() => navigate("/profile")} 
            className="flex items-center gap-3 p-3 text-gray-500 hover:text-red-500 transition font-bold list-none cursor-pointer"
          >
            <FaUserCircle /> Profile
          </li>
        </div>
      </div>

      {/* 2. Main Content Area (Dynamic) */}
          <div className="flex-1 ml-64 min-h-screen flex flex-col justify-between">
          <div className="p-8">
           <Outlet /> 
        </div>
       <DashboardFooter role="seller" />
      </div>
       
    </div>
  );
};