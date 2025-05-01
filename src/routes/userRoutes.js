import express from "express";
import User from "../models/user.js";
import {
  validateUserData,
  validateUserLogin,
} from "../utils/dataValidation.js";
import bcrypt from "bcryptjs";
import Ticket from "../models/ticket.js";
import Movie from "../models/moive.js";

const userRoutes = express.Router();

//Register user
userRoutes.post("/register", async (req, res) => {
  try {
    const { name, email, password } = validateUserData(req.body);
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        status: 400,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(400).json({
        status: "error",
        message: "User registration failed",
      });
    }
    res.json({
      status: 201,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "User registration failed",
    });
  }
});

//Login user
userRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = validateUserLogin(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: 401,
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        status: 401,
        message: "Invalid email or password",
      });
    }
    res.json({
      status: 200,
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "User login failed",
    });
  }
});

//Logout user
userRoutes.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({
    status: 200,
    message: "User logged out successfully",
  });
});

//Book ticket
userRoutes.post("/book-ticket", async (req, res) => {
  try {
    const { seats, movie, userId } = req.body;
    console.log(seats, movie, userId);
    if (!seats || !movie || !userId) {
      return res.json({
        status: 400,
        message: "All fields are required",
      });
    }
    const exsistingMovie = await Movie.findOne({ movieId: movie.id });
    if (!exsistingMovie) {
      const newMovie = await Movie.create({
        title: movie.title,
        description: movie.description,
        price: movie.price,
        image: movie.image,
        bookedSeats: seats,
      });
      const ticket = await Ticket.create({
        seats: seats,
        movieId: newMovie._id,
        userId: userId,
        totalAmount: 200,
        paymentMethod: "online",
      });
      return res.json({
        status: 200,
        message: "Book ticket successfully!",
        data: ticket,
      });
    }

    if (exsistingMovie.bookedSeats.some((seat) => seats.includes(seat))) {
      return res.json({
        status: 400,
        message: "Seat already booked!",
      });
    }
    exsistingMovie.bookedSeats.push(...seats);
    await exsistingMovie.save();
    res.json({
      status: 200,
      message: "Book ticket successfully!",
      data: exsistingMovie,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server error",
    });
  }
});

export default userRoutes;
