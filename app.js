require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(PORT, () => {
  console.log("server is runing");
});
