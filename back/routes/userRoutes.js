// userController.js (con comentarios de Swagger/JSDoc)

import pool from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

/**
 * @swagger
 * components:
 * securitySchemes:
 * bearerAuth:
 * type: http
 * scheme: bearer
 * bearerFormat: JWT
 * schemas:
 * NewUser:
 * type: object
 * required:
 * - username
 * - email
 * - password
 * properties:
 * username:
 * type: string
 * description: Nombre de usuario único.
 * example: juanperez
 * email:
 * type: string
 * format: email
 * description: Correo electrónico único del usuario.
 * example: juan.perez@example.com
 * phone:
 * type: string
 * description: Número de teléfono (opcional).
 * example: "+573001234567"
 * address:
 * type: string
 * description: Dirección del usuario (opcional).
 * example: Calle 10 # 5-20
 * role:
 * type: string
 * enum: [client, admin]
 * description: Rol del usuario en el sistema.
 * default: client
 * password:
 * type: string
 * format: password
 * description: Contraseña del usuario.
 * example: MiContraseñaSegura123
 * LoginCredentials:
 * type: object
 * required:
 * - email
 * - password
 * properties:
 * email:
 * type: string
 * format: email
 * example: juan.perez@example.com
 * password:
 * type: string
 * format: password
 * example: MiContraseñaSegura123
 * AuthResponse:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Login exitoso
 * token:
 * type: string
 * description: Token JWT para futuras peticiones.
 * userId:
 * type: integer
 * example: 15
 * username:
 * type: string
 * example: juanperez
 * role:
 * type: string
 * example: client
 */

// Funcion para registrar un nuevo usuario
/**
 * @swagger
 * /api/register:
 * post:
 * summary: Registrar un nuevo usuario en el sistema.
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/NewUser'
 * responses:
 * 201:
 * description: Usuario registrado correctamente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Usuario registrado correctamente
 * userId:
 * type: integer
 * example: 15
 * 400:
 * description: Campos obligatorios faltantes (username, email o password).
 * 500:
 * description: Error interno del servidor (ej. error de base de datos o email duplicado).
 */
export const registerUser = async (req, res) => {
    // ... Tu lógica actual de registerUser ...
};


// Funcion para iniciar sesion
/**
 * @swagger
 * /api/login:
 * post:
 * summary: Iniciar sesión y obtener un token de autenticación.
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/LoginCredentials'
 * responses:
 * 200:
 * description: Inicio de sesión exitoso, devuelve el token JWT y los datos del usuario.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/AuthResponse'
 * 400:
 * description: Email o password son obligatorios.
 * 401:
 * description: Contraseña incorrecta.
 * 404:
 * description: Usuario no encontrado.
 * 500:
 * description: Error interno del servidor.
 */
export const loginUser = async (req, res) => {
    // ... Tu lógica actual de loginUser ...
};