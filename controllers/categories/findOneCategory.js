import { request, response } from "express";
import CategoriesSchema from "../../models/categoriesSchema.js";

const findOneCategory = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const findCategory = await CategoriesSchema.findById(id).populate("user");
    if (findCategory) {
      res.status(200).json({
        ok: true,
        category: findCategory,
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
export default findOneCategory;
