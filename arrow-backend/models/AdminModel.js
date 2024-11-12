import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      shippingAddress: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
        required: false,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 1,
    },
    cart: [{}],
  },
  { timestamps: true }
);

export default mongoose.model("admin", adminSchema);
