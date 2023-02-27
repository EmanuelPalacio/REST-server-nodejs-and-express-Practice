import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.routes.js";
import { v2 as cloudinary } from "cloudinary";

/* ------ SERVER ------- */
const app = express();

dotenv.config();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.listen(process.env.PORT, () => {
  console.log("server iniciado");
});

/* ------ CLOUDINARY ------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETS,
});

/* ------ CONNECT MONGODB ATLAS ------- */
try {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGODB_CONNECTION);
  console.log("exito al conectar con mongo atlas");
} catch (error) {
  console.log(error);
}
