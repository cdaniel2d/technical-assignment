import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StarRating from '../components/StarRating';

describe('StarRating Component', () => {
  test('updates rating when a star is clicked', () => {

    const onRateMock = jest.fn();

    // Render the component with an initial rating of 2
    render(<StarRating rating={2} onRate={onRateMock} />);

    // Assume the component renders five stars as text "★"
    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(5);

    // Simulate clicking the 4th star (index 3, so rating should be 4)
    fireEvent.click(stars[3]);

    // Verify that onRate was called with a value of 4
    expect(onRateMock).toHaveBeenCalledWith(4);
  });
});
