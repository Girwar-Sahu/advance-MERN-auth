import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db.config.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
const corsOption = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}
app.listen(PORT, (req, res) => {
  connectDB();
  console.log(`server running on port ${PORT}`);
});
 