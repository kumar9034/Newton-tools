import db from "../config/Db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AdminController {

  static async postSignup(req, res) {
    const { name, email, password } = req.body ?? {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    try {
      // Check if admin exists
      const [existingAdmin] = await db.execute(
        "SELECT id FROM admins WHERE email = ?",
        [email]
      );

      if (existingAdmin.length > 0) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert admin
      const [insertResult] = await db.execute(
        "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );

      return res.status(201).json({
        message: "Admin created successfully",
        adminId: insertResult.insertId
      });

    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }


  static async postLogin(req, res) {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    try {
      db.query(
        "SELECT * FROM admins WHERE email = ?",
        [email],
        async (err, result) => {

          if (err) {
            return res.status(500).json({ message: "Database error" });
          }

          if (result.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
          }

          const admin = result[0];

          const isMatch = await bcrypt.compare(password, admin.password);

          if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
          }

          const jwtSecret = process.env.JWT_SECRET;
          if (!jwtSecret) {
            return res.status(500).json({ message: "JWT secret is not configured" });
          }

          const token = jwt.sign(
            { id: admin.id, email: admin.email },
            jwtSecret,
            { expiresIn: "1d" }
          );

          return res.status(200).json({
            message: "Login successful",
            token,
          });
        }
      );

    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  }
}
