import { Schema, model } from "mongoose";

const categories = Schema({
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

const CategoriesSchema = model("categories", categories);
export default CategoriesSchema;
