const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Ocean Shield API is running 🌊",
  });
});

// THis is a change...

module.exports = app;
