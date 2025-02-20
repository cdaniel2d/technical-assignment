import React from "react";
import "../css/GenreFilter.css";

const GenreFilter = ({ genres, loading, setGenre }) => {
  return (
    <div className="genre-filter">
      <label htmlFor="genre" className="genre-label">
        Select Genre:
      </label>
      <select
        id="genre"
        onChange={(e) => setGenre(e.target.value)}
        disabled={loading}
        className="genre-select"
      >
        {loading ? (
          <option>Loading genres...</option>
        ) : (
          <>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default GenreFilter;
