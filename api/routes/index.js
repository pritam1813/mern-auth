import express from "express";
import userRoute from "./user.route.js";
import authRoute from "./auth.route.js";
const router = express.Router();

router.use("/api/user", userRoute);
router.use("/api/auth", authRoute);

export default router;
