import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import "../styles/productdetails.css";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import loadingImg from "../images/loading.gif";
import { getConfig } from "../utils/request.js";
import ReactImageMagnify from "react-image-magnify";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [showCarousel, setShowCarousel] = useState(false);
  const [quantities, setQuantities] = useState({});

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    if (params?.uid) getProduct();
  }, [params?.uid]);
  const getProduct = async () => {
    try {
      setIsLoading(true);
      await getConfig();
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.uid}`
      );
      setProduct(data?.product);
      console.log("Total product get: ", data?.product);

      await getImage(data?.product?._id);
      // console.log("images:", data?.product?._id);

      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getImage = async (id) => {
    console.log("images ids:", id);
    const image = [];

    try {
      const { data: image1 } = await axios.get(
        `/api/v1/product/product-photo/${id}`
      );
      if (image1) {
        image.push(`/api/v1/product/product-photo/${id}`);
      }
      try {
        const { data: image2 } = await axios.get(
          `/api/v1/product/product-frontphoto/${id}`
        );
        if (image2 && typeof image2 === "string") {
          image.push(`/api/v1/product/product-frontphoto/${id}`);
        }
      } catch (error) {
        console.log(error);
      }
      try {
        const { data: image3 } = await axios.get(
          `/api/v1/product/product-backphoto/${id}`
        );
        if (image3 && typeof image3 === "string") {
          image.push(`/api/v1/product/product-backphoto/${id}`);
        }
      } catch (error) {
        console.log(error);
      }
      setImages(image);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // const addItemCart = async (product) => {
  //   try {
  //     // Make POST request to add item to cart
  //     const { data } = await axios.post("/api/v1/product/cart/add-item", {
  //       userID: auth?.user.userID,
  //       productID: product._id,
  //       role: auth?.user?.role,
  //     });

  //     // Update cart state and localStorage with new item
  //     const updatedCart = [...cart, data.cart[0]];
  //     setCart(updatedCart);
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));

  //     // Show success message
  //     swal("Success", "Your item has been added to the cart!", "success");
  //   } catch (error) {
  //     swal("Error", "Failed to add item to cart. Please Login.", "error");
  //   }
  // };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    const savedQuantities = JSON.parse(localStorage.getItem("cartQuantities"));
    if (savedCart) {
      setCart(savedCart);
    }
    if (savedQuantities) {
      setQuantities(savedQuantities);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cartQuantities", JSON.stringify(quantities));
  }, [quantities]);

  const addItemCart = async (product) => {
    try {
      // Make POST request to add item to cart
      const { data } = await axios.post("/api/v1/product/cart/add-item", {
        userID: auth?.user.userID,
        productID: product._id,
        role: auth?.user?.role,
      });

      // Retrieve cart and quantities from localStorage
      const cartFromLocalStorage =
        JSON.parse(localStorage.getItem("cart")) || [];
      const quantitiesFromLocalStorage =
        JSON.parse(localStorage.getItem("cartQuantities")) || {};

      const existingProductIndex = cartFromLocalStorage.findIndex(
        (item) => item._id === product._id
      );

      let updatedCart;
      if (existingProductIndex !== -1) {
        // If the product exists, update the quantity in localStorage
        quantitiesFromLocalStorage[product._id] =
          (quantitiesFromLocalStorage[product._id] || 0) + 1;
        updatedCart = [
          ...cartFromLocalStorage.slice(0, existingProductIndex),
          {
            ...cartFromLocalStorage[existingProductIndex],
            quantity: quantitiesFromLocalStorage[product._id],
          },
          ...cartFromLocalStorage.slice(existingProductIndex + 1),
        ];
      } else {
        // If the product doesn't exist, add it to the cart with quantity 1
        quantitiesFromLocalStorage[product._id] = 1;
        updatedCart = [...cartFromLocalStorage, { ...product, quantity: 1 }];
      }

      // Update the cart and quantities in localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem(
        "cartQuantities",
        JSON.stringify(quantitiesFromLocalStorage)
      );

      // Update the cart and quantities state
      setCart(updatedCart);
      setQuantities(quantitiesFromLocalStorage);

      // Show success message
      swal("Success", "Your item has been added to the cart!", "success");
    } catch (error) {
      swal("Error", "Failed to add item to cart. Please Login.", "error");
    }
  };

  return (
    <Layout>
      <div className="font">
        <div className="row container align-items-center justify-content-end gap-5 product-details mt-3">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            {isLoading && (
              <img
                src={loadingImg}
                alt="Image loading"
                className="product-details-img"
              />
            )}

            {images.length > 1 ? (
              <div className="carousel-wrapper">
                <Carousel
                  activeIndex={index}
                  indicators={false}
                  controls={false}
                  interval={3000}
                  onSelect={handleSelect}
                  className="carousel-product-details"
                >
                  {images.map((i, idx) => (
                    <Carousel.Item key={idx}>
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: "Product image",
                            isFluidWidth: true,
                            src: i,
                          },
                          largeImage: {
                            src: i,
                            width: 1200,
                            height: 1800,
                          },
                          enlargedImageContainerDimensions: {
                            width: "100%",
                            height: "100%",
                          },
                          enlargedImagePosition: "over", // Ensures the zoom appears over the image
                        }}
                        className="product-details-img"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            ) : (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Product image",
                    isFluidWidth: true,
                    src: images[0],
                  },
                  largeImage: {
                    src: images[0],
                    width: 1000,
                    height: 1500,
                  },
                  enlargedImageContainerDimensions: {
                    width: "100%",
                    height: "100%",
                  },
                  enlargedImagePosition: "over", // Ensures the zoom appears over the image
                }}
                className="product-details-img"
              />
            )}
          </div>
          <div className="col-md-6 product-details-info">
            <h2 className="text-center p-name-details">
              <span className="product-name"> {product?.name}</span>
            </h2>
            <hr />
            <p className="price">
              <strong>Name : </strong> <h4 className="ms-1">{product.name}</h4>
            </p>
            <p className="desc">
              <strong>Description : </strong>
              {product.description}
            </p>
            <p className="desc">
              <strong>Author Name : </strong>
              {product.author}
            </p>
            <p className="desc">
              <strong>Pages : </strong>
              {product.pages} Pages
            </p>
            <p className="desc">
              <strong>Class : </strong> {product?.category?.name}
            </p>
            <p className="desc">
              <strong>Subject : </strong> {product?.subject?.name}
            </p>
            <p className="desc">
              <strong>ISBN : </strong> {product.isbn}
            </p>
            <p className="price">
              <strong>Price : </strong>
              <h3 className="ms-1">{product?.price}</h3>
            </p>

            <button
              className="product-details-butn mb-2"
              onClick={() => {
                addItemCart(product);
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <hr />
        <div className="row container">
          <h2 className="similar">Similar Product</h2>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products Available</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div
                className="card-similar"
                style={{ width: "19rem" }}
                key={p._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top similar-card-img"
                  onClick={() => navigate(`/product/${p.uid}`)}
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="similar-name">Name : {product.name}</h5>
                    <p className="similar-desc">
                      {product.description.substring(0, 50)}...
                    </p>
                    <p className="similar-desc">
                      <strong>Class : </strong> {product.category.name}
                    </p>
                    <h5 className="">
                      Price:{" "}
                      {product.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>

                  <div className="card-name-price">
                    <button
                      className="Butn-add-cart-similar mb-4"
                      onClick={() => {
                        addItemCart(product);
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="subscribe mt">
        <h5 className="about-arrow">
          Want to know more about Arrow Publications?
          <div className="form-floating ms-2">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <button className="ms-3 button">Submit</button>
        </h5>
      </div> */}
      <hr className="ash-line" />
    </Layout>
  );
};

export default ProductDetails;