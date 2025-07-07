import cloudinary from "../../utils/cloudinary.js";
import { sendMail } from "../../utils/nodemailer.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import bcript from "bcryptjs";
import JWT from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, email, password, image } = req.body;
    if( !name || !email || !password || !image ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const isExist = await User.findOne({ email });
        if(isExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        if( !image ) return res.status(400).json({ message: "Image is required" });
        const clouldImage = await cloudinary.uploader.upload(image);
        const url = clouldImage.secure_url;
        const image_ID = clouldImage.public_id;

        const OPT = Math.floor(Math.random() * 10000);
        if( OPT.length < 4 ) {
            console.log(OPT);
            OPT = `${OTP}0`;
        }
        const hashedPass = await bcript.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPass, image: url, otp: OPT, image_ID });
        await newUser.save();

        sendMail(email, "OTP Verification", `Your OTP is ${OPT}`);
        res.status(201).json({ message: "OTP sent successfully to your email", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const compliteRes = async (req, res) => {
    const { id } = req.params;
    const { userOpt } = req.body;
    if( !userOpt ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const iSExist = await User.findById(id);
        if( !iSExist ) {
            return res.status(404).json({ message: "User not found" });
        }
        if( userOpt === iSExist.otp ) {
            iSExist.auth = true;
            await iSExist.save();
            res.status(200).json({ message: "User verified successfully" });
            return;
        }

        const token = JWT.sign({
            email: iSExist.email,
            id: iSExist._id
        }, process.env.JWT_CODE, {
            expiresIn: "1d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(400).json({ message: "Invalid OTP" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
}

export const logIn = async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const isExist = await User.findOne({ email });
        if( !isExist ) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = bcript.compare(password, isExist.password);
        if( !isPasswordValid ) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const post = await Post.find({ user: isExist._id }).countDocuments();

        const token = JWT.sign({
            email: isExist.email,
            id: isExist._id
        }, process.env.JWT_CODE, {
            expiresIn: "1d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "User logged in successfully", user: isExist, post: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const loginWithVerify = async (req, res) => {
    try {
        const { email } = req.email;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const post = await Post.find({ user: user._id }).countDocuments();

        res.status(200).json({
            message: "User logged in successfully",
            user: user,
            post: post
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logOut = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}