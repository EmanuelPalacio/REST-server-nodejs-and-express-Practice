import fs from "fs";
import { request, response } from "express";
import ProductSchema from "../../models/productShechema.js";
import UserSchema from "../../models/userSchema.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const updateImage = async (req = request, res = response) => {
  let model;
  const { id, colecction } = req.params;
  const { filename } = req.file;

  colecction === "user" && (model = UserSchema);
  colecction === "products" && (model = ProductSchema);

  try {
    const data = await model.findById(id);
    const pathUpload = path.join(
      __dirname,
      "../../uploads/" + colecction,
      data.image
    );
    if (fs.existsSync(pathUpload)) {
      fs.unlinkSync(path.join(pathUpload));
    }

    await model.findByIdAndUpdate(id, { image: filename });
    if (!model) {
      return res.status(404).json({
        ok: false,
        msg: "no existe el archivo que esta buscando",
      });
    }
    res.status(200).json({
      ok: false,
      msg: "imagen modificada con exito",
      img: req.file,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
export default updateImage;
