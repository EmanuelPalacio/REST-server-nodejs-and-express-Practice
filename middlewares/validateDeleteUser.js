import { check, validationResult } from "express-validator";
import { checkId } from "../utils/customCheck.js";

const validateDeleteUser = [
  check("id", "no es un id valido de mongo").isMongoId(),
  check("id").custom(checkId),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ error: errors.array() });
    }
    return next();
  },
];
export default validateDeleteUser;
