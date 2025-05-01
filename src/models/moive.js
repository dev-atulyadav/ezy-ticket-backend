import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  bookedSeats: [],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
