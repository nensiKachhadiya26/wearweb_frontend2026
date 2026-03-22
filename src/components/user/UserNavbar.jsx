import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"; 
import { handleLogout } from "../utils/LogOut"; 

export const UserNavbar = () => {
  const navigate = useNavigate();

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