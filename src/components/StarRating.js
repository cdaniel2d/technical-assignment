import React from "react";

const StarRating = ({ rating = 0, onRate }) => {
  const [hover, setHover] = React.useState(0);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="star-icons"
          style={{ cursor: "pointer", color: star <= (hover || rating) ? "gold" : "gray" }}
          onClick={() => onRate(star)} // No need for local state, just call onRate directly
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
