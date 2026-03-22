import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes, FaBox, FaUser, FaRupeeSign } from "react-icons/fa";

export const ApproveProducts = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingProducts = async () => {
    try {
      const token = localStorage.getItem("token"); // Auth token jaruri che
      const res = await axios.get("/productApi/admin/pending", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setPendingProducts(res.data.data);
      }
    } catch (err) {
      console.error("Fetch pending error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
        const token = localStorage.getItem("token");
        // અમે કંટ્રોલરમાં 'updateProductStatus' ફંક્શન બનાવ્યું હતું
        const res = await axios.put(
            `productApi/admin/update-status/${id}`, 
            { status: "approved" }, // બોડીમાં સ્ટેટસ મોકલો
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
            alert("Product Approved!");
            fetchPendingProducts();
        }
    } catch (err) {
        console.error("Approval error", err);
    }
};

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  if (loading) return <div className="p-10 text-center font-bold text-[#FF3F6C]">Loading Pending Products...</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#FF3F6C]">Product Approvals</h2>
        <p className="text-gray-500">Review products added by sellers before they go live.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-5 text-sm font-bold text-gray-600">Product</th>
              <th className="p-5 text-sm font-bold text-gray-600">Seller</th>
              <th className="p-5 text-sm font-bold text-gray-600">Price</th>
              <th className="p-5 text-sm font-bold text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pendingProducts.length > 0 ? (
              pendingProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition">
                  <td className="p-5 flex items-center gap-3">
                    <img src={product.image} alt="" className="w-14 h-14 rounded-lg object-cover shadow-sm" />                    <span className="font-semibold text-gray-800">{product.name}</span>
                  </td>
                  <td className="p-5 text-gray-600 font-medium">
<div className="flex items-center gap-2"><FaUser size={12}/> {product.sellerId?.firstName} {product.sellerId?.lastName}</div>                  </td>
                  <td className="p-5 font-bold text-[#FF3F6C]">₹{product.price}</td>
                  <td className="p-5">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleApprove(product._id, "approve")}
                        className="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-600 hover:text-white transition shadow-sm"
                        title="Approve"
                      >
                        <FaCheck />
                      </button>
                      <button 
                        onClick={() => handleAction(product._id, "reject")}
                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition shadow-sm"
                        title="Reject"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-20 text-center text-gray-400 italic">
                   No pending products to review.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};