import express from "express";
import { searchAll } from "../controllers/search.js";

const router = express.Router();

router.get("/search", searchAll);

export default router;
