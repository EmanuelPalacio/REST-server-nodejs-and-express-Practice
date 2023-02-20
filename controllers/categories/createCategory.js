import { request, response } from "express";
import CategoriesSchema from "../../models/categoriesSchema.js";

const createCategory = async (req = request, res = response) => {
  const { name } = req.body;
  const id = req.id;
  const findCategory = await CategoriesSchema.findOne({ name });
  if (findCategory) {
    return res.status(400).json({
      ok: false,
      msg: "La categoria ya existe",
    });
  }
  const data = {
    name,
    user: id,
  };

  try {
    const category = await CategoriesSchema.create(data);
    await category.save();

    res.status(201).json({
      ok: true,
      msg: "categoria creada con exito",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};
export default createCategory;
