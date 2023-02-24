import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";

function PostList() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/posts");
      if (response.status === 200) {
        setPosts(response.data);
      } else {
        console.log("Failed to Fetched!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const rendedPosts = Object.values(posts).map((item,index)=>{

    return (<div className="col-sm-6 col-md-4 col-lg-3">
        <div className="card mx-1 my-4" key={index}>
        <div className="card-body">
            <h1>{item.title}</h1>
            <CommentCreate postId={item.id} />
        </div>
    </div>
        </div>)
  })

  return <div className="row">
    {rendedPosts}
  </div>;
}

export default PostList;
