import { sendEmail } from "../helpers/sendMail.js";
import orderModal from "../models/orderModel.js";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";
import ejs from "ejs";
import path from "path";
dotenv.config();

const __dirname = path.resolve();

//get all orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModal
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: orders.length,
      message: "All orders",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error to get orders",
    });
  }
};

// get single user order
export const getSingleOrderController = async (req, res) => {
  try {
    const { userID } = req.params;
    console.log(userID);
    const orders = await orderModal.find({ buyer: userID });
    res.status(200).send({
      success: true,
      message: "Single orders fetched",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error to get single orders",
    });
  }
};

// Controller function to create a new order
export const createOrder = async (req, res) => {
  try {
    const newOrder = await orderModal.create(req.body);
    console.log(newOrder);

    if (!newOrder) {
      return res.status(404).json({
        success: false,
        message: "Error to create order",
      });
    }
    const user = await userModel.findById(newOrder.buyer);
    const data = {
      name: user.name,
      orderId: newOrder._id,
      products: newOrder.products_name,
      trackingLink: `${process.env.CLIENT_URL}/#/dashboard/user/orders`,
    };
    const html = await ejs.renderFile(
      path.join(__dirname, "/emails/order.ejs"),
      data
    );

    await sendEmail({
      to: user.email,
      subject: "Order Placed Successfully",
      html,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to retrieve all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModal.find().populate("buyer");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to retrieve an order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await orderModal.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update an existing order
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await orderModal
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("buyer");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    const user = await userModel.findById(updatedOrder.buyer);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = {
      name: user.name,
      status: updatedOrder.status,
      orderId: updatedOrder._id,
      products: updatedOrder.products_name,
      trackingLink: `${process.env.CLIENT_URL}/#/dashboard/user/orders`,
    };
    const html = await ejs.renderFile(
      path.join(__dirname, "/emails/order_status.ejs"),
      data
    );

    await sendEmail({
      to: user.email,
      subject: "Order " + updatedOrder.status,
      html,
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to delete an existing order
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await orderModal.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const cancelOrderController = async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    // Find the order by ID
    const order = await orderModal.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Find the index of the product to cancel
    const productIndex = order.products.findIndex(
      (product) => product._id.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in order" });
    }
    // Remove the product from the order
    order.products.splice(productIndex, 1);

    // Update the order in the database
    const updatedOrder = await order.save();

    res
      .status(200)
      .json({ message: "Product cancelled successfully", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get cancel order details
export const getCancelOrdersController = async (req, res) => {
  try {
    const getAllCancelOrders = await orderModal.find({ status: "Cancelled" });
    res.status(200).json({ success: true, orders: getAllCancelOrders });
  } catch (error) {
    console.error("Error fetching canceled orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
