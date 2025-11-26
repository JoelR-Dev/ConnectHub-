import pool from "../db/db.js";
import bcrypt from "bcrypt";
import { getUserProfile } from "../services/auth.js";


export const registerUser = async (req, res) => {
  try {
    console.log("📩 Datos recibidos:", req.body);

    const { username, email, phone, address, role, password } = req.body;

    if (!username || !email || !password) {
      console.log("❌ Faltan campos obligatorios");
      return res.status(400).json({ error: "Username, email y password son obligatorios" });
    }

    console.log("🔒 Encriptando contraseña...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("🗄 Insertando en la base de datos...");
    const [result] = await pool.query(
      `INSERT INTO users (username, email, phone, address, role, password)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, email, phone, address, role, hashedPassword]
    );

    console.log("✅ Usuario registrado con ID:", result.insertId);
    res.status(201).json({
      message: "Usuario registrado correctamente",
      userId: result.insertId,
    });

  } catch (error) {
    console.error("💥 Error al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    const id = req.user.id;

    if (!id) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const user = await getUserProfile(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);

  } catch (error) {
    console.error("Error obteniendo perfil:", error);
    res.status(500).json({ message: "Error obteniendo el perfil" });
  }
};

export default { registerUser, profile };
