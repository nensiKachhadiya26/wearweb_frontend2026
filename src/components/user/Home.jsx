import { useNavigate } from "react-router-dom";
import beauty from "../../assets/images/beauty.avif";
import home from "../../assets/images/home.jpg";
import men from "../../assets/images/men.png";
import women from "../../assets/images/women.avif";
import kids from "../../assets/images/kids.webp";
import banner1 from "../../assets/images/banner1.png";
import watch from "../../assets/images/wa1.webp";
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
      name: "Accessories",
      image: home,
      path: "accessories",
    },
    {
      name: "Beauty",
      image: beauty,
      path: "beauty",
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
      <div className="max-w-7xl mx-auto p-6">
        
        {/* --- NEW HERO SECTION (IMAGE JEVI DESIGN) --- */}
        <div className="flex flex-col md:flex-row items-center justify-between py-12 gap-10">
          {/* Left Side: Text Content */}
          <div className="md:w-1/2 space-y-6">
            <p className="text-pink-600 font-bold tracking-widest uppercase text-sm">
              ✨ Best Collection 2026
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 leading-tight">
              Elevate Your <span className="text-pink-500">Style</span> into Trends
            </h1>
            <p className="text-gray-600 text-lg">
              Explore the latest fashion for Men, Women, and Kids. 
              High-quality fabrics with the best pink-themed designs just for you.
            </p>
            <button 
             // onClick={() => navigate('/all-products')}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Right Side: Image Grid (Image ma che tevi layout) */}
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src={women} alt="Women" className="rounded-2xl h-64 w-full object-cover shadow-md" />
              <img src={watch} alt="Accessory" className="rounded-2xl h-40 w-full object-cover shadow-md" />
            </div>
            <div className="space-y-4 mt-8">
              <img src={men} alt="Men" className="rounded-2xl h-40 w-full object-cover shadow-md" />
              <img src={lehnga} alt="Ethnic" className="rounded-2xl h-64 w-full object-cover shadow-md" />
            </div>
          </div>
        </div>
        {/* --- HERO SECTION END --- */}

        {/* Categories Section */}
        <h2 className="text-2xl font-bold mb-6 mt-12">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(cat.path)}
              className="group cursor-pointer bg-white p-2 rounded-xl shadow-sm hover:shadow-xl transition-all"
            >
              <div className="overflow-hidden rounded-lg">
                <img src={cat.image} className="w-full h-48 object-cover group-hover:scale-110 transition-duration-500" />
              </div>
              <p className="text-center font-bold mt-3 text-gray-700">{cat.name}</p>
            </div>
          ))}
        </div>

        {/* Trending Products */}
        <h2 className="text-2xl font-bold mt-16 mb-6">Trending Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productData.map((product) => (
            <div key={product.id}
           // onClick={() => navigate(`/user/productdetail/${product.id}`)}
             className="bg-white rounded-2xl shadow-sm p-4 cursor-pointer hover:shadow-pink-200 hover:shadow-lg transition-all border border-pink-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="mt-4">
                <p className="text-gray-500 text-sm uppercase">Fashion</p>
                <p className="font-bold text-lg text-gray-800">{product.name}</p>
                {/* <p className="text-pink-500 font-black text-xl mt-1">₹{product.price}</p> */}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};