import express from "express";
import { compliteRes, logIn, register } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/signup', register);
router.post('/compliteRes/:id', compliteRes);
router.post('/login', logIn);

export default router;