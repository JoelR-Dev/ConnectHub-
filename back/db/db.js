//Conexion con la base de datos
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306
});

//Verificar la conexión correctamente
try {
  const connection = await pool.getConnection();
  console.log("✅ Conectado a MySQL correctamente");
  connection.release();
} catch (error) {
  console.error("❌ Error al conectar a MySQL:", error);
}

export default pool;
