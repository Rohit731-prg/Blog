import express from "express";
import { verifyJsonToken } from "../middleware/verifyJSON_webToken.js";
import { getCommentsByPost, postComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/postComment/:id", verifyJsonToken, postComment);
router.get("/getComments/:id", verifyJsonToken, getCommentsByPost);

export default router;