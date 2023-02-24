import multer from "multer";

const configMulterStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { colecction } = req.params;
    cb(null, "uploads/" + colecction);
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
const configStorage = multer({ storage: configMulterStorage });

export default configStorage;
