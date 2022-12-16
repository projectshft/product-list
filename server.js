const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/products", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


const mainRoutes = require("./routes/main");

app.use(mainRoutes);

app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});