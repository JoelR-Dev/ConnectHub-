// back/services/auth.js
import pool from "../db/db.js";

export const getUserProfile = async (userId) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, username, email, phone, address, role FROM users WHERE id = ?",
      [userId]
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Error en getUserProfile:", error);
    throw error;
  }
};

export default getUserProfile;
