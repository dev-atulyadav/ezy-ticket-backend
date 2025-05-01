import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
