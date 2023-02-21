import { request, response } from "express";
import ProductSchema from "../../models/productShechema.js";

const updateProduct = async (req = request, res = response) => {
  const { __V, user, _id, ...rest } = req.body;
  const { id } = req.params;

  try {
    const findProduct = await ProductSchema.findById(id);
    if (findProduct) {
      rest.user = req.id;
      const update = await ProductSchema.findByIdAndUpdate(
        id,
        rest,
        //new en true , devuelve la colección actualizada
        { new: true }
      );
      return res.status(400).json({
        ok: true,
        msg: "Actualizado con exito",
        product: update,
      });
    }
    res.status(404).json({
      ok: false,
      msg: "La categoria no existe",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
export default updateProduct;
