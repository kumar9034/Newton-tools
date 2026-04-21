import express from "express";
import SubscriptionController from "../controller/subscriptionController.js";

const router = express.Router();

// Subscribe
router.post("/subscribe", SubscriptionController.subscribe);

// Get all (admin)
router.get("/all", SubscriptionController.getAllSubscriptions);

// Unsubscribe
router.post("/unsubscribe", SubscriptionController.unsubscribe);

export default router;