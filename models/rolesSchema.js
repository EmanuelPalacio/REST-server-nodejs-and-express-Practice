import { Schema, model } from "mongoose";

const roles = Schema({
  rol: {
    type: String,
    required: [true, "el rol es obligatorio"],
  },
});
const RolesSchema = model("roles", roles);
export default RolesSchema;
