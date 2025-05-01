import express from "express";
import Movie from "../models/movie.js";

const movieRoutes = express.Router();

//Get all movies
movieRoutes.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json({
    status: 200,
    message: "Movies fetched successfully!",
    data: movies,
  });
});

export default movieRoutes;
