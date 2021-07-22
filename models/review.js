const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  username: { type: String, requiret: true },
  text: { type: String, requiret: true },
  product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Review", ReviewSchema);
