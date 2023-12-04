import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

//type ProductType = InferSchemaType<typeof ProductSchema>; // not sure if this is needed

const Product = mongoose.model("Product", ProductSchema);

export default Product;
