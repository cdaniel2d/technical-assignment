import React from "react";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, onAddToFavorites, onRemoveFromFavorites, onRateMovie, ratings, openModal, favorites }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie, index) => {
        const isFavorite = favorites.some((fav) => fav.id === movie.id); 
        return (
          <div key={`${movie.id}-${index}`}>
            <MovieCard
              key={`${movie.id}-${index}`}
              movie={movie}
              isFavorite={isFavorite}
              onAddToFavorites={onAddToFavorites}
              onRemoveFromFavorites={onRemoveFromFavorites}
              onRateMovie={onRateMovie}
              userRating={ratings[movie.id] || 0}
              openModal={openModal}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MovieGrid;
