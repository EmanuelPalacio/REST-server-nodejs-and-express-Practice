import { Router } from "express";
import authRoutes from "./authLogin.routes.js";
import userRoutes from "./user.routes.js";
import categoriesRoutes from "./categories.routes.js";
import productRoutes from "./products.routes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", productRoutes);

export default router;
