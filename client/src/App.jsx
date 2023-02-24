import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  return (
    <div className="text-primary">
      <div className="container">
        <div className="col-md-6 my-5 mx-auto">
          <h1>Create Post</h1>
          <PostCreate />
        </div>
        <hr />
        <PostList />
      </div>
    </div>
  );
};

export default App;
