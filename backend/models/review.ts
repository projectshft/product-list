import mongoose, { Schema } from "mongoose";

// Mongoose review schema

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: "Product" }
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;