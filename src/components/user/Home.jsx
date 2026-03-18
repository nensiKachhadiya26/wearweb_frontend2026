import { useNavigate } from "react-router-dom";
export const Home = () => {
  const navigate = useNavigate();

  // Sample categories
  const categories = [
    {
      name: "Men",
      image: "https://via.placeholder.com/200x200?text=Men",
      path: "men",
    },
    {
      name: "Women",
      image: "https://via.placeholder.com/200x200?text=Women",
      path: "women",
    },
    {
      name: "Kids",
      image: "https://via.placeholder.com/200x200?text=Kids",
      path: "kids",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Banner */}
      <div className="w-full rounded-lg overflow-hidden">
        <img
          src="https://via.placeholder.com/1200x400?text=Fashion+Sale+Banner"
          alt="Banner"
          className="w-full object-cover"
        />
      </div>

      {/* Categories */}
      <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
      <div className="grid grid-cols-3 gap-6">
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

      {/* Trending Products (Sample) */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Trending Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white rounded shadow p-2 cursor-pointer hover:shadow-lg">
            <img
              src={`https://via.placeholder.com/200x200?text=Product+${i}`}
              alt={`Product ${i}`}
              className="w-full h-40 object-cover"
            />
            <p className="mt-2 font-semibold">Clothing {i}</p>
            <p className="text-pink-500 font-bold">₹{500 + i * 100}</p>
          </div>
        ))}
      </div>
    </div>
  );
};