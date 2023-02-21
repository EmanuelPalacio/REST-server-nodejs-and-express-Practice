import { request, response } from "express";
import ProductSchema from "../../models/productShechema.js";

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const product = await ProductSchema.findByIdAndDelete(id);
    if (product) {
      res.status(200).json({
        ok: true,
        product,
      });
    } else {
      res.status(404).json({
        ok: true,
        msg: `La categoria con ID: ${id} no existe o ya fue eliminada`,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
export default deleteProduct;
