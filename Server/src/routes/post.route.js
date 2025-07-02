import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostByType,
  getTrandingBlogs,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/createPost/:id", createPost);
router.get("/getAllPosts", getAllPosts);
router.post("/getPostsByID/:id", getPostById);
router.get("/getTrandings", getTrandingBlogs);
router.post("/getPostByType", getPostByType);
router.delete("/deletePost/:id", deletePost);

export default router;
