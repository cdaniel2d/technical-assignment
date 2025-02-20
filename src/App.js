import React, { useState, useEffect } from "react";
import MovieGrid from "./components/MovieGrid";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import Favorites from "./components/Favorites";
import Recommended from "./components/Recommended";
import RecentlyViewed from "./components/RecentlyViewed";
import MovieModal from "./components/MovieModal";
import "./App.css";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "f9f8375a3713106eba88785ecb147749";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [modalMovie, setModalMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState(null);
  const [ratings, setRatings] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Load recently viewed from localStorage
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    return JSON.parse(localStorage.getItem("recentlyViewed")) || [];
  });

  // Save recently viewed to localStorage
  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Fetch genres and movies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreResponse = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}`);
        const genreData = await genreResponse.json();
        setGenres(genreData.genres);
        setLoadingGenres(false);

        await fetchMovies(); // Fetch initial movies
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch movies based on search query and genre
  useEffect(() => {
    fetchMovies();
  }, [genre, searchQuery]);

  const fetchMovies = async () => {
    let url = `${API_URL}/discover/movie?api_key=${API_KEY}`;
    if (searchQuery) {
      url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
    }
    if (genre) {
      url += `&with_genres=${genre}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleAddToFavorites = (movie) => {
    const updatedFavorites = favorites.some((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleRateMovie = (movie, rating) => {
    const updatedRatings = { ...ratings, [movie.id]: rating };
    setRatings(updatedRatings);
    localStorage.setItem("movieRatings", JSON.stringify(updatedRatings));
  };

  const handleMovieClick = (movie) => {
    setRecentlyViewed((prev) => {
      const isAlreadyViewed = prev.some((m) => m.id === movie.id);
      return isAlreadyViewed ? prev : [movie, ...prev].slice(0, 10);
    });
  };

  const openModal = (movie) => {
    if (!movie) return;
    setSelectedMovie(movie);
    setModalMovie(movie);
    handleMovieClick(movie);
  };

  const closeModal = () => {
    setModalMovie(null);
    setSelectedMovie(null);
  };

  return (
      <div className="app">
        <SearchBar onSearch={(query) => setSearchQuery(query)} />
        <GenreFilter genres={genres} loading={loadingGenres} setGenre={setGenre} />
        <MovieGrid
          movies={movies}
          favorites={favorites}
          onAddToFavorites={handleAddToFavorites}
          onRateMovie={handleRateMovie}
          ratings={ratings}
          openModal={openModal}
        />
        <Favorites
          movies={favorites}
          onRemoveFromFavorites={handleAddToFavorites}
          onRateMovie={handleRateMovie}
          ratings={ratings}
          openModal={openModal}
        />
        <Recommended
          favoriteMovies={favorites}
          onAddToFavorites={handleAddToFavorites}
          onRateMovie={handleRateMovie}
          ratings={ratings}
          openModal={openModal}
        />
        <RecentlyViewed
          recentlyViewed={recentlyViewed}
          openModal={openModal}
          onAddToFavorites={handleAddToFavorites}
          onRateMovie={handleRateMovie}
          ratings={ratings}
        />
        
        {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
      </div>
  );
};

export default App;
