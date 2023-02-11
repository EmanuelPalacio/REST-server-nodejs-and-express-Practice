import { check, validationResult } from "express-validator";

const validateGoogleLogin = [
  check("googleToken", "No se encontro token de google").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    return next();
  },
];
export default validateGoogleLogin;
