import fs from "fs";
import { request, response } from "express";
import ProductSchema from "../../models/productShechema.js";
import UserSchema from "../../models/userSchema.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const viewFile = async (req = request, res = response) => {
  let model;
  const { id, colecction } = req.params;

  colecction === "user" && (model = UserSchema);
  colecction === "products" && (model = ProductSchema);

  try {
    const data = await model.findById(id);
    const pathFile = path.join(
      __dirname,
      "../../uploads",
      colecction,
      data.image
    );
    if (!data) {
      return res.status(404).json({
        ok: false,
        msg: `No se encontraron datos relacionados al ID: ${id}`,
      });
    }

    if (!fs.existsSync(pathFile)) {
      res.status(400).json({
        ok: false,
        msg: "No se encontro el archivo que esta buscando",
      });
    }
    res.sendFile(pathFile);
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
export default viewFile;
