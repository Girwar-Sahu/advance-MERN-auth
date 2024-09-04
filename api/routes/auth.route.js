import express from "express";
import {
  signIn,
  signOut,
  signUp,
  varifyEmail,
  forgotPassword,
  resetPassword,
} from "../controller/auth.controller.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/varify-email", varifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/signin", signIn);
router.post("/signout", signOut);

export default router;
