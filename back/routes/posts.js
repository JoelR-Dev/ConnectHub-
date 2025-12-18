import express from "express";
import { verifyToken } from "../verifyToken/middlewares.js";
import { getFeed } from "../controllers/feed.js";

const router = express.Router();

router.get("/feed", verifyToken, getFeed);

export default router;
