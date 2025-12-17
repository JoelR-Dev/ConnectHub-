import pool from "../db/db.js";

async function toggleFollow(followerId, followedId) {

    // 1️⃣ Verificar si ya existe el follow
    const [existing] = await pool.query(
        "SELECT id FROM follows WHERE follower_id = ? AND followed_id = ?",
        [followerId, followedId]
    );

    // 2️⃣ Si existe → UNFOLLOW
    if (existing.length > 0) {
        await pool.query(
            "DELETE FROM follows WHERE follower_id = ? AND followed_id = ?",
            [followerId, followedId]
        );

        return {
            following: false,
            message: "Dejaste de seguir al usuario"
        };
    }

    // 3️⃣ Si no existe → FOLLOW
    await pool.query(
        "INSERT INTO follows (follower_id, followed_id) VALUES (?, ?)",
        [followerId, followedId]
    );

    return {
        following: true,
        message: "Ahora sigues al usuario"
        };
}

export default {
    toggleFollow
};
