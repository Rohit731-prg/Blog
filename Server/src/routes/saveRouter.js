import express from "express";
import { deleteSavePost, getSavePost, savePost } from "../controllers/saveController.js";
import { verifyJsonToken } from "../middleware/verifyJSON_webToken.js";

const router = express.Router();

router.post("/savePost/:id", verifyJsonToken, savePost);
router.get("/getAllPosts", verifyJsonToken, getSavePost);

router.delete("/deleteSave/:id", verifyJsonToken, deleteSavePost);

export default router;