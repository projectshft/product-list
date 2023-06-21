const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/products", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mainRoutes = require("./routes/main");

app.use(mainRoutes);

const port = 8000;
app.listen(port, () => {
  console.log(`Node.js listening at http://localhost:${port}`);
});

module.exports = app;
