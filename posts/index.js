const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");
const bodyParser = require("body-parser");
const cors = require("cors");

const posts = {};

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/posts", (req, res) => {
  const { title } = req.body;
  const postId = uuid();

  posts[postId] = {
    id: postId,
    title,
  };

  res.status(201).json(posts[postId]);
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(4000, (err) => {
  if (err) {
    console.log("Server Error: ", err);
  }

  console.log("Server Started at Port", 4000);
});
