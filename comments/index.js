const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");
const bodyParser = require("body-parser");
const port = 4001;
const cors = require("cors");
const axios = require("axios");

const commentsByPostId = {};

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/:id/comments", (req, res) => {
  const postId = req.params.id;
  res.status(200).json(commentsByPostId[postId]);
});

app.post("/:id/comments", (req, res) => {
  const { comment } = req.body;
  const postId = req.params.id;
  const commentId = uuid();

  const comments = commentsByPostId[postId] || [];

  comments.push({
    id: commentId,
    comment,
  });

  commentsByPostId[postId] = comments;

  axios.post("http://localhost:6000/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      comment,
      postId,
    },
  });

  res.status(200).json(commentsByPostId[postId]);
});

app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);
  res.status(200).send({});
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
