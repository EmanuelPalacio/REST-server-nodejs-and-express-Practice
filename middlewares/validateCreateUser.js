import { check, validationResult } from "express-validator";
import { checkEmail, checkRol } from "../utils/customCheck.js";

const validateCreateUser = [
  check("name", "el nombre debe existir").exists(),
  check("name", "el nombre no debe estar vacio").notEmpty(),
  check("name", "el nombre debe ser de tipo string").isString(),

  check("email", "el campo email debe existir").exists(),
  check("email", "el campo email no debe estar vacio").notEmpty(),
  check("email", "el campo email debe ser un email").isEmail(),
  check("email", "el email debe ser de tipo string").isString(),
  check("email").custom(checkEmail),

  check("rol").custom(checkRol),

  check("password", "el campo password debe existir").exists(),
  check("password", "el campo password no debe estar vacio").notEmpty(),
  check("password", "el campo password debe ser de tipo string").isString(),
  check(
    "password",
    "el campo password debe tener minimo 8 caracteres y contener al menos una mayuscula, una minuscula y un caracter especial."
  )
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ error: errors.array() });
    }
    return next();
  },
];
export default validateCreateUser;
