import { request, response } from "express";
import ProductSchema from "../../models/productShechema.js";
import UserSchema from "../../models/userSchema.js";
import { uploadCloudinaryService } from "../../service/ServiceCloudinary.js";

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
    await model.findByIdAndUpdate(id, { image: url, image_id: public_id });
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
