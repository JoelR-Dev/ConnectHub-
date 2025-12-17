import express from "express";
import { verifyToken } from "../verifyToken/middlewares.js";
import {
    createComment,
    getComments
} from "../controllers/comments.js";

const router = express.Router();

router.post("/posts/:id/comments", verifyToken, createComment);
router.get("/posts/:id/comments", verifyToken, getComments);

export default router;
