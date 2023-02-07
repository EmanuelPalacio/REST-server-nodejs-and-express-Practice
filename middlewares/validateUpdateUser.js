import { check, validationResult } from "express-validator";
import { checkId, checkRol } from "../utils/customCheck.js";

const validateUpdateUser = [
  check("id", "no es un id valido de mongo").isMongoId(),
  check("id").custom(checkId),
  check("rol").custom(checkRol),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ error: errors.array() });
    }
    return next();
  },
];
export default validateUpdateUser;
