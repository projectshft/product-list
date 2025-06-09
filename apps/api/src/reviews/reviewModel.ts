import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//This is the Product Schema
const ReviewSchema = new Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  },
  { timestamps: true }
);

export const Review = model('Review', ReviewSchema);
