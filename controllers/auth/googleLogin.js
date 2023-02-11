import { request, response } from "express";
import bcryptjs from "bcryptjs";
import userSchema from "../../models/userSchema.js";
import generateJwt from "../../utils/generateJwt.js";
import googleVerify from "../../utils/googleVerify.js";

const googleLogin = async (req = request, res = response) => {
  const { googleToken } = req.body;
  try {
    const googleUser = await googleVerify(googleToken);
    let findUser = await userSchema.findOne({ email: googleUser.email });

    if (!findUser) {
      const salt = bcryptjs.genSaltSync();
      const userCreate = await userSchema.create({
        ...googleUser,
        password: ":P",
        google: true,
      });
      userCreate.password = bcryptjs.hashSync(userCreate.password, salt);
      const data = await userCreate.save();
      const { password, condition, ...rest } = data;
      findUser = rest;
    } else {
      const { password, condition, ...rest } = findUser._doc;
      findUser = rest;
    }
    const token = await generateJwt(findUser._id, findUser.rol);
    res.status(200).json({
      ok: true,
      msg: "se recibio el token",
      user: findUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
export default googleLogin;
