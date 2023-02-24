import React, { useState } from "react";
import axios from "axios"

function PostCreate() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/posts", {
        title
      });
      if (response.status === 201) {
        console.log("Successfully Created!");
      } else {
        console.log("Failed Created!");
      }
      setTitle("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label htmlFor="title" class="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default PostCreate;
