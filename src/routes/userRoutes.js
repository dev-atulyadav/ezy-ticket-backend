import express from "express";
import User from "../models/user.js";
import {
  validateUserData,
  validateUserLogin,
} from "../utils/dataValidation.js";
import bcrypt from "bcryptjs";

const userRoutes = express.Router();

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

userRoutes.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({
    status: 200,
    message: "User logged out successfully",
  });
});

userRoutes.get("/book-ticket", async (req, res) => {
  const { ticketId, movieId, userId } = req.body;
  console.log(ticketId, movieId, userId);
  res.json({
    status: 200,
    message: "Book ticket successfully!",
  });
});

export default userRoutes;
