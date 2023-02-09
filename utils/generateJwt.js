import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateJwt = async (id, rol) => {
  const token = jwt.sign({ id, rol }, process.env.SECRET_KEY_JWT, {
    expiresIn: "24h",
  });
  return token;
};
export default generateJwt;
