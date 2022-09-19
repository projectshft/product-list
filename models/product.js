const mongoose = require("mongoose");
const mongoosePagination = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ReviewSchema = "review.js"

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ReviewSchema],
});

ProductSchema.plugin(mongoosePagination)

// const productModel = mongoose.model("Product", ProductSchema)

module.exports = mongoose.model("Product", ProductSchema);
// module.exports = ProductSchema
// export default mongoose.model("Product", ProductSchema)