// Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </button>
      ))}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
