import { sendMail } from "../utils/nodemailer.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import bcript from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const isExist = await User.findOne({ email });
    if (isExist)
      return res.status(400).json({ message: "User already exists" });

    const url = req.imageUrl;
    const image_ID = req.imageId;

    let OPT = Math.floor(Math.random() * 10000);
    if (OPT.length < 4) {
      console.log(OPT);
      OPT = `${OPT}0`;
    }
    const hashedPass = await bcript.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPass,
      image: url,
      otp: OPT,
      image_ID,
    });
    await newUser.save();

    sendMail(email, "OTP Verification", `Your OTP is ${OPT}`);
    res.status(201).json({
      message: "OTP sent successfully to your email",
      user: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const compliteRes = async (req, res) => {
  const { id } = req.params;
  const { userOpt } = req.body;
  if (!userOpt)
    return res.status(400).json({ message: "All fields are required" });
  try {
    const iSExist = await User.findById(id);
    if (!iSExist) {
      return res.status(404).json({ message: "User not found" });
    }
    if (userOpt === iSExist.otp) {
      iSExist.auth = true;
      await iSExist.save();
      res.status(200).json({ message: "User verified successfully" });
      return;
    }
    res.status(400).json({ message: "Invalid OTP" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });
  try {
    const isExist = await User.findOne({ email });
    if (!isExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = bcript.compare(password, isExist?.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const post = await Post.find({ user: isExist._id }).countDocuments();
    const token = generateToken(isExist._id, isExist.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    const user = await User.findById(isExist._id).select("-password -otp");
    res.status(200).json({
      message: "User logged in successfully",
      user: user,
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
