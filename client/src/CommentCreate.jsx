import React, { useState } from "react";
import axios from "axios";

function CommentCreate({ postId }) {
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4001/${postId}/comments`,
        {
          comment,
        }
      );
      if (response.status === 200) {
        console.log("Successfully Created!");
      } else {
        console.log("Failed Created!");
      }
      setComment("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-dark">
          Comment
        </button>
      </form>
    </>
  );
}

export default CommentCreate;
