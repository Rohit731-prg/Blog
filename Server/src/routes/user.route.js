import express from "express";
import {
  compliteRes,
  logIn,
  loginWithVerify,
  logOut,
  register,
  updateProfileImage,
} from "../controllers/user.controller.js";
import { verifyJsonToken } from "../middleware/verifyJSON_webToken.js";
import { logger } from "../middleware/logger.js";
import { upload, uploadImage } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", upload.single("image"), uploadImage, register);
router.post("/optVerify/:id", compliteRes);
router.post("/login", logIn);
router.get("/logout", logOut);
router.put("/updateProfileImage", verifyJsonToken, logger, upload.single("image"), uploadImage, updateProfileImage);

router.get('/me', verifyJsonToken, loginWithVerify);
export default router;