import express from "express";
import { auth, signin, signup } from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/", auth);
router.post("/signup", signup);
router.post("/login", signin);

export default router;
