const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')

mongoose.connect("mongodb://localhost/products");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors())

const mainRoutes = require("./routes/main");

app.use(mainRoutes);

app.listen(3001, () => {
  console.log("Node.js listening on port " + 3001);
});