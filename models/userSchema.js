import { Schema, model } from "mongoose";

const user = Schema({
  name: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "el correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "la contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  condition: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});
const userSchema = model("users", user);
export default userSchema;
