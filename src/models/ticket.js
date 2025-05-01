import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  seats: [String],
  movieId: String,
  userId: String,
  isPaid: { type: Boolean, default: false },
  totalAmount: Number,
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
