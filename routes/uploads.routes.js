import { Router } from "express";
import multer from "multer";

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
import upload from "../controllers/uploads/upload.js";

const uploadsRoutes = Router();

uploadsRoutes.post("/singleFile", uploadFile.single("file"), upload);

export default uploadsRoutes;
