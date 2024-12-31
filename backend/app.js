const express = require("express");
const app = express();
const PORT = 5000;
const userModel = require("./models/UserModel");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT);
