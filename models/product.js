// import mongoose
const mongoose = require("mongoose");

// shorter variable for mongoose schema
const Schema = mongoose.Schema;

// create a Product Schema
const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
});

// export Product model using ProductSchema
module.exports = mongoose.model("Product", ProductSchema);