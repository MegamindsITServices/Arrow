import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCartProducts = async (userID) => {
    try {
      // Fetch cart from backend
      const response = await axios.post(
        "https://api.arrowpublications.in/api/v1/product/cart/get-item",
        { userID }
      );
      const backendCart = response.data.cart;

      // Get existing cart from localStorage
      const localStorageCart = JSON.parse(localStorage.getItem("cart")) || [];

      // Merge backend cart with localStorage cart, avoiding duplicates
      const mergedCart = [...localStorageCart];

      backendCart.forEach((backendItem) => {
        const existsInLocalStorage = localStorageCart.some(
          (localItem) => localItem._id === backendItem._id
        );
        if (!existsInLocalStorage) {
          mergedCart.push(backendItem);
        }
      });

      // Update state and localStorage with the merged cart
      setCart(mergedCart);
      localStorage.setItem("cart", JSON.stringify(mergedCart));
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("auth");
    const userData = JSON.parse(data);
    const userID = userData?.user?.userID || userData?.user?._id;
    if (userID) {
      fetchCartProducts(userID);
    }
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
