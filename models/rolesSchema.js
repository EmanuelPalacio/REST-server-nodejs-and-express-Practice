import { Schema, model } from "mongoose";

const roles = Schema({
  rol: {
    type: String,
    required: [true, "el rol es obligatorio"],
  },
});
const rolesSchema = model("roles", roles);
export default rolesSchema;
