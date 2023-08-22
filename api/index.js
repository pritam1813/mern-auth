import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.listen(3000, () => {
  console.log("App Running on Port 3000");
});

app.use("/api/user", userRoute);
