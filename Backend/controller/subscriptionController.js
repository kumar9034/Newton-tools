import SubscriptionModel from "../models/subscriptionModel.js";

class SubscriptionController {

  // ================================
  // SUBSCRIBE USER
  // ================================
  static async subscribe(req, res) {
    try {
      const { name, phone, email } = req.body;

      // Basic validation
      if (!name || !phone || !email) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address",
        });
      }

      // Phone validation
      const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid phone number",
        });
      }

      const [result] = await SubscriptionModel.createSubscription({ name, phone, email });

      return res.status(201).json({
        success: true,
        message: "Subscription successful 🎉",
        data: result,
      });
    } catch (error) {
      console.error("Server error:", error);
      
      // Duplicate email handling
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          success: false,
          message: "This email is already subscribed",
        });
      }

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }

  // ================================
  // GET ALL SUBSCRIPTIONS (ADMIN)
  // ================================
  static async getAllSubscriptions(req, res) {
    try {
      const [results] = await SubscriptionModel.getAllSubscriptions();

      return res.status(200).json({
        success: true,
        total: results.length,
        data: results,
      });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }

  // ================================
  // UNSUBSCRIBE USER
  // ================================
  static async unsubscribe(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      const [result] = await SubscriptionModel.deleteSubscription(email);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Email not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Unsubscribed successfully 👍",
      });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
}

export default SubscriptionController;