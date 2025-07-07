import express from "express";
import {
  compliteRes,
  logIn,
  loginWithVerify,
  logOut,
  register,
} from "../controllers/user.controller.js";
import { verifyJsonToken } from "../../middleware/verifyJSON_webToken.js";

const router = express.Router();

router.post('/verifyWithAuth', verifyJsonToken, loginWithVerify);
router.post("/signup", register);
router.post("/compliteRes/:id", compliteRes);
router.post("/login", logIn);
router.post("/logout", logOut);

export default router;