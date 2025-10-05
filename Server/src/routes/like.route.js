import express from "express";
import { likePost } from "../controllers/likes.controller.js";
import { verifyJsonToken } from "../middleware/verifyJSON_webToken.js";

const router = express.Router();

router.post('/addLike/:id', verifyJsonToken, likePost);

export default router;