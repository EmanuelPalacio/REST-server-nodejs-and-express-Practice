import { request, response } from "express";
import CategoriesSchema from "../../models/categoriesSchema.js";

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const category = await CategoriesSchema.findByIdAndDelete(id);
    if (category) {
      res.status(200).json({
        ok: true,
        category,
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
export default deleteCategory;
