import express from "express";
import { registerUser, loginUser, profile } from "../controllers/auth.js";
import { verifyToken } from "../verifyToken/middlewares.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);   // ⬅️ ESTA ES LA NUEVA
router.get("/profile", verifyToken, profile);

export default router;
