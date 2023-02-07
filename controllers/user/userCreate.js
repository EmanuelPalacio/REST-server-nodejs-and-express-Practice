import { response, request } from "express";
import bcryptjs from "bcryptjs";
import userSchema from "../../models/userSchema.js";
const userCreate = async (req = request, res = response) => {
  const { name, email, password, rol } = req.body;

  const salt = bcryptjs.genSaltSync(10);
  try {
    const userCreate = await userSchema.create({ name, email, password, rol });
    userCreate.password = bcryptjs.hashSync(password, salt);

    await userCreate.save();
    res.status(201).json({
      ok: true,
      mgs: "usuario creado con exito",
      userCreate,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
export default userCreate;
