import { request, response } from "express";
import ProductSchema from "../../models/productShechema.js";

const createProduct = async (req = request, res = response) => {
  const body = req.body;
  const id = req.id;
  const findProduct = await ProductSchema.findOne({ name: body.name });
  if (findProduct) {
    return res.status(400).json({
      ok: false,
      msg: "El producto ya existe",
    });
  }
  const data = {
    ...body,
    user: id,
  };

  try {
    const category = await ProductSchema.create(data);
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
export default createProduct;
