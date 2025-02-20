import React, { useState } from "react";

const Comments = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">Comments</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="border-b py-1">{comment}</li>
        ))}
      </ul>
      <input
        type="text"
        className="border p-2 rounded w-full mt-2"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment} className="mt-2 bg-blue-500 text-white p-2 rounded">Submit</button>
    </div>
  );
};

export default Comments;
