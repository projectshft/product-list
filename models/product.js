const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: {
    type: String,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: null
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
});

ProductSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("Product", ProductSchema);
