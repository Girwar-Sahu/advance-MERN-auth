import express from "express";
import { signIn, signOut, signUp } from "../controller/auth.controller.js";
const router = express.Router();

router.post("/signup", signUp);
router.get("/sigin", signIn);
router.get("/signout", signOut);

export default router;
