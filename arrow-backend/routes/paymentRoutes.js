import crypto from "crypto";
import axios from "axios";
import express from "express";
import sha256 from "sha256";
import ejs from "ejs";
import path from "path";
import { sendEmail } from "../helpers/sendMail.js";
import userModel from "../models/userModel.js";
import orderModal from "../models/orderModel.js";
import { generateInvoice } from "../helpers/generatePdf.js";
const __dirname = path.resolve();
const router = express.Router();

const salt_key = process.env.API_KEY;
const merchant_id = process.env.MERCHANT_ID;
// const salt_key = "14fa5465-f8a7-443f-8477-f986b8fcfde9";
// const merchant_id = "PGTESTPAYUAT77";
let userOrderData;
const generateTransactionId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 100000);
  const merchantPrefix = "MT";
  const transactionID = `${merchantPrefix}${timestamp}${randomNum}`;
  return transactionID;
};
const PHONE_PE_HOST_URL = "https://api.phonepe.com/apis/hermes";
// const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";

router.post("/payment", async (req, res) => {
  const { name, number, amount, orderData } = req.body;
  userOrderData = orderData;
  userOrderData.payment = amount;
  const merchantTransactionId = generateTransactionId();
  let data = {
    merchantId: merchant_id,
    merchantTransactionId: merchantTransactionId,
    merchantUserId: "UYGFKJGF_ID",
    amount: amount * 100,
    redirectUrl: `${process.env.SERVER_URL}/api/v1/payment/status?id=${merchantTransactionId}`,
    // redirectUrl: `http://localhost:8080/api/v1/payment/status?id=${merchantTransactionId}`,
    redirectMode: "POST",
    mobileNumber: number,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  let bufferObj = Buffer.from(JSON.stringify(data), "utf8");
  let base64EncodedPayload = bufferObj.toString("base64");

  // X-VERIFY => SHA256(base64EncodedPayload + "/pg/v1/pay" + SALT_KEY) + ### + SALT_INDEX
  let string = base64EncodedPayload + "/pg/v1/pay" + salt_key;
  let sha256_val = sha256(string);
  let xVerifyChecksum = sha256_val + "###" + 1;

  axios
    .post(
      `${PHONE_PE_HOST_URL}/pg/v1/pay`,
      { request: base64EncodedPayload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          accept: "application/json",
        },
      }
    )
    .then(function (response) {
      // console.log(
      //   "response->",
      //   response.data.data.instrumentResponse.redirectInfo.url
      // );
      res
        .status(200)
        .send(response.data.data.instrumentResponse.redirectInfo.url);
    })
    .catch(function (error) {
      console.log(error);

      res.send(error);
    });
});

router.post("/payment/status", async (req, res) => {
  const merchantTransactionId = req.query.id;

  if (merchantTransactionId) {
    let statusUrl =
      `${PHONE_PE_HOST_URL}/pg/v1/status/${merchant_id}/` +
      merchantTransactionId;

    let string =
      `/pg/v1/status/${merchant_id}/` + merchantTransactionId + salt_key;
    let sha256_val = sha256(string);
    let xVerifyChecksum = sha256_val + "###" + 1;

    axios
      .get(statusUrl, {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          "X-MERCHANT-ID": merchant_id,
          accept: "application/json",
        },
      })
      .then(async function (response) {
        // console.log("response->", response.data);
        if (response.data && response.data.code === "PAYMENT_SUCCESS") {
          // redirect to FE payment success status page
          const transactionId = response.data.data.transactionId;
          userOrderData.transactionId = transactionId;
          await createOrder();
          res.redirect(`${process.env.CLIENT_URL}/#/dashboard/user/orders`);
          // res.redirect("http://localhost:3000/#/dashboard/user/orders");
        } else {
          res.send(response.data);
        }
      })
      .catch(function (error) {
        res.send("Payment Failed!!");
      });
  } else {
    res.send("Failed to make payment");
  }
});

const createOrder = async () => {
  try {
    const newOrder = await orderModal.create(userOrderData);
    const user = await userModel.findById(newOrder.buyer);
    // Prepare file path
    const invoiceFileName = `invoice-${newOrder._id}.pdf`;
    const invoiceFilePath = path.join(__dirname, "invoices", invoiceFileName);
    const order = await orderModal
      .findById(newOrder._id)
      .populate("buyer products");
    // Generate the invoice and save it to the file system
    generateInvoice(order, user, invoiceFilePath);
    newOrder.invoiceUrl = `/invoices/${invoiceFileName}`;
    await newOrder.save();

    const data = {
      name: user.name,
      orderId: newOrder._id,
      products: newOrder.products_name,
      payment: newOrder.payment,
      customerAddress: newOrder.address,
      trackingLink: `${process.env.CLIENT_URL}/#/dashboard/user/orders`,
      // trackingLink: "http://localhost:3000/#/dashboard/user/orders",
    };

    // Prepare vendor email data
    const vendorEmailData = {
      vendorName: "Arrow Publications",
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone || "N/A",
      customerAddress: newOrder.address,
      products: newOrder.products_name.map((productName, index) => ({
        name: productName,
        quantity: newOrder.quantities[index].quantity,
      })),
      price: newOrder.payment,
    };

    // Render HTML for user email
    const html = await ejs.renderFile(
      path.join(__dirname, "/emails/order.ejs"),
      data
    );

    // Render HTML for vendor email
    const vendorHtml = await ejs.renderFile(
      path.join(__dirname, "/emails/orderReceived.ejs"),
      vendorEmailData
    );

    // Send user email
    sendEmail({
      to: user.email,
      subject: "Order Placed Successfully",
      html,
      attachments: [
        {
          filename: invoiceFileName,
          path: invoiceFilePath,
        },
      ],
    });

    // Send vendor email
    sendEmail({
      to: process.env.SMTP_MAIL,
      subject: `New Order Received - Order ID: ${newOrder._id}`,
      html: vendorHtml,
      attachments: [
        {
          filename: invoiceFileName,
          path: invoiceFilePath,
        },
      ],
    });

    await clearCart(user._id);
  } catch (error) {
    console.error(error);
  }
};

const clearCart = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    user.cart = [];
    await user.save();
    console.log("Cart cleared successfully");
  } catch (error) {
    console.error(error);
  }
};

export default router;
