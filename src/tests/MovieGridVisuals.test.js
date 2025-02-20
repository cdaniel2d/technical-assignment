import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieGrid from '../components/MovieGrid';

// Dummy data to simulate movies
const movies = [
  {
    id: 1,
    title: 'Movie 1',
    poster_path: '/poster1.jpg',
    overview: 'Overview for Movie 1',
  },
  {
    id: 2,
    title: 'Movie 2',
    poster_path: '/poster2.jpg',
    overview: 'Overview for Movie 2',
  },
];

// Dummy functions and values
const dummyFavorites = [];
const dummyRatings = {};
const dummyOpenModal = jest.fn();
const dummyOnAddToFavorites = jest.fn();
const dummyOnRemoveFromFavorites = jest.fn();
const dummyOnRateMovie = jest.fn();

describe('MovieGrid Component', () => {
  test('renders movie grid with provided movies', () => {
    render(
      <MovieGrid
        movies={movies}
        favorites={dummyFavorites}
        onAddToFavorites={dummyOnAddToFavorites}
        onRemoveFromFavorites={dummyOnRemoveFromFavorites}
        onRateMovie={dummyOnRateMovie}
        ratings={dummyRatings}
        openModal={dummyOpenModal}
      />
    );
    
    // Check if the movie titles are in the document
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    
    // Check if the images for each movie are rendered.
    // This assumes that each MovieCard renders an image with alt text equal to the movie title.
    const movieImages = screen.getAllByRole('img');
    expect(movieImages).toHaveLength(movies.length);
  });
});
