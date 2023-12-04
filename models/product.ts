import mongoose, { Schema, InferSchemaType } from "mongoose";

const ProductSchema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

type ProductType = InferSchemaType<typeof ProductSchema>; // not sure if this is needed

const Product = mongoose.model("Product", ProductSchema);

export { ProductType };
export default Product;
