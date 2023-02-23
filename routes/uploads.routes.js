import { Router } from "express";
import { param } from "express-validator";
import multer from "multer";
import updateImage from "../controllers/uploads/updateImage.js";
import upload from "../controllers/uploads/upload.js";
import checkValidator from "../middlewares/checkValidator.js";
import { colecctionUpdate } from "../utils/customCheck.js";
import { checkFile, validateToken } from "../middlewares/index.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
/* const fileFilter = (req, file, cb) => {
  // La función debe llamar a `cb` usando una variable del tipo boolean
  // para indicar si el archivo debería ser aceptado o no

  // Para rechazar el archivo es necesario pasar `false`, de la siguiente forma:
  cb(null, false);

  // Para aceptar el archivo es necesario pasar `true`, de la siguiente forma:
  cb(null, true);

  // Siempre puedes pasar un error en caso de que algo salga mal:
  cb(new Error("No tengo la menor idea!"));
}; */

const uploadFile = multer({ storage });
const uploadsRoutes = Router();

uploadsRoutes.post(
  "/singleFile",
  validateToken,
  uploadFile.single("file"),
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
  uploadFile.single("file"),
  checkFile,
  updateImage
);

export default uploadsRoutes;
