import { request, response } from "express";
import ProductSchema from "../../models/productShechema.js";
import UserSchema from "../../models/userSchema.js";
import {
  uploadCloudinaryService,
  deleteCloudinaryService,
} from "../../service/ServiceCloudinary.js";

const uploadImage = async (req = request, res = response) => {
  let model;
  const { id, colecction } = req.params;
  const { path, originalname } = req.file;

  colecction === "user" && (model = UserSchema);
  colecction === "products" && (model = ProductSchema);

  try {
    const { url, public_id } = await uploadCloudinaryService(
      path,
      colecction,
      originalname
    );
    const { image_id } = await model.findByIdAndUpdate(id, {
      image: url,
      image_id: public_id,
      //si como agregue new : true, la respuesta es el archivo antes de que se actualice , asi puedo borrar lo que hay en la base de clodunary
    });
    await deleteCloudinaryService(image_id);
    res.status(200).json({
      ok: true,
      msg: "subida de archivo exitosa",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
export default uploadImage;
