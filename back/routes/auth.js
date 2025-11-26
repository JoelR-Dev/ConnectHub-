import express from "express";
import { registerUser, profile } from "../controllers/auth.js";
import { verifyToken } from "../verifyToken/middlewares.js";

const router = express.Router();
router.post("/register", registerUser);
router.get("/profile", verifyToken, profile);
export default router;