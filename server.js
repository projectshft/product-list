const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/products");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
connectToMongoDB();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const mainRoutes = require("./routes/main");

app.use(mainRoutes);

app.listen(8000, () => {
  console.log("Node.js is listening at localhost:8000");
});
