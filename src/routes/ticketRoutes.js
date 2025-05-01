import express from "express";
import Ticket from "../models/ticket.js";

const ticketRoutes = express.Router();

//Get all tickets
ticketRoutes.get("/", async (req, res) => {
  const tickets = await Ticket.find();
  res.json({
    status: 200,
    message: "Tickets fetched successfully!",
    data: tickets,
  });
});
//Update seats
ticketRoutes.put("/update-seats", async (req, res) => {
  const { seats, userId } = req.body;
  const ticket = await Ticket.findOneAndUpdate(
    { userId },
    { seats },
    { new: true }
  );
  res.json({
    status: 200,
    message: "Seats updated successfully!",
    data: ticket,
  });
});

//update payment status
ticketRoutes.put("/update-payment-status", async (req, res) => {
  const { userId } = req.body;
  const ticket = await Ticket.findOneAndUpdate(
    { userId },
    { isPaid: true },
    { new: true }
  );
  res.json({
    status: 200,
    message: "Payment status updated successfully!",
    data: ticket,
  });
});
export default ticketRoutes;
