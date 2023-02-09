import { request, response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config;

const validateToken = (req = request, res = response, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ error: "Token invalido" });
  }
  try {
    const { id, rol } = jwt.verify(token, process.env.SECRET_KEY_JWT);
    req.id = id;
    req.rol = rol;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "No se pudo procesar el token" });
  }
};

export default validateToken;
