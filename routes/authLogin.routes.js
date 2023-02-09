import { Router } from "express";
import login from "../controllers/auth/login.js";
import validateLogin from "../middlewares/validateLogin.js";

const authRoutes = Router();

authRoutes.get("/login", validateLogin, login);

export default authRoutes;
