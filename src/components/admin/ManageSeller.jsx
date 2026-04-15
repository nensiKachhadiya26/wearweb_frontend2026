import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaStore, FaEnvelope, FaInfoCircle } from "react-icons/fa";


export const ManageSeller = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellers = async () => {
    try {
      const res = await axios.get("/userApi/getsellers");
      if (res.data.success) {
        setSellers(res.data.data);
      }
    } catch (err) {
      console.error("Seller fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete function 
  const deleteSeller = async (id) => {
    if (window.confirm("Are you sure you want to remove this seller?")) {
      try {
        await axios.delete(`/userApi/user/${id}`);
        setSellers(prevSellers => prevSellers.filter(seller => seller._id !== id));
      } catch (err) {
        alert("Error deleting seller");
      }
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  if (loading) return <div className="p-10 text-center text-[#FF3F6C] font-bold">Loading Sellers...</div>;

  return (
    <div className="p-4 sm:p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#FF3F6C]">Seller Management</h2>
          <p className="text-gray-500 mt-1">Manage all your verified and pending sellers here.</p>
        </div>
        <div className="bg-[#FF3F6C] text-white px-4 py-2 rounded-lg font-bold shadow-md">
          Total Sellers: {sellers.length}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wider">Seller Name</th>
              <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wider">Email Info</th>
              <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wider text-center">Status</th>
              <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sellers.length > 0 ? (
              sellers.map((seller) => (
                <tr key={seller._id} className="hover:bg-pink-50/30 transition-all duration-200">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-pink-100 text-[#FF3F6C] rounded-full flex items-center justify-center font-bold">
                        {seller?.firstName ? seller.firstName.charAt(0).toUpperCase() : "S"}
                      </div>
                      <span className="font-semibold text-gray-800 text-lg">
                         {seller?.firstName ? `${seller.firstName} ${seller.lastName || ''}` : "No Name Provided"}
                      </span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaEnvelope className="text-gray-400" />
                      {seller?.email || "No Email"}
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <span className="bg-green-100 text-green-600 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                      ACTIVE
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => deleteSeller(seller._id)}
                      className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-3 rounded-xl transition-all duration-300"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-20 text-center text-gray-400 italic">
                  <FaInfoCircle className="mx-auto text-4xl mb-3 opacity-20" />
                  No sellers registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};