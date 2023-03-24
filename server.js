const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

mongoose.connect("mongodb://localhost/products");

const app = express();

app.use(express.json());

app.use(cors())

const mainRoutes = require("./routes/productRoutes");

app.use(mainRoutes);

const PORT = 8000;
app.listen(8000, () => {
  console.log(`App running on port ${PORT}...`);
});