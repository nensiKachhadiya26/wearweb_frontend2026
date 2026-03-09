import React from 'react'
import { FaUser, FaHeart, FaShoppingBag, FaSearch } from "react-icons/fa";
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const UserNavbar = () => {
  return (
    <div>
      <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-[#FF3F6C] cursor-pointer">
            Wear Web
          </h1>

           <ul className="hidden md:flex gap-6 font-medium text-gray-700">
            <li className="hover:text-[#FF3F6C] cursor-pointer">Men</li>
            <li className="hover:text-[#FF3F6C] cursor-pointer">Women</li>
            <li className="hover:text-[#FF3F6C] cursor-pointer">Kids</li>
            <li className="hover:text-[#FF3F6C] cursor-pointer">Home</li>
            <li className="hover:text-[#FF3F6C] cursor-pointer">Beauty</li>
          </ul> 
          {/* <ul className="hidden md:flex gap-2 font-medium text-gray-700">
            <li><Link to="/user/getapidemo" className="hover:text-[#FF3F6C] cursor-pointer">
                GETAPIDEMO1
              </Link></li><br></br>
            <li><Link to="/user/useeffectdemo" className="hover:text-[#FF3F6C] cursor-pointer">
                UseEffectDemo
              </Link></li>
          </ul> */}
        </div>

        {/* Center - Search Box */}
        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-md w-96">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 text-gray-700 text-sm">

          <div className="flex flex-col items-center cursor-pointer hover:text-[#FF3F6C]">
            <FaUser size={18} />
            <span>Profile</span>
          </div>

          <div className="flex flex-col items-center cursor-pointer hover:text-[#FF3F6C]">
            <FaHeart size={18} />
            <span>Wishlist</span>
          </div>

          <div className="flex flex-col items-center cursor-pointer hover:text-[#FF3F6C]">
            <FaShoppingBag size={18} />
            <span>Bag</span>
          </div>

        </div>
      </div>
    </nav>
    <Outlet/>
    </div>
  )
}
