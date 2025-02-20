import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import MovieCard from "./MovieCard";

const Favorites = ({ movies, onAddToFavorites, onRemoveFromFavorites, onRateMovie, ratings, openModal }) => {
  if (movies.length === 0) return <p className="text-center text-gray-400">No favorites yet.</p>;

  return (
    <div className="favorites-section">
      <h2 className="section-title">Favorites</h2>
      <Splide
        options={{
          
          perPage: 4,
          perMove: 1,
          gap: "1rem",
          pagination: false,
          breakpoints: {
            1024: { perPage: 3 },
            768: { perPage: 2 },
            480: { perPage: 1 },
          },
        }}
      >
        {movies.map((movie) => (
          <SplideSlide key={movie.id}>
            <MovieCard 
            movie={movie} 
            isFavorite={true} 
            onAddToFavorites={onAddToFavorites}
            onRemoveFromFavorites={onRemoveFromFavorites}
            onRateMovie={onRateMovie} // Passing the rating function
            userRating={ratings[movie.id] || 0} // Passing the current rating for the movie
            openModal={openModal}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Favorites;
