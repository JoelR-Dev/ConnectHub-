import postService from "../services/posts.js";
import { verifyToken } from "../verifyToken/middlewares.js";


export const create = async (req, res) => {
    try {
        const userId = req.user.id;
        const companyId = req.body.company_id || null;
        const text = req.body.content;

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const postId = await postService.createPost(
            userId,
            companyId,
            text,
            imageUrl
        );

        res.json({
            message: "Post creado exitosamente",
            postId,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al crear el post", details: err.message } );
    }
};
