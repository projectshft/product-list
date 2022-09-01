const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const main = require("./routes/main");
const products = require("./routes/products");
const reviews = require("./routes/reviews");

mongoose.connect("mongodb://localhost/products", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));

app.use('/', main);
app.use('/products', products);
app.use('/reviews', reviews);

app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});