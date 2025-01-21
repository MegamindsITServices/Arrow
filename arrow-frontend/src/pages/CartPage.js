import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import "../styles/button.css";
import axios from "axios";
import swal from "sweetalert2";
import "../styles/cart.css";
import useRazorpay from "react-razorpay";
import toast from "react-hot-toast";

const CartPage = () => {
  const [setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [Razorpay] = useRazorpay();
  const [quantities, setQuantities] = useState({});
  // const [shippingCharges, setShippingCharges] = useState(0);
  // const [discount, setDiscount] = useState(0);
  const cart = JSON.parse(localStorage.getItem("cart"));

  // Get the latest cart data
  useEffect(() => {
    const fetchProductData = async (productId) => {
      try {
        // Replace this URL with your actual API endpoint
        const { data } = await axios.get(
          `https://api.arrowpublications.in/api/v1/product/get-product/${productId}`
        );
        return data?.product;
      } catch (error) {
        console.error("Error fetching product data:", error);
        return null;
      }
    };

    const updateCartData = async () => {
      const savedQuantities =
        JSON.parse(localStorage.getItem("cartQuantities")) || {};

      if (cart && cart.length > 0) {
        const updatedCart = await Promise.all(
          cart.map(async (product) => {
            const latestProductData = await fetchProductData(product.uid);
            // If fetch fails, keep the current product data
            const updatedProduct = latestProductData || product;

            // Initialize quantity if not set in savedQuantities
            if (!savedQuantities[updatedProduct._id]) {
              savedQuantities[updatedProduct._id] = 1;
            }

            return updatedProduct;
          })
        );

        // Update state and localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        localStorage.setItem("cartQuantities", JSON.stringify(savedQuantities));
        // setCart(updatedCart);
        setQuantities(savedQuantities);
      }
    };

    updateCartData();
  }, [cart.length]);

  // Function to handle increasing quantity

  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[productId] = (newQuantities[productId] || 1) + 1;
      return newQuantities;
    });
  };

  // Function to handle decreasing quantity
  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[productId] = Math.max(
        1,
        (newQuantities[productId] || 1) - 1
      );
      return newQuantities;
    });
  };

  // Function to calculate total price based on quantities

  const getShippingCharges = () => {
    let shippingCharges = 0;

    cart?.forEach((item) => {
      shippingCharges += item.shippingPrice * (quantities[item._id] || 1) || 0;
    });

    return shippingCharges.toFixed(2);
  };

  const getTotalQuantities = () => {
    let itemsCount = 0;
    Object.values(quantities).forEach((qt) => {
      itemsCount += qt;
    });
    return itemsCount;
  };

  const getDisCount = () => {
    let discount = 0;
    let total = 0;

    cart?.forEach((item) => {
      total += item.price * (quantities[item._id] || 1);
    });

    let itemsCount = getTotalQuantities();
    // Discount calculation
    if (itemsCount >= 5) {
      discount = total * 0.1;
    }
    return discount;
  };

  const totalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * (quantities[item._id] || 1);
    });
    // Discount calculation
    if (cart && cart?.length >= 5) {
      total = total - total * 0.1;
    }
    return total.toFixed(2);
  };

  useEffect(() => {
    localStorage.setItem("cartQuantities", JSON.stringify(quantities));
  }, [quantities]);

  // remove item
  const removeCartItem = async (pid) => {
    try {
      if (auth?.token) {
        // Logged-in user: Remove item from backend and localStorage
        const { data } = await axios.post(
          "https://api.arrowpublications.in/api/v1/product/cart/remove-item",
          {
            userID: auth?.user._id,
            productID: pid,
          }
        );
        // setCart(data.cart);
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCartItems = cartItems.filter((item) => item._id !== pid);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));

        // Update the quantities

        const cartQuantities =
          JSON.parse(localStorage.getItem("cartQuantities")) || {};
        delete cartQuantities[pid]; // Remove the product ID from cartQuantities
        localStorage.setItem("cartQuantities", JSON.stringify(cartQuantities));

        // Reload
        window.location.reload();
      } else {
        // Not logged in: Remove item only from localStorage
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCartItems = cartItems.filter((item) => item._id !== pid);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));

        // Update the quanities
        const cartQuantities =
          JSON.parse(localStorage.getItem("cartQuantities")) || {};
        delete cartQuantities[pid]; // Remove the product ID from cartQuantities
        localStorage.setItem("cartQuantities", JSON.stringify(cartQuantities));
        window.location.reload();
      }
    } catch (error) {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCartItems = cartItems.filter((item) => item._id !== pid);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));

      // Update the quantities
      const cartQuantities =
        JSON.parse(localStorage.getItem("cartQuantities")) || {};
      delete cartQuantities[pid]; // Remove the product ID from cartQuantities
      localStorage.setItem("cartQuantities", JSON.stringify(cartQuantities));
      window.location.reload();
      console.log(error);
    }
  };

  const placeOrder = async (transactionId) => {
    let totalPrice = 0;
    let productIDs = [];
    let products_name = [];
    let quantityData = {};
    cart?.forEach((item) => {
      totalPrice += item.price * quantities[item._id];
      productIDs.push(item._id);
      products_name.push(item.name);
      quantityData[item._id] = quantities[item._id];
    });

    const shippingAddress = `${auth?.user?.address.landmark}, ${auth?.user?.address.city}, ${auth?.user?.address.district}, ${auth?.user?.address.state}, ${auth?.user?.address.pincode}`;

    const orderData = {
      products: productIDs,
      products_name: products_name,
      quantities: Object.keys(quantityData).map((productId) => ({
        product: productId,
        quantity: quantityData[productId],
      })),
      transactionId: transactionId,
      payment: totalPrice,
      name: auth?.user?.name,
      address: shippingAddress,
      buyer: auth.user._id,
      status: "Unprocessed",
    };

    try {
      const response = await axios.post(
        "https://api.arrowpublications.in/api/v1/order/create-order",
        orderData
      );
      console.log("Order saved successfully:", response.data);

      console.log("Order saved successfully:", response.data);

      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      swal("Congrats!", "Payment Success : Order Placed!", "success");
    } catch (error) {
      console.error("Error saving order:", error);
      // Handle error
    }
  };

  const getOrderData = () => {
    let totalOrderPrice = 0;
    let productIDs = [];
    let products_name = [];
    let quantityData = {};
    cart?.forEach((item) => {
      // totalOrderPrice += item.price * quantities[item._id];
      productIDs.push(item._id);
      products_name.push(item.name);
      quantityData[item._id] = quantities[item._id];
    });

    const shippingAddress = `${auth?.user?.address.landmark}, ${auth?.user?.address.city}, ${auth?.user?.address.district}, ${auth?.user?.address.state}, ${auth?.user?.address.pincode}`;

    const orderData = {
      products: productIDs,
      products_name: products_name,
      quantities: Object.keys(quantityData).map((productId) => ({
        product: productId,
        quantity: quantityData[productId],
      })),
      payment: (
        parseFloat(totalPrice()) +
        parseFloat(getShippingCharges()) -
        parseFloat(getDisCount())
      ).toFixed(2),
      name: auth?.user?.name,
      address: shippingAddress,
      shippingAmount: parseFloat(getShippingCharges()).toFixed(2),
      discount: parseFloat(getDisCount()).toFixed(2),
      buyer: auth.user._id,
      status: "Unprocessed",
    };
    return orderData;
  };

  // Show the login popup
  const showLoginPopup = () => {
    swal
      .fire({
        title: "Login Required",
        text: "Please log in to buy the product.",
        icon: "info",
        confirmButtonText: "Login",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
  };

  // handle payments
  const handlePayment = async () => {
    if (!auth || !auth.user) {
      showLoginPopup();
    }
    try {
      if (cart.length < 1) {
        return toast.error("Cart is empty");
      }
      let totalQuantity = 0;
      let productPrice = 0;

      cart.forEach((item) => {
        totalQuantity += quantities[item._id];
        productPrice += item.price * quantities[item._id];
      });
      const totalAmount = (
        parseFloat(totalPrice()) +
        parseFloat(getShippingCharges()) -
        parseFloat(getDisCount())
      ).toFixed(2);
      const response = await axios.post(
        "https://api.arrowpublications.in/api/v1/payment",
        {
          name: auth?.user?.name,
          number: auth?.user?.phone,
          amount: totalAmount,
          orderData: getOrderData(),
        }
      );
      // const response = await axios.post(
      //   "https://api.arrowpublications.in/api/v1/payment",
      //   {
      //     name: auth?.user?.name,
      //     number: auth?.user?.phone,
      //     amount: totalPrice(),
      //     orderData: getOrderData(),
      //   }
      // );
      if (response.data) {
        window.location.href = response.data;
        localStorage.removeItem("cart");
        setCart([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row ">
        <div className="col-md-12">
          <h3 className="text-center p-2 mb-1">
            {!auth?.user
              ? "Hello Guest"
              : `Hello, ${auth?.token && auth?.user?.name}!`}
            <p className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart. ${
                    auth?.token ? "" : "please login to checkout !"
                  }`
                : " Your cart is empty."}
            </p>
          </h3>
        </div>
      </div>
      <div className="col-lg-11 mx-auto">
        <div className="row justify-content-between cart-wrapper">
          <div className="col-lg-7">
            <div className="row">
              {cart?.map((p) => (
                <React.Fragment key={p._id}>
                  <div className="row p-3 card-cart flex-row">
                    <div className="col-sm-4">
                      <img
                        src={`https://api.arrowpublications.in/api/v1/product/product-photo/${p._id}`}
                        className="mb-1 mt-1"
                        alt={p.name}
                      />
                    </div>
                    <div className="col-sm-8 card-body">
                      <h6>
                        <b>Name : {p.name}</b>
                      </h6>
                      <div className="quantity-controls">
                        <h4>Price : ₹{p.price}</h4>
                        <div>
                          <button
                            className="quantity-btn"
                            onClick={() => decreaseQuantity(p._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#090101"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon-plus-minus icon-tabler icons-tabler-outline icon-tabler-minus"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 12l14 0" />
                            </svg>
                          </button>
                          <span className="quantity">
                            <strong>{quantities[p._id] || 1}</strong>
                          </span>
                          <button
                            className="quantity-btn"
                            onClick={() => increaseQuantity(p._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#090101"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon-plus-minus icon-tabler icons-tabler-outline icon-tabler-plus"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M12 5l0 14" />
                              <path d="M5 12l14 0" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="col-lg-4 cart-col text-center">
            {getTotalQuantities() < 5 && (
              <p className="text-black w-100 fs-6 text-center">
                <span className="text-danger fs-6 font-bold"> *</span> Add{" "}
                {5 - getTotalQuantities()} more products to get{" "}
                <strong className="text-success fs-6 font-bold">10%</strong>{" "}
                discount.
              </p>
            )}
            <div className="auth-content">
              <h2>Cart summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h5>Shipping Charges: ₹{getShippingCharges()}</h5>
              <h5 className="text-dark">Total Price: ₹{totalPrice()}</h5>

              {getDisCount() > 0 && (
                <h5 className="text-dark">
                  Total Discount:
                  <span className="">
                    ₹{parseFloat(getDisCount()).toFixed(2)}
                  </span>
                </h5>
              )}
              <h4 className="text-dark">
                Sub Total: ₹
                {(
                  parseFloat(totalPrice()) +
                  parseFloat(getShippingCharges()) -
                  parseFloat(getDisCount())
                ).toFixed(2)}
                {getDisCount() > 0 && (
                  <span className="line-through">
                    ₹
                    {(
                      parseFloat(totalPrice()) +
                      parseFloat(getShippingCharges())
                    ).toFixed(2)}
                  </span>
                )}
              </h4>
              {auth?.user?.address ? (
                <div className="mb-3">
                  <h4>Current Address:</h4>
                  <h5>{auth?.user?.address?.shippingAddress}</h5>
                  <div className="d-flex flex-column justify-content-start">
                    <div className="d-flex justify-content-center flex-wrap m-0">
                      <span>{auth?.user?.address?.landmark},</span>
                      {/* <span>{auth?.user?.address?.locality}, </span> */}
                    </div>
                    <div className="d-flex justify-content-center flex-wrap m-0">
                      <span>{auth?.user?.address?.city}, </span>
                      <span>{auth?.user?.address?.district}, </span>
                      <span>{auth?.user?.address?.state},</span>
                    </div>
                    <p>{auth?.user?.address?.pincode}</p>
                  </div>
                  <button
                    className="Butn"
                    onClick={() =>
                      navigate("/dashboard/user/profile?redirect=cart")
                    }
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              )}
              {cart && cart?.length > 0 && (
                <div className="mt-2">
                  <button
                    className="Butn"
                    onClick={() => handlePayment()}
                    type="button"
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
