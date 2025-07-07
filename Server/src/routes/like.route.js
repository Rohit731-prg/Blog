import express from "express";
import { likePost } from "../controllers/likes.controller.js";

const router = express.Router();

router.post('/addLike/:id', likePost);

export default router;