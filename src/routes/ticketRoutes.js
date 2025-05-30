import express from "express";
import Ticket from "../models/ticket.js";
import User from "../models/user.js";
import Movie from "../models/movie.js";

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

// get User ticket
ticketRoutes.get("/get-tickets/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const tickets = await Ticket.find({ userId });
    const movieIds = tickets.map((ticket) => ticket.movieId);
    const movies = await Movie.find({ _id: { $in: movieIds } });
    return res.json({
      status: 200,
      message: "User tickets fetched successfully!",
      data: {
        tickets,
        movies,
      },
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Internal Server Error!",
      data: null,
    });
  }
});

//remove ticket by id
ticketRoutes.delete("/remove-ticket/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Ticket.findByIdAndDelete(id);
    const tickets = await Ticket.find();
    res.json({
      status: 200,
      message: "Ticket removed successfully!",
      data: tickets,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal Server Error!",
      data: null,
    });
  }
});
export default ticketRoutes;
