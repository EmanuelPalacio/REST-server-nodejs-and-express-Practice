import CategoriesSchema from "../models/categoriesSchema.js";
import ProductSchema from "../models/productShechema.js";
import RolesSchema from "../models/rolesSchema.js";
import UserSchema from "../models/userSchema.js";

export const checkRol = async (rol = "") => {
  const verifyRol = await RolesSchema.findOne({ rol });
  if (!verifyRol) {
    throw new Error(`el rol ${rol} no existe en la base de datos`);
  }
};

export const checkEmail = async (email = "") => {
  const findEmail = await UserSchema.findOne({ email });
  if (findEmail) {
    throw new Error(`El email ${email} ya existe en la base de datos`);
  }
};

export const checkPassword = async (password = "") => {
  const validPassword = bcryptjs.compareSync(password, UserSchema.password);
  if (!validPassword) {
    throw new Error(`El usuario / contraseña no son correctos`);
  }
};

export const checkId = async (id = "") => {
  const findId = await UserSchema.findById(id);
  if (!findId) {
    throw new Error(`El usuario ${id} no existe en la base de datos`);
  }
};

export const checkCategory = async (id = "") => {
  const findId = await CategoriesSchema.findById(id);
  if (!findId) {
    throw new Error(`La categoria ${id} no existe en la base de datos`);
  }
};

export const checkproduct = async (id = "") => {
  const findId = await ProductSchema.findById(id);
  if (!findId) {
    throw new Error(`El producto ${id} no existe en la base de datos`);
  }
};

export const colecctionUpdate = async (colecction = "") => {
  const colecctions = ["user", "products"];
  if (!colecctions.includes(colecction)) {
    throw new Error(`La colección no es valida`);
  }
};
