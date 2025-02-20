import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import MovieCard from "./MovieCard";

const API_KEY = "f9f8375a3713106eba88785ecb147749";

const RecommendedMovies = ({
  favoriteMovies = [],
  ratings = {}, // default to an empty object
  onAddToFavorites,
  onRemoveFromFavorites,
  onRateMovie,
  openModal
}) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered! favoriteMovies:", favoriteMovies);

    if (!favoriteMovies || favoriteMovies.length === 0) {
      console.log("No favorite movies. Clearing recommendations.");
      setRecommendedMovies([]); // No recommendations if no favorites
      return;
    }

    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const randomMovie =
          favoriteMovies[Math.floor(Math.random() * favoriteMovies.length)];
        console.log("Randomly selected movie:", randomMovie);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${randomMovie.id}/recommendations?api_key=${API_KEY}`
        );
        console.log("API request sent:", response.url);
        const data = await response.json();
        console.log("API response received:", data);

        setRecommendedMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
        console.log("Finished fetching recommendations.");
      }
    };

    fetchRecommendations();
  }, [favoriteMovies.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="recommended-section">
      <h2 className="section-title">Recommended for You</h2>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : recommendedMovies.length > 0 ? (
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
          {recommendedMovies.map((movie) => (
            <SplideSlide key={movie.id}>
              <MovieCard
                movie={movie}
                isFavorite={favoriteMovies.some((fav) => fav.id === movie.id)}
                onAddToFavorites={onAddToFavorites}        // Make sure this is passed
                onRemoveFromFavorites={onRemoveFromFavorites}
                onRateMovie={onRateMovie}
                userRating={ratings[movie.id] || 0}
                openModal={openModal}
              />
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <p>No recommendations yet. Add some favorites to get started!</p>
      )}
    </div>
  );
};

export default RecommendedMovies;
