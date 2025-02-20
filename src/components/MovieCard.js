// MovieCard.js
import React from "react";
import StarRating from "./StarRating";
import HeartIcon from "./HeartIcon";
import "../../src/App.css";

const MovieCard = ({
  movie,
  isFavorite,
  onAddToFavorites,
  onRemoveFromFavorites,
  onRateMovie,
  userRating,
  openModal
}) => {
  
    const handleFavoriteClick = () => {
    if (isFavorite) {
      onRemoveFromFavorites(movie);
    } else {
      onAddToFavorites(movie);
    }
  };

  const handleRating = (newRating) => {
    if (onRateMovie) {
      onRateMovie(movie, newRating);
    }
  };

  return (
    <div className="movie-card bg-white p-4 rounded shadow-md hover:shadow-lg transform hover:scale-105 transition-all" >
      <div className="poster-container">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="poster"
          onClick={() => openModal(movie)}
        />
      </div>
      <h2 className="movie-title">{movie.title}</h2>
      <div className="star-rating">
        <StarRating rating={userRating} onRate={handleRating} />
        <button data-testid="favorite-button" className="favorite-button" onClick={handleFavoriteClick}>
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
