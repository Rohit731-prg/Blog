import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import userRouter from './src/routes/user.route.js';
import postRouter from './src/routes/post.route.js';
import LikeRouter from './src/routes/like.route.js';
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json({
    limit: "30mb"
}));
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/like', LikeRouter);

const port = process.env.PORT || 2500;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((err) => console.log(err));