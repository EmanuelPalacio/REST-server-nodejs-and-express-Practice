import { Router } from "express";
import authRoutes from "./authLogin.routes.js";
import userRoutes from "./user.routes.js";
import categoriesRoutes from "./categories.routes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/categories", categoriesRoutes);

export default router;
