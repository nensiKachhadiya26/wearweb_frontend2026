import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaSearch, FaBoxOpen } from "react-icons/fa"; // FaBoxOpen ઉમેર્યું
import { FiLogOut } from "react-icons/fi"; 
import { handleLogout } from "../utils/LogOut"; 
import { useState } from "react";

export const UserNavbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/user/search?q=${searchTerm}`);
      setSearchTerm(""); 
    }
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      
      {/* Logo */}
      <h1
        className="text-2xl font-bold text-pink-500 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Wear Web
      </h1>

      {/* Menu */}
      <div className="flex gap-6 font-semibold items-center">
        <p onClick={() => navigate("/user")} className="cursor-pointer text-black hover:text-pink-500 transition-colors duration-200">Home</p>
        <p onClick={() => navigate("/user/men")} className="cursor-pointer hover:text-pink-500">Men</p>
        <p onClick={() => navigate("/user/women")} className="cursor-pointer hover:text-pink-500">Women</p>
        <p onClick={() => navigate("/user/kids")} className="cursor-pointer hover:text-pink-500">Kids</p>
        <p onClick={() => navigate("/user/accessories")} className="cursor-pointer hover:text-pink-500">Accessories</p>
        <p onClick={() => navigate("/user/beauty")} className="cursor-pointer hover:text-pink-500">Beauty</p>

        {/* Search Bar */}
        <div className="relative ml-4 hidden md:block">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input 
            type="text"
            placeholder="Search for products..."
            className="pl-10 pr-4 py-1.5 border border-gray-200 rounded-full focus:ring-2 focus:ring-pink-400 outline-none w-64 text-sm transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      {/* Right Icons Section */}
      <div className="flex items-center gap-6">
        
        {/* --- Order History Icon (નવો ઉમેરેલો) --- */}
        <div className="flex flex-col items-center group cursor-pointer" onClick={() => navigate("/user/orderhistory")}>
          <FaBoxOpen
            className="text-2xl text-gray-700 group-hover:text-pink-500 transition-colors"
            title="My Orders"
          />
          <span className="text-[10px] font-bold text-gray-500 group-hover:text-pink-500 uppercase">Orders</span>
        </div>

        {/* Cart Icon */}
        <div className="flex flex-col items-center group cursor-pointer" onClick={() => navigate("/user/cartpage")}>
          <FaShoppingCart
            className="text-2xl text-gray-700 group-hover:text-pink-500 transition-colors"
            title="Cart"
          />
          <span className="text-[10px] font-bold text-gray-500 group-hover:text-pink-500 uppercase">Cart</span>
        </div>

        {/* Profile Icon */}
        <FaUserCircle
          className="text-2xl cursor-pointer text-gray-700 hover:text-pink-500 transition-colors"
          title="Profile"
          onClick={() => navigate("/profile")} // અહીં પ્રોફાઇલ પેજનું પાથ ચેક કરી લેવો
        />

        {/* Logout Icon */}
        <FiLogOut
          className="text-2xl cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
          title="Logout"
          onClick={() => handleLogout(navigate)} 
        />

      </div>
    </div>
  );
};