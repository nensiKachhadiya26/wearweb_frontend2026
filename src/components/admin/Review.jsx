import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaStar } from 'react-icons/fa';

const Review = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getReviews = async () => {
            const res = await axios.get("/reviewApi/all");
            setReviews(res.data.data || res.data);
        };
        getReviews();
    }, []);

    const deleteReview = async (id) => {
        if(window.confirm("આ રિવ્યૂ ડિલીટ કરવો છે?")) {
            await axios.delete(`/reviewApi/delete/${id}`);
            setReviews(reviews.filter(r => r._id !== id));
        }
    };

    return (
        <div className="p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Platform Reviews</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Product</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4">Comment</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((rev) => (
                            <tr key={rev._id} className="border-b">
                                <td className="p-4 font-medium">{rev.userId?.fullName}</td>
                                <td className="p-4 text-blue-500">{rev.productId?.productName}</td>
                                <td className="p-4 flex text-yellow-400">
                                    {[...Array(Number(rev.rating))].map((_, i) => <FaStar key={i} />)}
                                </td>
                                <td className="p-4 text-gray-600 text-sm">{rev.comment}</td>
                                <td className="p-4">
                                    <button onClick={() => deleteReview(rev._id)} className="text-red-500 hover:scale-110 transition-transform">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Review