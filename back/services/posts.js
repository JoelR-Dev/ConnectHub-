import pool from "../db/db.js";

async function createPost(userId, companyId, content, imageUrl) {
    const sql = `
        INSERT INTO posts (users_id,company_id, content, image_url)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
        userId,
        companyId,
        content,
        imageUrl
    ]);

    return result.insertId;
}

export default {
    createPost
};
