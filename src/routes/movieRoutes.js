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

//Get movie by id
movieRoutes.get("/get-movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    res.json({
      status: 200,
      message: "Movie fetched successfully!",
      data: movie,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal Server Error!",
      data: null,
    });
  }
});

//Get movie by movieId
movieRoutes.get("/get-movie-by-movieId/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findOne({ movieId });
    if (!movie) {
      return res.json({
        status: 404,
        message: "Movie not found!",
        data: null,
      });
    }
    res.json({
      status: 200,
      message: "Movie fetched successfully!",
      data: movie,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal Server Error!",
      data: null,
    });
  }
});
export default movieRoutes;
