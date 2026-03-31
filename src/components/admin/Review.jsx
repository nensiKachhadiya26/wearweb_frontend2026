import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaStar, FaRegCommentDots } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/reviewApi/all");
            setReviews(res.data.data || res.data);
        } catch (err) {
            console.error("Error fetching reviews:", err);
            toast.error("Failed to load reviews!");
        } finally {
            setLoading(false);
        }
    };

    const deleteReview = async (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await axios.delete(`/reviewApi/delete/${id}`);
                setReviews(reviews.filter(r => r._id !== id));
                toast.success("Review deleted successfully!");
            } catch (err) {
                console.error("Delete error:", err);
                toast.error("Failed to delete review.");
            }
        }
    };

    if (loading) return (
        <div className="p-8 text-center text-pink-600 font-bold animate-pulse">
            Loading Reviews...
        </div>
    );

    return (
        <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaRegCommentDots className="text-pink-500" /> Platform Reviews
                </h2>
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-bold">
                    Total: {reviews.length}
                </span>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 text-gray-600 font-semibold uppercase text-xs">Customer</th>
                            <th className="p-4 text-gray-600 font-semibold uppercase text-xs">Product</th>
                            <th className="p-4 text-gray-600 font-semibold uppercase text-xs">Rating</th>
                            <th className="p-4 text-gray-600 font-semibold uppercase text-xs">Comment</th>
                            <th className="p-4 text-gray-600 font-semibold uppercase  text-xs text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {reviews.length > 0 ? (
                            reviews.map((rev) => (
                                <tr key={rev._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-gray-800">
                                {rev.userId ? `${rev.userId.firstName} ${rev.userId.lastName}` : "Anonymous"}                                            </div>
                                        <div className="text-[10px] text-gray-400">
                                            {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : "Date N/A"}
                                        </div>
                                    </td>
                                    <td className="p-4 text-blue-600 font-medium">
                                        {rev.productId?.name || "Product Unavailable"}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex text-yellow-400 gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar 
                                                    key={i} 
                                                    className={i < Number(rev.rating) ? "text-yellow-400" : "text-gray-200"} 
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm max-w-xs truncate lg:max-w-md italic">
                                        "{rev.comment || "No comment provided"}"
                                    </td>
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => deleteReview(rev._id)} 
                                            className="text-red-400 hover:text-red-600 hover:scale-125 cursor-pointer transition-all p-2 rounded-full hover:bg-red-50"
                                            title="Delete Review"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-10 text-center text-gray-400 italic">
                                    No reviews found on the platform.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Review;