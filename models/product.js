const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: { type: String, requiret: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

//text index allows for text search of collection
ProductSchema.index({ category: "text", name: "text", image: "text" });

module.exports = mongoose.model("Product", ProductSchema);
