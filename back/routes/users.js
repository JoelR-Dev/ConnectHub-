import express from "express";
import { verifyToken } from "../verifyToken/middlewares.js";
import { toggleFollow } from "../controllers/users.js";

const router = express.Router();

router.post("/:id/follow", verifyToken, toggleFollow);

export default router;
