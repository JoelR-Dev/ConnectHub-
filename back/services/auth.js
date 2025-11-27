import pool from "../db/db.js";

export const getUserProfile = async (userId) => {
  const [rows] = await pool.query(
    "SELECT id, username, email, phone, address, role FROM users WHERE id = ?",
    [userId]
  );

  return rows[0];

  router.get("/profile", verifyToken, profile);
};




export default getUserProfile;
