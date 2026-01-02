import express from "express";
import 'dotenv/config';
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';
import commentRouter from './routes/commentRoute.js';
import SaveRouter from "./routes/saveRouter.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json({
    limit: "2mb"
}));
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);
app.use('/api/save', SaveRouter);

const port = process.env.PORT || 2500;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((err) => console.log(err));