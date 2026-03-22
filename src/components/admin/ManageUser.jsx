import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEnvelope, FaInfoCircle, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Users fetch કરવા માટે
  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/userApi/getuser");
      if (res.data && res.data.data) {
        setUsers(res.data.data);
      }
    } catch (err) {
      toast.error("Error getting user");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // User delete કરવા માટે
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      try {
        await axios.delete(`/userApi/user/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User deleted");
      } catch (err) {
        toast.error("Error deleting user");
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-[#FF3F6C] font-bold animate-pulse">
        Loading Users...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#FF3F6C]">Manage Users</h2>
          <p className="text-gray-500 mt-1">
            View and manage all registered customers in your application.
          </p>
        </div>
        <div className="bg-[#FF3F6C] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2">
          Total Users: <span className="text-lg">{users.length}</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wider">User Name</th>
              <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wider">Contact Info</th>
              <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wider text-center">Role</th>
              <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-pink-50/20 transition-all duration-200 group">
                  {/* Name Section with Avatar */}
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-pink-100 text-[#FF3F6C] rounded-full flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                        {user.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}
                      </div>
                      <span className="font-semibold text-gray-800 text-lg">
                        {`${user.firstName} ${user.lastName || ""}`}
                      </span>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaEnvelope className="text-gray-400" />
                      {user.email}
                    </div>
                  </td>

                  {/* Role Badge */}
                  <td className="p-5 text-center">
                    <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black shadow-sm tracking-wide">
                      {user.role?.toUpperCase() || "USER"}
                    </span>
                  </td>

                  {/* Delete Action */}
                  <td className="p-5 text-right">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                      title="Delete User"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-24 text-center text-gray-400 italic">
                  <div className="flex flex-col items-center gap-2">
                    <FaInfoCircle className="text-5xl opacity-10 mb-2" />
                    <p>No users found in the database.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};