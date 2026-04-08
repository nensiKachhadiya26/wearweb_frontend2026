import React from "react";
import { FaTachometerAlt, FaStore, FaShoppingCart, FaPlusSquare,FaUserCircle } from "react-icons/fa";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { FiLogOut} from "react-icons/fi";
import { handleLogout } from "../utils/LogOut";

export const SellerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Active લિંક માટે સ્ટાઈલ નક્કી કરવા માટેનું ફંક્શન
  const isActive = (path) => location.pathname === path ? "bg-[#FFE6EC] text-[#FF3F6C]" : "text-gray-700";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* --- Sidebar (Fixed) --- */}
      <div className="h-screen w-64 bg-white shadow-lg border-r fixed left-0 top-0 z-10">
        {/* Logo */}
        <div className="p-6 text-2xl font-bold text-[#FF3F6C] border-b text-center">
          Wear Seller
        </div>

        {/* Menu Items */}
        <ul className="mt-6 space-y-2 px-4">
          <Link to="/seller">
            <li className={`flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition font-medium ${isActive("/seller")}`}>
              <FaTachometerAlt />
              Dashboard
            </li>
          </Link>

          <Link to="/seller/myproduct">
            <li className={`flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition font-medium ${isActive("/seller/myproduct")}`}>
              <FaStore />
              My Products
            </li>
          </Link>

          <Link to="/seller/createproduct">
            <li className={`flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition font-medium ${isActive("/seller/createproduct")}`}>
              <FaPlusSquare />
              Create Product
            </li>
          </Link>

        <Link to="/seller/order" className="block"> 
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition font-medium text-gray-700">
            <FaShoppingCart />
            Orders
          </li>
        </Link>
          <Link to="/profile" className="block"> 
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition font-medium text-gray-700">
            <FaUserCircle />
            Profile
          </li>
        </Link>
        </ul>

        {/* Logout Button at Bottom */}
        <div className="absolute bottom-0 w-full p-4 border-t bg-white">
          <div 
            className="flex items-center gap-2 p-3 cursor-pointer text-gray-600 hover:text-red-500 transition-all rounded-lg hover:bg-red-50"
            onClick={() => handleLogout(navigate)}
          >
            <FiLogOut size={20} />
            <span className="font-semibold">Logout</span>
          </div>
        </div>
      </div>

      {/* --- Main Content Area (Dynamic) --- */}
      <div className="flex-1 ml-64 p-10 min-h-screen bg-[#FFF5F7]">      
        <div className="max-w-7xl mx-auto">
           <Outlet />
        </div>
      </div>
    </div>
  );
};