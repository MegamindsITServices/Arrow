import crypto from "crypto";
import axios from "axios";
import express from "express";
import sha256 from "sha256";
import ejs from "ejs";
import path from "path";
import { sendEmail } from "../helpers/sendMail.js";
import userModel from "../models/userModel.js";
import orderModal from "../models/orderModel.js";
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
  const merchantTransactionId = generateTransactionId();
  let data = {
    merchantId: merchant_id,
    merchantTransactionId: merchantTransactionId,
    merchantUserId: "UYGFKJGF",
    amount: amount * 100,
    redirectUrl: `https://api.arrowpublications.in/api/v1/payment/status?id=${merchantTransactionId}`,
    // callbackUrl: `https://api.arrowpublications.in/api/v1/payment/status?id=${merchantTransactionId}`,
    // redirectUrl: `http://localhost:8080/api/v1/payment/status?id=${merchantTransactionId}`,
    // callbackUrl: `http://localhost:8080/api/v1/payment/status?id=${merchantTransactionId}`,
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
      console.log("response->", response.data);
      res
        .status(200)
        .send(response.data.data.instrumentResponse.redirectInfo.url);
    })
    .catch(function (error) {
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
        console.log("response->", response.data);
        if (response.data && response.data.code === "PAYMENT_SUCCESS") {
          // redirect to FE payment success status page
          const transactionId = response.data.data.transactionId;
          userOrderData.transactionId = transactionId;
          await createOrder();
          res.redirect("https://arrowpublications.in/#/dashboard/user/orders");
        } else {
           res.send("Payment Failed!!");
        }
      })
      .catch(function (error) {
        res.send(error);
      });
  } else {
    res.send("Failed to make payment");
  }
});

const createOrder = async () => {
  try {
    const newOrder = await orderModal.create(userOrderData);
    const user = await userModel.findById(newOrder.buyer);
    const data = {
      name: user.name,
      orderId: newOrder._id,
      products: newOrder.products_name,
      trackingLink: "https://arrowpublications.in/#/dashboard/user/orders",
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
