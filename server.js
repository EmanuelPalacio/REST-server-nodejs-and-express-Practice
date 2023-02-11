import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.routes.js";
dotenv.config();

/* ------ SERVER ------- */
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.listen(process.env.PORT, () => {
  console.log("server iniciado");
});

/* ------ CONNECT MONGODB ATLAS ------- */
try {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGODB_CONNECTION);
  console.log("exito al conectar con mongo atlas");
} catch (error) {
  console.log(error);
}
