import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

import DocumentRoutes from "./Router/userRoute.js";
import AdminRouter from "./Router/AdminRouter.js";
import SliderRouter from "./Router/SliderRouter.js";
import SubscriptionRouter from "./Router/subscriptionRouter.js";
import PromotionRouter from "./Router/promotionRouter.js"
// import { sendWhatsAppMessage } from "./config/Whatsapp.js";

import "./config/Db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
};
app.use(cors(corsOptions));

// app.options("*", cors());


// test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// uploads folder public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/documents", DocumentRoutes);
app.use("/api/admin", AdminRouter);
app.use("/api", SliderRouter);
app.use("/api", SubscriptionRouter);
app.use("/api", PromotionRouter)


// const users = [
//   "917056450305",
//   "918053487626",
//   // yaha database se numbers ayenge
// ];

// const sendBulk = async () => {
//   for (let number of users) {
//     await sendWhatsAppMessage(number);
    
//     // spam block avoid karne ke liye delay
//     await new Promise(res => setTimeout(res, 2000));
//   }
// };

// sendBulk();

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});