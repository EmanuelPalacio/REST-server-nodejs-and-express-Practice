import { Schema, model } from "mongoose";

const product = Schema({
  name: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});
const ProductSchema = model("categories", product);
export default ProductSchema;
