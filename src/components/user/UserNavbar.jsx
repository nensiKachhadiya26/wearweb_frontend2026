import { useNavigate } from "react-router-dom";

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
        <p onClick={() => navigate("/user/men")} className="cursor-pointer">Men</p>
        <p onClick={() => navigate("/user/women")} className="cursor-pointer">Women</p>
        <p onClick={() => navigate("/user/kids")} className="cursor-pointer">Kids</p>
      </div>

      {/* Right */}
      <div className="flex gap-4">
        <p onClick={() => navigate("/login")}>Profile</p>
        <p>Cart</p>
      </div>
    </div>
  );
};