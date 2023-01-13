const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  "category": String,
  "name": String,
  "price": Number,
  "image": String,
  "reviews": [{type: Schema.Types.ObjectId, ref: "Review"}]
});

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: [{type: Schema.Types.ObjectId, ref: "Product"}],
})

ProductSchema.index({"name": 'text', "category": 'text'});


module.exports = {Product: mongoose.model("Product", ProductSchema), Review: mongoose.model("Review", ReviewSchema)};