const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const port = 7000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

const eventHandler = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { postId } = data;
    const post = posts[postId];
    post.comments.push(data);
  } else if (type === "CommentUpdated") {
    const { id, comment: commentU, postId } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = data.status;
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  eventHandler(type, data);
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, (err) => {
  if (err) {
    console.log("Server Error: ", err);
  }

  console.log("Server Started at Port", port);
});
