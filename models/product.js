const { id_ID } = require("faker/lib/locales");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: String, 
  category: String,
  name: String,
  price: Number,
  image: String,
  // add array of subdocuments
  reviews: [{
    userName: String,
    text: String,
    product: String
  }]
});

module.exports = mongoose.model("Product", ProductSchema);
