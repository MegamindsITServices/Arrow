import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const res = await axios.get(
        "https://api.arrowpublications.in/api/v1/order/get-user-order/" +
          auth?.user._id,
        {
          userID: auth?.user._id,
        }
      );

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };
  const cancelOrder = async (id) => {
    try {
      const res = await await axios.put(
        `https://api.arrowpublications.in/api/v1/order/cancel/${id}`
      );
      const updatedOrders = orders.map((order) =>
        order._id === id ? res.data.updatedOrders : order
      );
      setOrders(updatedOrders);
      alert(
        "Your order has been cancelled. Refund will be processed within 3-4 business days."
      );
      navigate("/dashboard/user/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            <div className="border shadow table-wrapper-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Order_id</th>
                    <th scope="col">Product_name</th>
                    <th scope="col">Number of Quantity</th>
                    <th scope="col">Number of Products</th>
                    <th scope="col">Invoice</th>
                    <th scope="col">Date of Order Placed</th>
                    <th scope="col">Shipping Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map(
                    (o, index) =>
                      o && (
                        <tr key={o._id}>
                          <td>{index + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer}</td>
                          <td>{o?.products_name}</td>
                          <td>
                            {o?.quantities.map((item, idx) => (
                              <div key={idx}>{item.quantity}</div>
                            ))}
                          </td>
                          <td>{o?.products?.length}</td>
                          <td>
                            <a
                              href={`https://api.arrowpublications.in${o?.invoiceUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary"
                            >
                              Download Invoice
                            </a>
                          </td>
                          <td>{formatDateTime(o?.createdAt)}</td>
                          <td>{o?.address}</td>

                          <td>
                            {o?.status !== "Cancelled" && (
                              <button
                                className="order-cancel-Butn"
                                onClick={() => cancelOrder(o?._id)}
                              >
                                Cancel<span className="ms-1">Order</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
