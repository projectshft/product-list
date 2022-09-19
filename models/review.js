const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const ReviewSchema = new Schema({
  username: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});
ReviewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Review", ReviewSchema);
