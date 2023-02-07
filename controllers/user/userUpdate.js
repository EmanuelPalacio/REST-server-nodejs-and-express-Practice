import { response, request } from "express";
import bcryptjs from "bcryptjs";
import userSchema from "../../models/userSchema.js";

const userUpdate = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, email, google, password, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    rest.password = bcryptjs.hashSync(password, salt);
  }
  try {
    const update = await userSchema.findByIdAndUpdate(id, rest, { new: true });
    res.status(201).json({
      ok: true,
      mgs: "usuario actualizado con exito",
      update,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
export default userUpdate;
