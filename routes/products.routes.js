import { Router } from "express";
import { body, check } from "express-validator";
import {
  createProduct,
  listProducts,
  findProduct,
  updateProduct,
} from "../controllers/products/index.js";

import {
  validateToken,
  validateAdminRol,
  checkValidator,
} from "../middlewares/index.js";
import { checkCategory } from "../utils/customCheck.js";

const productRoutes = Router();

//rutas publicas
productRoutes.get("/", listProducts);
productRoutes.get("/:id", findProduct);
// rutas privadas - token valido
productRoutes.post(
  "/",
  validateToken,
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("category", "El id es obligatorio").notEmpty(),
    check("category", "Tiene que ser un id de mongo").isMongoId(),
    checkValidator,
  ],
  createProduct
);
productRoutes.put(
  "/:id",
  validateToken,
  [
    check("category", "Tiene que ser un id de mongo")
      .if(body("category").exists())
      .isMongoId(),
    check("category").if(body("category").exists()).custom(checkCategory),
    checkValidator,
  ],
  updateProduct
);
// rutas privadas - rol admin
productRoutes.delete("/:id", validateToken, validateAdminRol);

export default productRoutes;
