import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import DocumentRoutes from "./Router/userRoute.js";
import AdminRouter from "./Router/AdminRouter.js";
import SliderRouter from "./Router/SliderRouter.js";

import "./config/Db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 3000;

// CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://52.66.208.177"
  ],
  credentials: true
}));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test route
app.get("/api", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// uploads folder public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/documents", DocumentRoutes);
app.use("/api/admin", AdminRouter);
app.use("/api", SliderRouter);




app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});