import express from "express";
import { registerUser, loginUser, profile } from "../controllers/auth.js";
import { verifyToken } from "../verifyToken/middlewares.js";

const router = express.Router();

// Rutas reales
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, profile);

export default router;
