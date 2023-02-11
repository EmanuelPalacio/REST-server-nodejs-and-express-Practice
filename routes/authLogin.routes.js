import { Router } from "express";
import { login, googleLogin } from "../controllers/auth/index.js";
import { validateGoogleLogin, validateLogin } from "../middlewares/index.js";

const authRoutes = Router();

authRoutes.post("/login", validateLogin, login);
authRoutes.post("/googleLogin", validateGoogleLogin, googleLogin);

export default authRoutes;
