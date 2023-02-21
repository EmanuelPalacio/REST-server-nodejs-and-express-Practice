import { Router } from "express";
import { check } from "express-validator";
import {
  createCategory,
  deleteCategory,
  findCategories,
  findOneCategory,
  updateCategory,
} from "../controllers/categories/index.js";

import {
  validateToken,
  validateAdminRol,
  checkValidator,
} from "../middlewares/index.js";

const categoriesRoutes = Router();

//rutas publicas
categoriesRoutes.get("/", findCategories);
categoriesRoutes.get("/:id", findOneCategory);
// rutas privadas - token valido
categoriesRoutes.post(
  "/",
  validateToken,
  [check("name", "El nombre es obligatorio").notEmpty(), checkValidator],
  createCategory
);
categoriesRoutes.put(
  "/:id",
  validateToken,
  [check("name", "El nombre es obligatorio").notEmpty(), checkValidator],
  updateCategory
);
// rutas privadas - rol admin
categoriesRoutes.delete(
  "/:id",
  validateToken,
  validateAdminRol,
  deleteCategory
);

export default categoriesRoutes;
