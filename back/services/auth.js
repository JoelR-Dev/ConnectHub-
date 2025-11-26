import express from "express";
import { registerUser, profile } from "../controllers/auth.js";
import { verifyToken } from "../verifyToken/middlewares.js";



export const getUserProfile = async (userId) => {
    
    const user = await pool.query(
      "SELECT id, username, email, phone, address, role FROM users WHERE id = ?",
      [userId]
    );  
    return user[0][0];
};

export default getUserProfile;