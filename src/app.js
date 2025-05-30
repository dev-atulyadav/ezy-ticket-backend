import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/ticket", ticketRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send({
    status: "success",
    message: "Server is running!",
  });
});
