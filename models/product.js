const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{type: Schema.Types.ObjectId, ref: "review"}]
});

ProductSchema.index({'$**': 'text'});

module.exports = mongoose.model("product", ProductSchema);