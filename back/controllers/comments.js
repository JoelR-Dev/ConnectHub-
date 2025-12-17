import commentService from "../services/comments.js";

/**
 * POST /posts/:id/comments
 */
export const createComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = req.params.id;
        const { content } = req.body;

        if (!content || content.trim() === "") {
            return res.status(400).json({
                message: "El comentario no puede estar vacío"
            });
        }

        const commentId = await commentService.createComment(
            userId,
            postId,
            content
        );

        res.json({
            message: "Comentario creado correctamente",
            commentId
        });

    } catch (error) {
        console.error("Error en createComment:", error);
        res.status(500).json({
            message: "Error al crear el comentario"
        });
    }
};

/**
 * GET /posts/:id/comments
 */
export const getComments = async (req, res) => {
    try {
        const postId = req.params.id;

        const comments = await commentService.getCommentsByPost(postId);

        res.json(comments);

    } catch (error) {
        console.error("Error en getComments:", error);
        res.status(500).json({
            message: "Error al obtener los comentarios"
        });
    }
};
