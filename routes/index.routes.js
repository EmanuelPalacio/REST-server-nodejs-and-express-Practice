import { Router } from "express";
import authRoutes from "./authLogin.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

export default router;
