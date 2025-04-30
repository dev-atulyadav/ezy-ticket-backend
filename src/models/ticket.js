import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: String,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
