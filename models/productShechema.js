import { Schema, model } from "mongoose";

const product = Schema({
  name: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
});
const ProductSchema = model("products", product);
export default ProductSchema;
