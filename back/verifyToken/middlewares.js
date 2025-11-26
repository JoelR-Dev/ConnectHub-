import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ message: "No se proporcionó token" });
    }

    const token = header.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token inválido o ausente" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token no válido" });
    }
};

export default verifyToken;