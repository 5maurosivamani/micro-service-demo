const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 6000;
const cors = require("cors");
const axios = require("axios");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:7000/events", event);

  res.send({ status: "OK" });
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
