import { response, request } from "express";
import ProductSchema from "../../models/productShechema.js";

const listProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  try {
    const [total, products] = await Promise.all([
      ProductSchema.count(),
      ProductSchema.find()
        .populate(["user", "category"])
        .skip(Number(from))
        .limit(Number(limit)),
    ]);

    res.status(200).json({
      ok: true,
      total,
      products,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
export default listProducts;
