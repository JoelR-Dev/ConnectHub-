import express from "express";
import cors from "cors";
import pool from "./db/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./verifyToken/middlewares.js"; 
import postsRoutes from "./routes/posts.js";




dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 + 1 AS result");
        res.status(200).json({ message: "OK", db: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "DB connection failed", details: error.message });
    }
});

app.get("/profile", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await pool.query("SELECT id, nombre, email FROM usuarios WHERE id = ?", [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(rows[0]);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error obteniendo el perfil" });
    }
});

app.use("/api", authRoutes);

app.use("/posts", postsRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});

export default app;
