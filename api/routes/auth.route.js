import express from "express";
import { auth, signup } from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/", auth);
router.post("/signup", signup);

export default router;
