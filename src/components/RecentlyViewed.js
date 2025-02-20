import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/dist/css/splide.min.css";
import MovieCard from "./MovieCard";

const RecentlyViewed = ({ recentlyViewed, openModal, onAddToFavorites, onRemoveFromFavorites, onRateMovie, ratings}) => {
  

  return (
    <div className="recently-viewed">
      <h2>Recently Viewed</h2>
      {recentlyViewed.length > 0 ? (
        <Splide options={{ perPage: 2, gap: "1rem", pagination: false, 
          breakpoints: {
            2048: { perPage: 4 },
            1024: { perPage: 3 },
            768: { perPage: 2 },
            480: { perPage: 1 },
          },
        arrows: true }}>
          {recentlyViewed.map((movie) => (
            <SplideSlide key={movie.id}>
              <MovieCard
                movie={movie}
                onAddToFavorites={onAddToFavorites}
                onRemoveFromFavorites={onRemoveFromFavorites}
                onRateMovie={onRateMovie}
                userRating={ratings[movie.id] || 0}
                openModal={openModal}
              />
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <p>No recently viewed movies.</p>
      )}
    </div>
  );
};

export default RecentlyViewed;
