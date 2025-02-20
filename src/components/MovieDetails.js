import React from "react";
import StarRating from "./StarRating";
import Comments from "./Comments";

const MovieDetails = ({ movie }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <StarRating rating={movie.vote_average / 2} />
      <p className="mt-2">{movie.overview}</p>
      <Comments movieId={movie.id} />
    </div>
  );
};

export default MovieDetails;
