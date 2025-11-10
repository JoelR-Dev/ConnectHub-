import express from "express";
import cors from "cors";
import pool from "./db/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config(); const app = express();
app.use(cors()); app.use(express.json());
app.use("/api", authRoutes); app.get("/health", async(req, res)=>{ try{ const [rows] = await pool.query("SELECT 1 + 1 AS result"); res.status(200).json({ message: "OK", db : rows[0]}) }catch(error){ console.error(error); res.status(500).json({ error: "DB connection failed", details: error.message }) } })
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{ console.log(`server is runnig on http://localhost:${PORT}`) })