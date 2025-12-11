import pool from "../db/db.js";

async function createPost(userId, companyId, text, imageUrl) {
    const sql = `
        INSERT INTO posts (users_id, company_id, content, image_url)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
        userId,
        companyId,
        text,
        imageUrl
    ]);

    return result.insertId;
}

async function toggleLike(postId, userId) {

    const [existing] = await pool.query(
        "SELECT id FROM likes WHERE posts_id = ? AND users_id = ?",
        [postId, userId]
    );

    if (existing.length > 0) {
        await pool.query(
            "DELETE FROM likes WHERE posts_id = ? AND users_id = ?",
            [postId, userId]
        );

        return {
            liked: false,
            message: "Like removido"
        };
    }

    await pool.query(
        "INSERT INTO likes (posts_id, users_id) VALUES (?, ?)",
        [postId, userId]
    );

    return {
        liked: true,
        message: "Like agregado"
    };
}

export default {
    createPost,
    toggleLike
};
