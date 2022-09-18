const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/productsWithReviewsTest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const now = new Date()
const current = now.getMonth() + ' ' + now.getDay() + ' ' + now.getHours() + ' : ' + + now.getMinutes()

const mainRoutes = require("./routes/main");

app.use(mainRoutes);

module.exports = app.listen(8000, () => {
  console.log(`Node.js listening on port 8000 ${current}`);
});