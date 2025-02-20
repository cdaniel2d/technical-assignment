import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GenreFilter from '../components/GenreFilter';

describe('GenreFilter Component', () => {
  const dummyGenres = [
    { id: '1', name: 'Action' },
    { id: '2', name: 'Comedy' },
    { id: '3', name: 'Drama' },
  ];

  test('calls setGenre with the selected genre value', () => {
    // Create a mock function for setGenre
    const setGenreMock = jest.fn();

    // Render the component with dummy genres and loading set to false
    render(
      <GenreFilter 
        genres={dummyGenres} 
        loading={false} 
        setGenre={setGenreMock} 
      />
    );

    // Find the select element by its label text
    const selectElement = screen.getByLabelText(/Select Genre/i);
    
    // Simulate a change event on the select element
    fireEvent.change(selectElement, { target: { value: '2' } });

    // Check that the setGenreMock function was called with '2'
    expect(setGenreMock).toHaveBeenCalledWith('2');
  });

  test('displays a loading option when loading is true', () => {
    const setGenreMock = jest.fn();

    // Render with loading = true
    render(
      <GenreFilter 
        genres={dummyGenres} 
        loading={true} 
        setGenre={setGenreMock} 
      />
    );

    // The select should display "Loading genres..." as its option
    expect(screen.getByText(/Loading genres.../i)).toBeInTheDocument();
  });
});
