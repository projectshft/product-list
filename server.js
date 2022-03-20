// import express, mongoose, body-parser
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// connect database
mongoose.connect("mongodb://localhost/products", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// require in routes/main js
const mainRoutes = require("./routes/main");

app.use(mainRoutes);

// listen on Port 8000
app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});