const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  product: { type: Schema.Types.ObjectId, ref: "Product" }
});

ReviewSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("Review", ReviewSchema);
