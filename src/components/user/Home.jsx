import { useNavigate } from "react-router-dom";
import beauty from "../../assets/images/beauty.avif";
import home from "../../assets/images/home.jpg";
import men from "../../assets/images/men.png";
import women from "../../assets/images/women.avif";
import kids from "../../assets/images/kids.webp";
import banner from "../../assets/images/banner.jpg";
import watch from "../../assets/images/watch.jpg";
import shose from "../../assets/images/shose.jpg";
import lehnga from "../../assets/images/lehnga.jpg";
import jacket from "../../assets/images/jacket.png";
import sunscreen from "../../assets/images/sunscreen.jpg";
import wallart from "../../assets/images/wallart.jpg";
export const Home = () => {
  const navigate = useNavigate();

  // Sample categories
  const categories = [
    {
      name: "Men",
      image: men,
      path: "men",
    },
    {
      name: "Women",
      image: women,
      path: "women",
    },
    {
      name: "Kids",
      image: kids,
      path: "kids",
    },
    {
      name: "Home",
      image: home,
      path: "kids",
    },
    {
      name: "Beauty",
      image: beauty,
      path: "kids",
    },
  ];

  const productData = [
  { id: 1, name: "Watch", price: "3500", image: watch },
  { id: 2, name: "Shose", price: "4200", image: shose },
  { id: 3, name: "Lehnga", price: "5200", image: lehnga },
  { id: 4, name: "Jacket", price: "2500", image: jacket},
  { id: 5, name: "Sunscreen", price: "800", image: sunscreen},
  { id: 6, name: "Wall Art", price: "2500", image: wallart},
];

  return (
   <div className="bg-[#FFF0F5] min-h-screen w-full">
       <div className="space-y-6 p-4">

      {/* Banner */}
      <div className="w-full rounded-lg overflow-hidden">
        <img
          src={banner}
          alt="Banner"
          className="w-full object-cover"
        />
      </div>

      {/* Categories */}
      <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
      <div className="grid grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(cat.path)}
            className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img src={cat.image} className="w-full h-40 object-cover" />
            <p className="text-center font-semibold mt-2">{cat.name}</p>
          </div>
        ))}
      </div>

    
      <h2 className="text-2xl font-bold mt-8 mb-4">Trending Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {productData.map((product) => (
          <div key={product.id}  className="bg-white rounded shadow p-2 cursor-pointer hover:shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover"
            />
            <p className="mt-2 font-semibold">{product.name}</p>
            <p className="text-pink-500 font-bold">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};