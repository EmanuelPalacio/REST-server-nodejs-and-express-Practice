import { Router } from "express";
import {
  userCreate,
  userUpdate,
  findUsers,
  deleteUser,
} from "../controllers/user/index.js";
import {
  validateCreateUser,
  validateUpdateUser,
  validateDeleteUser,
} from "../middlewares/index.js";

const userRoutes = Router();

userRoutes.get("/", findUsers);
userRoutes.post("/", validateCreateUser, userCreate);
userRoutes.put("/:id", validateUpdateUser, userUpdate);
userRoutes.delete("/:id", validateDeleteUser, deleteUser);

export default userRoutes;
