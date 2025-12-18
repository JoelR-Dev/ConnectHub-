import pool from "../db/db.js";

export const getFeedService = async (userId, limit, offset) => {
  const [rows] = await pool.query(
    `
    SELECT 
        p.id AS post_id,
        p.content,
        p.created_at,

        JSON_OBJECT(
            'id', u.id,
            'username', u.username,
            'avatar_url', u.avatar_url
        ) AS user,

        -- Imágenes
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', ip.id,
                    'url', ip.url,
                    'filename', ip.filename,
                    'description', ip.description
                )
            )
            FROM imag_posts ip
            WHERE ip.posts_id = p.id
        ) AS images,

        -- Likes
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', l.id,
                    'user_id', l.users_id,
                    'reaction', l.reaction,
                    'username', ul.username
                )
            )
            FROM likes l
            JOIN users ul ON ul.id = l.users_id
            WHERE l.posts_id = p.id
        ) AS likes,

        -- Comentarios
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', c.id,
                    'content', c.content,
                    'created_at', c.created_at,
                    'username', uc.username
                )
            )
            FROM comments c
            JOIN users uc ON uc.id = c.users_id
            WHERE c.posts_id = p.id
        ) AS comments

    FROM posts p
    JOIN users u ON u.id = p.users_id

    WHERE 
        p.users_id = ? OR
        p.users_id IN (
            SELECT followed_id FROM follows WHERE follower_id = ?
        )

    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?;
    `,
    [userId, userId, limit, offset]
  );

  return rows;
};
