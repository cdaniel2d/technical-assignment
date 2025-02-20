import React, { useState, useEffect } from "react";

const MovieModal = ({ movie, onClose, addToRecentlyViewed }) => {
  // Initialize comments for this movie from localStorage
  const [comments, setComments] = useState(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments_${movie.id}`)) || [];
    return storedComments;
  });
  
  // State for the name and comment inputs
  const [newUsername, setNewUsername] = useState("");
  const [newComment, setNewComment] = useState("");

  // Function to add a comment
  const addComment = () => {
    // Ensure both fields are non-empty
    if (newUsername.trim() === "" || newComment.trim() === "") {
      alert("Please enter both your name and comment.");
      return;
    }
    
    const updatedComments = [
      ...comments, 
      { username: newUsername, text: newComment }
    ];
    
    setComments(updatedComments);
    // Save updated comments to localStorage
    localStorage.setItem(`comments_${movie.id}`, JSON.stringify(updatedComments));
    
    // Clear inputs after posting
    setNewUsername("");
    setNewComment("");
  };

  // Whenever comments change, sync them to localStorage
  useEffect(() => {
    localStorage.setItem(`comments_${movie.id}`, JSON.stringify(comments));
  }, [comments, movie.id]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <h3>Comments</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.username}:</strong> {comment.text}
            </li>
          ))}
        </ul>
        <div className="comment-form">
          <input
            type="text"
            placeholder="Your name..."
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Post Comment</button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
