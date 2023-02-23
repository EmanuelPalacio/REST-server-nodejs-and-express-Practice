import { request, response } from "express";

const checkFile = (req = request, res = response, next) => {
  const file = req.file;
  if (!file) {
    return res.status(404).json({
      ok: false,
      msg: "No se aceptan archivos vacios",
    });
  }
  next();
};
export default checkFile;
