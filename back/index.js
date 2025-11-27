import express from "express";
import cors from "cors";
import pool from "./db/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./verifyToken/middlewares.js";
import { getUserProfile } from "./services/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/health", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 + 1 AS result");
        res.status(200).json({ message: "OK", db: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "DB connection failed" });
    }
});

// Rutas reales
app.use("/api", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/profile", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const profileData = await getUserProfile(userId);
        res.json(profileData);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
});


export default app;
