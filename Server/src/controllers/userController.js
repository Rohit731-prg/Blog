import { sendMail } from "../utils/nodemailer.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";
import { compairPassword, ganarateHashPassword } from "../utils/passwordHash.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const isExist = await User.findOne({ email });
    if (isExist) return res.status(400).json({ message: "User already exists" });

    const url = req.imageUrl;
    const image_ID = req.imageId;

    const OTP = Math.floor(1000 + Math.random() * 9000)
    const hashedPass = await ganarateHashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPass,
      image: url,
      otp: OTP,
      image_ID,
    });
    
    await sendMail(email, "OTP Verification", `Your OTP is ${OPT}`);
    await newUser.save();
    res.status(201).json({
      message: "OTP sent successfully to your email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyAuth = async (req, res) => {
  const { email, otp } = req.body;
  if (!otp || !email) return res.status(400).json({ message: "All fields are required" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (otp !== user.otp) return res.status(404).json({ message: "Invalid OTP" });
    user.auth = true;
    await user.save();

    res.statue(200).json({ message: "User authenticate now...!"})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "All fields are required" });
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    const compair = await compairPassword(password, user?.password);
    if (!compair) return res.status(404).json({ message: "Invalid Password" });
    const post = await Post.find({ user: user._id }).countDocuments();
    const token = generateToken(user?._id, user?.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    const userDetails = {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      image: user?.image,
    }
    res.status(200).json({
      message: "User logged in successfully",
      user: userDetails,
      post: post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logOut = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    const user = req.user;
    console.log("user", user);
    await cloudinary.uploader.destroy(user.image_ID);
    const url = req.imageUrl;
    const image_ID = req.imageId;
    user.image = url;
    user.image_ID = image_ID;
    await user.save();
    res.status(200).json({ message: "Profile image updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginWithVerify = async (req, res) => {
  try {
    const user = req.user;
    const post = await Post.find({ user: user._id }).countDocuments();

    res.status(200).json({
      message: "User logged in successfully",
      user: user,
      post: post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
