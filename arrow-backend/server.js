import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import subjectRoute from "./routes/subjectRoute.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoute.js";
import dealerRoutes from "./routes/dealerRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import bannerRoute from "./routes/bannerRoute.js";
import HomeBookRoute from "./routes/homeBookRoute.js";
import dealerStateRoute from "./routes/dealerStateRoute.js";
import newReleaseRoutes from "./routes/newReleaseRoutes.js";
import mongoose from "mongoose";
import paymentsRoutes from "./routes/paymentRoutes.js";
import path from "path";
import { sendContactEmail } from "./controllers/extraController.js";

//Configure env
dotenv.config();
const __dirname = path.resolve();
//db config
// connectDB();
//rest object
const app = express();

const allowedOrigins = [
  "https://arrowpublications.in",
  "https://arrowpublications.in",
  "https://arrowpublications.in/",
  "https://api.arrowpublications.in",
  "http://localhost:3000",
  undefined,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS from origin : ${origin}`));
    }
  },
  credentials: true,
};
console.log("i am in server.js file");
//middlewares
app.use(cors());
// app.options("*", cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use("/invoices", express.static(path.join(__dirname, "invoices")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/subject", subjectRoute);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/dealer", dealerRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/posts", blogRoutes);
app.use("/api/v1/banner", bannerRoute);
app.use("/api/v1/bookphoto", HomeBookRoute);
app.use("/api/v1/new-release", newReleaseRoutes);

app.use("/api/v1/dealerstate", dealerStateRoute);
// Payment route
app.use("/api/v1", paymentsRoutes);

// Contact form

app.post("/api/v1/contact-form", sendContactEmail);

//rest api

const visitorSchema = new mongoose.Schema({
  counter: {
    type: Number,
    default: 0,
  },
});

// Creating Visitor Table in visitCounterDB
const Visitor = mongoose.model("Visitor", visitorSchema);

const siteViewsUp = async () => {
  const visitor = await Visitor.findOne();
  if (visitor) {
    visitor.counter++;
    await visitor.save();
  } else {
    const newVisitor = new Visitor({
      counter: 1,
    });
    await newVisitor.save();
  }
};

app.get("/api/v1/visitor-count", async (req, res) => {
  await siteViewsUp();
  return res.json({ success: true });
});

app.get("/api/v1/visitors", async (req, res) => {
  const visitor = await Visitor.findOne();
  res.json({
    visitors: visitor.counter,
  });
});

app.get("/s", (req, res) => {
  res.send("Welcome to Arrow Publication pvt. ltd.");
});

const PORT = process.env.PORT || 8080;
// app.use(express.static(path.join(__dirname, "../arrow-frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../arrow-frontend/build/index.html"));
// });

connectDB().then(() => {
  //run listen
  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
});
