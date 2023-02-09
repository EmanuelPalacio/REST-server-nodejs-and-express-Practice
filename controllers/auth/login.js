import { request, response } from "express";
import bcryptjs from "bcryptjs";
import userSchema from "../../models/userSchema.js";
import generateJwt from "../../utils/generateJwt.js";

const login = async (req = request, res = response) => {
  const body = req.body;
  try {
    const { _doc: userData } = await userSchema.findOne({
      email: body.email,
    });
    const { password, condition, ...user } = userData;
    const validatePassword = bcryptjs.compareSync(body.password, password);

    if (!user || !validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: `El usuario / contraseña no son correctos`,
      });
    }

    const token = await generateJwt(user._id, user.rol);
    res.status(200).json({
      ok: true,
      msg: "Ingreso correctamente",
      user: { ...user, token },
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al ingresar",
      error,
    });
  }
};
export default login;
