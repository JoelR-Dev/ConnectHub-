import pool from "../db/db.js";

async function createComment(userId, postId, content) {
    const sql = `
        INSERT INTO comments (users_id, posts_id, content)
        VALUES (?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
        userId,
        postId,
        content
    ]);

    return result.insertId;
}

async function getCommentsByPost(postId) {
    const sql = `
        SELECT 
            c.id,
            c.content,
            c.created_at,
            u.id AS user_id,
            u.nombre AS user_name
        FROM comments c
        JOIN users u ON u.id = c.users_id
        WHERE c.posts_id = ?
        ORDER BY c.created_at DESC
    `;

    const [rows] = await pool.execute(sql, [postId]);
    return rows;
}

export default {
    createComment,
    getCommentsByPost
};
