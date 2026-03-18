import React from "react";
import {FaTachometerAlt,FaUsers,FaStore,FaCheckCircle,FaShoppingCart,FaStar,} from "react-icons/fa";
import { AdminHome } from "./AdminHome";
import { Outlet } from "react-router-dom";

export const AdminSidebar = () => {
  return (
    <>
    
    <div className="h-screen w-64 bg-white shadow-lg border-r fixed">
      
      {/* Logo */}
      <div className="p-6 text-2xl font-bold text-[#FF3F6C] border-b">
        Wear Admin
      </div>

      {/* Menu */}
      <ul className="mt-6 space-y-2 px-4">

        <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition">
          <FaTachometerAlt />
          Dashboard
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition">
          <FaUsers />
          Manage Users
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition">
          <FaStore />
          Manage Sellers
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition">
          <FaCheckCircle />
          Approve Products
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition">
          <FaShoppingCart />
          View Sales
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition">
          <FaStar />
          Reviews
        </li>

      </ul>
    </div>
    <Outlet/>
    </>
  );
};