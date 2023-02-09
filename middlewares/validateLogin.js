import { check, validationResult } from "express-validator";

const validateLogin = [
  check("email", "el campo email debe ser un email").isEmail(),
  check("password", "el campo password no debe estar vacio").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    return next();
  },
];
export default validateLogin;
