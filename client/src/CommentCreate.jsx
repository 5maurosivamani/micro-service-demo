import React, { useState } from "react";
import axios from "axios";

function CommentCreate({ postId }) {
  const [commant, setCommant] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4001/${postId}/comments`,
        {
          commant,
        }
      );
      if (response.status === 200) {
        console.log("Successfully Created!");
      } else {
        console.log("Failed Created!");
      }
      setCommant("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (event) => {
    setCommant(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          
          <input
            type="text"
            id="title"
            value={commant}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Comment
        </button>
      </form>
    </>
  );
}

export default CommentCreate;
