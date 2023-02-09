import rolesSchema from "../models/rolesSchema.js";
import userSchema from "../models/userSchema.js";

export const checkRol = async (rol = "") => {
  const verifyRol = await rolesSchema.findOne({ rol });
  if (!verifyRol) {
    throw new Error(`el rol ${rol} no existe en la base de datos`);
  }
};

export const checkEmail = async (email = "") => {
  const findEmail = await userSchema.findOne({ email });
  if (findEmail) {
    throw new Error(`El email ${email} ya existe en la base de datos`);
  }
};

export const checkPassword = async (password = "") => {
  const validPassword = bcryptjs.compareSync(password, userSchema.password);
  if (!validPassword) {
    throw new Error(`El usuario / contraseña no son correctos`);
  }
};

export const checkId = async (id = "") => {
  const findId = await userSchema.findById(id);
  if (!findId) {
    throw new Error(`El usuario ${id} no existe en la base de datos`);
  }
};
