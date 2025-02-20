// Favorites.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Favorites from '../components/Favorites';

jest.mock('@splidejs/react-splide', () => {
    return {
      Splide: ({ children }) => <div>{children}</div>,
      SplideSlide: ({ children }) => <div>{children}</div>,
    };
  });

// Dummy movie object
const dummyMovie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  overview: 'Test Overview'
};

describe('Favorites Component', () => {
  test('clicking the favorite button calls onRemoveFromFavorites for a movie that is already favorited', () => {
    // Create mock functions for the required props
    const onRemoveFromFavoritesMock = jest.fn();
    const onRateMovieMock = jest.fn();

    // Render the Favorites component with the dummy movie in the favorites list
    render(
      <Favorites 
        movies={[dummyMovie]} 
        onRemoveFromFavorites={onRemoveFromFavoritesMock}
        onRateMovie={onRateMovieMock}
        ratings={{}} 
        openModal={() => {}}
      />
    );

    // Use getByTestId to get the favorite button
    const favoriteButton = screen.getByTestId('favorite-button');

    // Simulate a click on the favorite button
    fireEvent.click(favoriteButton);

    expect(onRemoveFromFavoritesMock).toHaveBeenCalledWith(dummyMovie);
  });
});
