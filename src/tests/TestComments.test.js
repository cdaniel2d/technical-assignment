
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieModal from '../components/MovieModal';

// A dummy movie object for testing
const movie = {
  id: '123',
  title: 'Test Movie',
  overview: 'This is a test movie overview.'
};

// Mock function for onClose and addToRecentlyViewed (if needed)
const onCloseMock = jest.fn();
const addToRecentlyViewedMock = jest.fn();

describe('MovieModal', () => {
  beforeEach(() => {
    // Clear localStorage before each test if needed
    localStorage.clear();
  });

  test('allows user to leave a comment', () => {
    // Render the modal with the movie prop
    render(
      <MovieModal 
        movie={movie} 
        onClose={onCloseMock} 
        addToRecentlyViewed={addToRecentlyViewedMock} 
      />
    );

    const nameInput = screen.getByPlaceholderText('Your name...');
    const commentInput = screen.getByPlaceholderText('Add a comment...');
    const postButton = screen.getByRole('button', { name: /Post Comment/i });

    // Simulate user typing their name and a comment
    fireEvent.change(nameInput, { target: { value: 'TestUser' } });
    fireEvent.change(commentInput, { target: { value: 'Great movie!' } });

    // Simulate clicking the "Post Comment" button
    fireEvent.click(postButton);

    // Check if the comment appears in the modal
    expect(screen.getByText(/TestUser:/i)).toBeInTheDocument();
    expect(screen.getByText(/Great movie!/i)).toBeInTheDocument();

    // Check that localStorage is updated
    const storedComments = JSON.parse(localStorage.getItem(`comments_${movie.id}`));
    expect(storedComments).toEqual([
      { username: 'TestUser', text: 'Great movie!' }
    ]);
  });
});
