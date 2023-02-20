import { request, response } from "express";

const validateAdminRol = (req = request, res = response, next) => {
  const { id } = req.params;
  const tokenID = req.id;
  console.log(id, tokenID);
  const rol = req.rol;
  if (rol !== "admin" && id !== tokenID) {
    return res.status(400).json({
      ok: false,
      msg: "Necesita ser administrador para realizar esta petición",
    });
  }
  next();
};
export default validateAdminRol;
