// back/routes/auth.js
import express from "express"; import { registerUser } from "../controllers/auth.js";
import { loginUser } from "../controllers/auth.js";

const router = express.Router();
router.post("/register", registerUser);
router.post('/login', loginUser);

export default router;