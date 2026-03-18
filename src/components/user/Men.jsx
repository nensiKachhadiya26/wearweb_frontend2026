import React, { useEffect, useState } from "react";
import axios from "axios";
import menbgi from "../../assets/images/menbgi.jpg";
import { useNavigate } from "react-router-dom";

const Men = () => {

const [products,setProducts] = useState([])

 const navigate = useNavigate();
        useEffect(()=>{
             axios.get("productApi/products")
           
            .then((res)=>{
                setProducts(res.data.data)
            })
            .catch((err)=>{
                console.log(err)
            })
},[])
products.filter((product) => product.category === "Men")


return (

    <div className="bg-gray-50 min-h-screen">

{/* Banner */}

    <div className="w-full h-64 bg-cover bg-center" style={{backgroundImage:`url(${menbgi})`}}/>

    <div className="flex gap-8 px-10 py-8">

{/* Filters */}

    <div className="w-64 bg-white p-5 rounded shadow">

    {/* <h2 className="font-bold mb-5 text-lg">Filters</h2> */}

{/* Brand */}

    {/* <div className= "mb-5 pointer-events-none">
        <h3 className="font-semibold mb-2">Category</h3>
        <label className="block"><input type="checkbox"  /> Jeans</label>
        <label className="block"><input type="checkbox"  /> Shirt</label>
        <label className="block"><input type="checkbox"  /> T-Shirt</label>
        <label className="block"><input type="checkbox"  /> Jacket</label>
        <label className="block"><input type="checkbox"  /> Footware</label>
        <label className="block"><input type="checkbox"  /> Watch</label>
    </div> */}

{/* Size */}

    {/* <div className="mb-5">
        <h3 className="font-semibold mb-2">Size</h3>
        <div className="flex gap-2">
            <button className="border px-3 py-1">S</button>
            <button className="border px-3 py-1">M</button>
            <button className="border px-3 py-1">L</button>
            <button className="border px-3 py-1">XL</button>
        </div>
    </div> */}

    {/* Color */}

    {/* <div>
        <h3 className="font-semibold mb-2">Color</h3>
        <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-red-500 border"></span>
            <span className="w-6 h-6 rounded-full bg-blue-500 border"></span>
            <span className="w-6 h-6 rounded-full bg-black border"></span>
            <span className="w-6 h-6 rounded-full bg-green-500 border"></span>
            <span className="w-6 h-6 rounded-full bg-yellow-400 border"></span>
        </div>
    </div> */}
</div>

    {/* Products */}

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
     {products
    .filter(product => product.categoryId?.name === "Men")
    .map((product) => (
    <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-xl transition relative">
      <img src={product.image?.[0] || "/placeholder.jpg"} className="w-full h-64 object-cover rounded-t-lg" alt={product.name} />

    <div className="p-4">

        <h3 className="font-semibold">{product.name}</h3>

        <p className="text-gray-500 text-sm">
            Premium Fashion
        </p>

    <div className="flex justify-between items-center mt-3">

        <span className="text-pink-600 font-bold">
            ₹{product.price}
        </span>

        <button
  onClick={() => navigate(`/user/product/${product._id}`)}
  className="bg-pink-500 text-white px-3 py-1 rounded text-sm"
>
  Buy
</button>
        <button className="bg-pink-500 text-white px-3 py-1 rounded text-sm">
            Add To Cart
        </button>
        

    </div>

</div>

</div>

))}

</div>


</div>

</div>

)}

export default Men