import pool from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserProfile } from "../services/auth.js";

// REGISTRO
export const registerUser = async (req, res) => {
  try {
    const { username, email, phone, address, role, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email y password son obligatorios" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users (username, email, phone, address, role, password)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, email, phone, address, role, hashedPassword]
    );

    res.status(201).json({
      message: "Usuario registrado correctamente",
      userId: result.insertId,
    });

  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PERFIL (requiere verifyToken)
export const profile = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await getUserProfile(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo el perfil" });
  }
};

export default { registerUser, loginUser, profile };
