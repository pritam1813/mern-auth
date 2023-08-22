import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.use("/", routes);

app.listen(3000, () => {
  console.log("App Running on Port 3000");
});
