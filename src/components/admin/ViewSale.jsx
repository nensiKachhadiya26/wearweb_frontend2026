import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRupeeSign, FaShoppingCart, FaUserTie, FaTimes, FaSearch, FaImage } from "react-icons/fa";

const ViewSale = () => {
  const [salesData, setSalesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // સર્ચ માટે સ્ટેટ
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/userApi/view-sales", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setSalesData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching sales:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  const closePreview = () => setSelectedImage(null);

  // ફિલ્ટર લોજિક: પ્રોડક્ટ નામ અથવા ઓર્ડર આઈડી થી સર્ચ કરવા
  const filteredSales = salesData.filter(sale => 
    sale.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.order_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // સ્ટેટ્સ ગણતરી (ફિલ્ટર કરેલા ડેટા પરથી)
const totalRevenue = filteredSales.reduce((acc, curr) => {
  return acc + (Number(curr.amount) || 0);
}, 0);
const totalOrders = filteredSales.length;

  if (loading) return <div className="p-10 text-center font-bold text-pink-500">Loading Sales Data...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#ff3f6c]">Platform Sales Analytics</h1>
        
        {/* સર્ચ બાર */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="text"
            placeholder="Search Order or Product..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none w-full md:w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-gray-500 text-sm uppercase font-semibold">Total Revenue</p>
          <h2 className="text-2xl font-bold text-gray-800">₹{totalRevenue.toLocaleString()}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm uppercase font-semibold">Total Orders</p>
          <h2 className="text-2xl font-bold text-gray-800">{totalOrders}</h2>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Seller</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSales.map((sale, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6 text-blue-600 font-medium">#{sale.order_id?.slice(-6)}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      {sale.product_image ? (
                        <img 
                          src={sale.product_image} 
                          className="w-12 h-12 rounded shadow-sm object-cover border border-gray-100 cursor-pointer hover:scale-110 transition-transform"
                          alt="product"
                          onClick={() => setSelectedImage(sale.product_image)}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                          <FaImage />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700">{sale.product_name}</span>
                        <span className="text-xs text-gray-500">Qty: {sale.quantity}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-bold px-2 py-1 bg-pink-50 text-[#ff3f6c] rounded">
                      {sale.seller_name || "Direct Sale"}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">
                    {/* Amount calculation check */}
                      <td className="py-4 px-6 font-bold text-gray-900">
                        {sale.amount > 0 ? `₹${sale.amount.toLocaleString()}` : <span className="text-gray-400 font-normal">N/A</span>}
                      </td> 
                   </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      sale.status === "Delivered" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredSales.length === 0 && (
            <div className="p-10 text-center text-gray-500">No data found matching your search.</div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closePreview}>
          <div className="bg-white p-2 rounded-xl relative max-w-[90%] max-h-[90%]" onClick={(e) => e.stopPropagation()}>
            <button className="absolute -top-4 -right-4 bg-[#ff3f6c] text-white p-2 rounded-full shadow-lg" onClick={closePreview}>
              <FaTimes />
            </button>
            <img src={selectedImage} alt="preview" className="max-w-full max-h-[80vh] rounded-lg object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSale;