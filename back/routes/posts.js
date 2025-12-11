import express from "express";
import multer from "multer";
import { verifyToken } from "../verifyToken/middlewares.js";
import { create, likePost } from "../controllers/posts.js";

const router = express.Router();


const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (_, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.post("/create", verifyToken, upload.single("image"), create);


router.post("/:id/like", verifyToken, likePost);

export default router;
