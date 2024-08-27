import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.config.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
dotenv.config();

app.use("/api/auth", authRoutes);

app.listen(3000, (req, res) => {
  connectDB();
  console.log("server running on port 3000");
});
