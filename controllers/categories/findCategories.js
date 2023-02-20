import { response, request } from "express";
import CategoriesSchema from "../../models/categoriesSchema.js";

const findCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  try {
    const [total, categories] = await Promise.all([
      CategoriesSchema.count(),
      CategoriesSchema.find()
        .populate("user")
        .skip(Number(from))
        .limit(Number(limit)),
    ]);

    res.status(200).json({
      ok: true,
      total,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
export default findCategories;
