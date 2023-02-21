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
//Metodo para renombrar id de mongo
/* UsuarioSchema.methods.toJSON = function() {
  const { __v, password, _id, ...usuario  } = this.toObject();
  usuario.uid = _id;
  return usuario;
} */

const UserSchema = model("users", user);
export default UserSchema;
