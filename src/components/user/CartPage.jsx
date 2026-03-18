import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartPage = () => {

  const { cartItems } = useContext(CartContext);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {cartItems?.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="border p-3 mb-3 rounded shadow">
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-pink-600">₹{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;