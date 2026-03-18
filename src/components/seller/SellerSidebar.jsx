import React from "react";
import { FaTachometerAlt, FaStore, FaShoppingCart } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export const SellerSidebar = () => {
  return (
    
    <div className="h-screen w-64 bg-white shadow-lg border-r fixed">
        {/* Logo */}
        <div className="p-6 text-2xl font-bold text-[#FF3F6C] border-b">
          Wear Seller
        </div>

        {/* Menu */}
        <ul className="mt-6 space-y-2 px-4">
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition">
            <FaTachometerAlt />
            Dashboard
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition">
            <FaStore />
            My Products
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition">
            <FaShoppingCart />
            Orders
          </li>
          <Link to='/seller/createproduct'>
           <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFE6EC] hover:text-[#FF3F6C] cursor-pointer transition">
            <FaShoppingCart />
            Create Product
          </li>
          </Link>
        </ul>
    </div>
  );
};