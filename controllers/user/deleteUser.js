import { request, response } from "express";
import userSchema from "../../models/userSchema.js";

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const user = await userSchema.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    res.status(200).json({
      ok: false,
      error,
    });
  }
};
export default deleteUser;
