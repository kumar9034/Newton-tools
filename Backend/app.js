import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import DocumentRoutes from "./Router/userRoute.js";
import AdminRouter from "./Router/AdminRouter.js"
import SliderRouter from "./Router/SliderRouter.js"
import "./config/Db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });
const port = process.env.PORT || 3000;

const app = express();


app.use(cors({
  origin: process.env.FRONTEND_API_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// 🔥 VERY IMPORTANT – make uploads public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/documents", DocumentRoutes);
app.use("/api/admin", AdminRouter);
app.use("/api", SliderRouter)

// app.get("/", (req, res) => {
//   res.send("Backend Running 🚀");
// });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
