import pool from "../db/db.js";

async function createPost(userId, companyId, text, imageUrl) {
    const sql = `
        INSERT INTO posts (users_id, posts_id, content, image_url)
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

export default {
    createPost
};
