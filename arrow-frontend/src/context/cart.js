import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCartProducts = async (userID) => {
    try {
      const response = await axios.post("/api/v1/product/cart/get-item", {
        userID: userID,
      });
      console.log(response.data.cart);
      setCart(response.data.cart);
      localStorage.setItem("cart", JSON.stringify(response.data.cart));
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("auth");
    const userData = JSON.parse(data);
    const userID = userData?.user?.userID;
    console.log(userID);
    fetchCartProducts(userID);
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
