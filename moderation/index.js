const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
// config cors
app.use(cors());

// config body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define a route for the root endpoint
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Receive Events
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const comment = data.comment;

    let status = 0;

    if (comment === "orange") {
      status = 2;
    } else {
      status = 1;
    }

    const event = {
      type: "CommentModurated",
      data: {
        ...data,
        status,
      },
    };

    axios.post("http://localhost:6000/events", event);
  }
});

// Receive other all routes
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
