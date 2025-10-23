import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostByPostID,
  getPostByType,
  getTrandingBlogs,
} from "../controllers/post.controller.js";
import { verifyJsonToken } from "../middleware/verifyJSON_webToken.js";
import { upload, uploadImage } from "../middleware/multer.js";

const router = express.Router();

router.post("/createPost", verifyJsonToken, upload.single("image"), uploadImage, createPost);
router.get("/getAllPosts", verifyJsonToken, getAllPosts);
router.post("/getPostsByID/:id", verifyJsonToken, getPostById);
router.get("/getTrandings", verifyJsonToken, getTrandingBlogs);
router.post("/getPostByType", verifyJsonToken, getPostByType);
router.delete("/deletePost/:id", verifyJsonToken, deletePost);
router.post('/getPostsByPostID/:id', verifyJsonToken, getPostByPostID);

export default router;