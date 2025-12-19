import pool from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Funcion para registrar un nuevo usuario
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

    console.log("🗄️ Insertando en la base de datos...");
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


// Funcion para iniciar sesion

export const loginUser = async (req, res) => {
    try {
        console.log("📩 Datos recibidos para login:", req.body.email);

        const { email, password } = req.body;

        // 1, validacion de campos

        if( !email || !password){
            console.log("❌ Faltan campos obligatorios para login");
            return res.status(400).json({ error: "Email y password son obligatorios" });
        }

        // 2, Buscar el usuario en la base de datos
        console.log("🔍 Buscando usuario en la base de datos...");
        const [users] = await pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        )

        const user = users[0];

        // 3,  Verificar que el usuario existe

        if ( !user ) {
            console.log("❌ Usuario no encontrado");
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // 4, Verificar la contraseña
        console.log("🔒 Verificando contraseña...");
        const passwordMatch =  await bcrypt.compare(password, user.password);

        if ( !passwordMatch ) {
            console.log("❌ Contraseña incorrecta");
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // 5, Generar el token JWT por autenticacion exitosa

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign( payload, JWT_SECRET, { expiresIn: '1h' } );
        console.log("✅ Autenticación exitosa, token generado");

        res.status(200).json({
            message: "Login exitoso",
            token: token,
            userId: user.id,
            username: user.username,
            role: user.role
        })

    } catch (error) {
        console.error("💥 Error al iniciar sesión:", error);
    }
}