import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`productApi/product/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!product) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div>
          <img
            src={product.image?.[0] || "https://picsum.photos/400"}
            className="w-full h-[400px] object-cover rounded-lg"
            alt={product.name}
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500 mt-2">
            Premium Quality Product
          </p>

          <p className="text-2xl text-pink-600 font-bold mt-4">
            ₹{product.price}
          </p>

          <p className="mt-4 text-gray-700">
            {product.description || "No description available"}
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">

            <button
              onClick={() => navigate("/user/cartpage")}
              className="bg-pink-500 text-white px-6 py-2 rounded-lg"
            >
              Add To Cart
            </button>

            <button
              onClick={() => alert("Proceed to Checkout")}
              className="bg-black text-white px-6 py-2 rounded-lg"
            >
              Buy Now
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;