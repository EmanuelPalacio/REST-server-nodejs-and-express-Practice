import { request, response } from "express";
import ProductSchema from "../../models/productShechema.js";

const findProduct = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const findProduct = await ProductSchema.findById(id).populate([
      "user",
      "category",
    ]);
    if (findProduct) {
      res.status(200).json({
        ok: true,
        product: findProduct,
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: `La categoria con ID: ${id} no existe`,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
export default findProduct;
