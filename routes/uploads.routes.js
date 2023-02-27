import { Router } from "express";
import { param } from "express-validator";
import { colecctionUpdate } from "../utils/customCheck.js";
import { checkFile, validateToken } from "../middlewares/index.js";
import { checkValidator, verifyDestination } from "../middlewares/index.js";
import multerStorage from "../utils/multerStorage.js";
import {
  viewFile,
  upload,
  updateImage,
  updateCloudinary,
  uploadCloudinary,
} from "../controllers/uploads/index.js";

const uploadsRoutes = Router();
const configStorage = multerStorage();
const configStorageCloudinary = multerStorage(true);

uploadsRoutes.get(
  "/:colecction/:id",
  [
    param("id", "Tiene que ser un ID de mongo valida").isMongoId(),
    param("colecction").custom(colecctionUpdate),
    checkValidator,
  ],
  verifyDestination,
  viewFile
);

uploadsRoutes.post(
  "/singleFile",
  validateToken,
  verifyDestination,
  configStorage.single("file"),
  upload
);

uploadsRoutes.post(
  "/cloudinary/:colecction/:id",
  validateToken,
  [
    param("id", "Tiene que ser un ID de mongo valida").isMongoId(),
    param("colecction").custom(colecctionUpdate),
    checkValidator,
  ],
  configStorageCloudinary.single("file"),
  uploadCloudinary
);
uploadsRoutes.put(
  "/cloudinary/:colecction/:id",
  validateToken,
  [
    param("id", "Tiene que ser un ID de mongo valida").isMongoId(),
    param("colecction").custom(colecctionUpdate),
    checkValidator,
  ],
  configStorageCloudinary.single("file"),
  updateCloudinary
);

uploadsRoutes.put(
  "/:colecction/:id",
  validateToken,
  verifyDestination,
  configStorage.single("file"),
  checkFile,
  updateImage
);

export default uploadsRoutes;
