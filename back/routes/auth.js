import express from "express";
import { registerUser, loginUser, profile } from "../controllers/auth.js";
import { verifyToken } from "../verifyToken/middlewares.js";
import { loginUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);  // ← ESTA FALTA EN TU PROYECTO
router.get("/profile", verifyToken, profile);

export default router;
