import Db from "../config/Db.js";

class SubscriptionModel {
  // Create subscription
  static async createSubscription(data) {
    const sql =
      "INSERT INTO subscriptions (name, phone, email) VALUES (?, ?, ?)";
    return await Db.execute(sql, [data.name, data.phone, data.email]);
  }

  // Get all subscriptions
  static async getAllSubscriptions() {
    const sql = `
      SELECT * FROM subscriptions
      ORDER BY createdAt DESC
    `;
    return await Db.execute(sql);
  }

  // Get subscription by email
  static async getSubscriptionByEmail(email) {
    const sql = "SELECT * FROM subscriptions WHERE email = ?";
    return await Db.execute(sql, [email]);
  }

  // Update subscription
  static async updateSubscription(email, data) {
    const sql =
      "UPDATE subscriptions SET name = ?, phone = ? WHERE email = ?";
    return await Db.execute(sql, [data.name, data.phone, email]);
  }

  // Delete subscription
  static async deleteSubscription(email) {
    const sql = "DELETE FROM subscriptions WHERE email = ?";
    return await Db.execute(sql, [email]);
  }
}

export default SubscriptionModel;
