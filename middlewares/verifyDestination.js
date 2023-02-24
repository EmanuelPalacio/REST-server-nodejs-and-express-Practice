import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const verifyDestination = (req, res, next) => {
  const { colecction } = req.params;
  const mkdir = path.join(__dirname, "../uploads/" + colecction);
  if (!fs.existsSync(mkdir)) {
    fs.mkdirSync(mkdir);
  }
  next();
};

export default verifyDestination;
