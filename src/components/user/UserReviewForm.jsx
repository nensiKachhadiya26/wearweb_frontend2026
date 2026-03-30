import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserReviewForm = ({ productId }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await axios.post("/reviewApi/add", {
                productId,
                rating,
                comment
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("તમારો રિવ્યૂ સબમિટ થઈ ગયો છે! 🎉");
            setComment(""); // ફોર્મ ક્લિયર કરવા
        } catch (err) {
            toast.error(err.response?.data?.error || "રિવ્યૂ સબમિટ કરવામાં ભૂલ આવી.");
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md mt-8 border border-pink-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating (1 to 5)</label>
                    <select 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
                    >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Good</option>
                        <option value="2">2 - Poor</option>
                        <option value="1">1 - Terrible</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Your Experience</label>
                    <textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="તમને આ પ્રોડક્ટ કેવી લાગી?"
                        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
                        rows="3"
                        required
                    />
                </div>
                <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-700">
                    Submit Review
                </button>
            </form>
        </div>
    );
};
export default UserReviewForm