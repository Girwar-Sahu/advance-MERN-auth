import express from "express";
import { verifyToken } from "../middleware/verifyUser.js";
import {
  signIn,
  signOut,
  signUp,
  varifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controller/auth.controller.js";
const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signUp);
router.post("/varify-email", varifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/signin", signIn);
router.post("/signout", signOut);

export default router;
