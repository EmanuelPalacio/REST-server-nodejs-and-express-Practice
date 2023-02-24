import { Router } from "express";
import { param } from "express-validator";
import { colecctionUpdate } from "../utils/customCheck.js";
import { checkFile, validateToken } from "../middlewares/index.js";
import { checkValidator, verifyDestination } from "../middlewares/index.js";
import configStorage from "../utils/multerStorage.js";
import { viewFile, upload, updateImage } from "../controllers/uploads/index.js";

const uploadsRoutes = Router();

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

uploadsRoutes.put(
  "/:colecction/:id",
  validateToken,
  [
    param("id", "Tiene que ser un ID de mongo valida").isMongoId(),
    param("colecction").custom(colecctionUpdate),
    checkValidator,
  ],
  verifyDestination,
  configStorage.single("file"),
  checkFile,
  updateImage
);

export default uploadsRoutes;
