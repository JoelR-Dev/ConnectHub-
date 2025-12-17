import pool from "../db/db.js";

export const searchAll = async (req, res) => {
    try {
        const searchTerm = `%${req.query.q}%`;
        
        const [users] = await pool.query(
            "SELECT id, username, email FROM users WHERE username LIKE ?",
            [searchTerm]
        );

        const [posts] = await pool.query(
            "SELECT id, content, users_id, created_at FROM posts WHERE content LIKE ?",
            [searchTerm]
        );

        res.json({
            ok: true,
            results: {
                users,
                posts
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en la búsqueda", error: error.message });
    }
};
