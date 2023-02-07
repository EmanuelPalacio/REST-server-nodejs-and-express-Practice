import { response, request } from "express";
import userSchema from "../../models/userSchema.js";

const findUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  try {
    const [total, users] = await Promise.all([
      userSchema.count(),
      userSchema.find().skip(Number(from)).limit(Number(limit)),
    ]);

    res.status(200).json({
      ok: true,
      total,
      users,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
export default findUsers;
