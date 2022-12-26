const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/products", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const mainRoutes = require("./routes/main");

app.use(mainRoutes);
//https://expressjs.com/en/guide/error-handling.html
//https://developer.chrome.com/blog/automatically-pause-on-any-exception/#:~:text=In%20DevTools%2C%20you%20can%20automatically,also%20pause%20on%20caught%20exceptions.
let server = app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});

module.exports = server
