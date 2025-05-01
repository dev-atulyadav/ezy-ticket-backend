import express from "express";
import Payment from "../models/payment.js";
import Razorpay from "razorpay";

const paymentRoutes = express.Router();

paymentRoutes.post("/create-payment", async (req, res) => {
  const { userId, amount } = req.body;
  const payment = await Payment.create({ userId, amount });
  res.json({
    status: 200,
    message: "Payment created successfully!",
  });
});
