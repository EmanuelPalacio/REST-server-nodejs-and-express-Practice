import { request, response } from "express";
import categoriesSchema from "../../models/categoriesSchema.js";

const updateCategory = async (req = request, res = response) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const findCategory = await categoriesSchema.findById(id);
    if (findCategory) {
      const update = await categoriesSchema.findByIdAndUpdate(
        id,
        { name },
        //new en true , devuelve la colección actualizada
        { new: true }
      );
      return res.status(400).json({
        ok: true,
        msg: "Actualizado con exito",
        Category: update,
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
export default updateCategory;
