import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";
import AdminModel from "../models/AdminModel.js";
import OwnerModel from "../models/OwnerModel.js";
import path from "path";
const __dirname = path.resolve();
import ejs from "ejs";
import { sendEmail } from "../helpers/sendMail.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const createActivationToken = (user) => {
  const token = JWT.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: process.env.ACTIVATION_EXPIRE,
  });
  return token;
};

const sendVerficationEmail = async (user) => {
  const activationToken = createActivationToken(user);
  const activationUrl = `${process.env.SERVER_URL}/api/v1/auth/verify-email?token=${activationToken}`;
  const data = { user: { name: user.name }, activationUrl };

  const html = await ejs.renderFile(
    path.join(__dirname, "/emails/activation-email.ejs"),
    data
  );
  await sendEmail({
    to: user.email,
    subject: "Activate Your Acount",
    html,
  });
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const decodeData = JWT.verify(token, process.env.ACTIVATION_SECRET);
    console.log(decodeData);
    const hashedPassword = await bcrypt.hash(decodeData.password, 10);
    decodeData.password = hashedPassword;
    await userModel.create(decodeData);

    res.redirect(`${process.env.CLIENT_URL}/#/login`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//user register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register Please Login",
      });
    }

    await sendVerficationEmail(req.body);

    res.status(201).json({
      success: true,
      message: "Please check your email to activate your account",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//admin register
export const adminRegisterController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      answer,
      role = 1,
    } = req.body;
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    //check user
    const existingAdmin = await AdminModel.findOne({ email });
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingAdmin || existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register Please Login",
      });
    }

    //Register User
    const hashedPassword = await hashPassword(password);
    // Create and save user object
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
      role,
    });
    await user.save();
    // Create and save admin object
    const admin = new AdminModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "Admin Register Successfully",
      user,
      admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// owner register
export const ownerRegisterController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.send("All fields is required");
    }
    //check existing
    const existingOwner = await OwnerModel.findOne({ email });
    const existingUser = await userModel.findOne({ email });
    if (existingOwner || existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already register please login!",
      });
    }
    //hash
    const hashedPassword = await hashPassword(password);
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
      role: 2,
    });
    await user.save();

    const owner = new OwnerModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "Owner Register Successful",
      user,
      owner,
    });
  } catch (error) {
    console.log("something went wrong while owner registering");
  }
};

// get user details
export const userDetailsController = async (req, res) => {
  try {
    const user = await userModel.find({ role: "0" });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//delete user
export const userDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete user:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in delete user",
    });
  }
};
// get Admins
export const ownersController = async (req, res) => {
  try {
    const owner = await userModel.find({ role: "1" });
    res.status(200).json(owner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//get owners
export const getAllOwnersController = async (req, res) => {
  try {
    const allOwners = await OwnerModel.find({ role: "2" });
    res.status(200).json(allOwners);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//delete Owners
export const ownerDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete owner:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in delete owner",
    });
  }
};
//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: true,
        message: "Invalid Email and Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not Registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        userID: user._id,
        _id: user._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in Login",
      error,
    });
  }
};

// Change password
export const updatePasswordController = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    if (!password) {
      res.status(400).send({ message: "Password is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    // Check
    const user = await userModel.findById(req.user._id);
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }

    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

//test Controller
export const testController = (req, res) => {
  try {
    res.send("Protected Route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
//test owner Controller
export const testOwnerController = (req, res) => {
  try {
    res.send("Protected Owner Route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
// user update controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

// admin update controller
export const updateAdminProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const { id } = req.params;
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    // Update admin profile
    const adminUpdate = await AdminModel.findByIdAndUpdate(
      id,
      {
        name,
        password,
        phone,
        address,
      },
      { new: true }
    );
    // Update admin profile
    const userUpdate = await userModel.findByIdAndUpdate(
      id,
      {
        name,
        password,
        phone,
        address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      adminUpdate,
      userUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in orders",
      error,
    });
  }
};

// Passowrd forgot------------------------>

// Send reset password email
export const sendResetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not registered" });

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  const resetUrl = `${process.env.CLIENT_URL}/#/reset-password/${resetToken}`;
  const html = await ejs.renderFile(
    path.join(__dirname, "/emails/resetPassword.ejs"),
    { user, resetUrl }
  );

  await sendEmail({ to: user.email, subject: "Password Reset", html });
  await user.save();

  res.status(200).json({ message: "Please check your mail" });
};

// Reset password using token
export const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword || password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Passwords do not match or are missing" });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  const html = await ejs.renderFile(
    path.join(__dirname, "/emails/passwordSuccessfull.ejs"),
    { user }
  );
  await sendEmail({ to: user.email, subject: "Password Reset Success", html });

  await user.save();

  res.status(200).json({ message: "Password has been updated successfully" });
};
