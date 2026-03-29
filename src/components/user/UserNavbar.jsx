import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"; 
import { FaSearch } from "react-icons/fa";
import { handleLogout } from "../utils/LogOut"; 
import { useState } from "react";

export const UserNavbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    // જ્યારે યુઝર Enter કી દબાવે ત્યારે જ આ ચાલશે
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/user/search?q=${searchTerm}`);
      setSearchTerm(""); // સર્ચ થયા પછી ઇનપુટ ખાલી કરવા માટે
    }
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      
      {/* Logo */}
      <h1
        className="text-2xl font-bold text-pink-500 cursor-pointer"
        // onClick={() => navigate("/user")}
      >
        Wear Web
      </h1>

      {/* Menu */}
      <div className="flex gap-6 font-semibold">
        <p onClick={() => navigate("/user/men")} className="cursor-pointer  hover:text-pink-500">Men</p>
        <p onClick={() => navigate("/user/women")} className="cursor-pointer  hover:text-pink-500">Women</p>
        <p onClick={() => navigate("/user/kids")} className="cursor-pointer  hover:text-pink-500">Kids</p>
        <p onClick={() => navigate("/user/accessories")} className="cursor-pointer  hover:text-pink-500">Accessories</p>
        <p onClick={() => navigate("/user/beauty")} className="cursor-pointer  hover:text-pink-500">Beauty</p>

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

      {/* Right */}
       <div className="flex items-center gap-6">
        
        {/* Cart Icon */}
        <FaShoppingCart
          className="text-2xl cursor-pointer hover:text-pink-500"
          onClick={() => navigate("/user/cartpage")}
        />

        {/* Profile Icon */}
        <FaUserCircle
          className="text-2xl cursor-pointer hover:text-pink-500"
          onClick={() => navigate("/login")}
        />
        <FiLogOut
          className="text-2xl cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
          title="Logout"
          onClick={() => handleLogout(navigate)} // Utility function no upyog
        />

      </div>
    </div>
  );
};