# 📱 ConnectHub — Red Social Temática

## Descripción del Proyecto

ConnectHub es una red social temática donde los usuarios pueden registrarse, iniciar sesión, crear publicaciones con texto e imagen, reaccionar, comentar, seguir a otros usuarios y explorar contenido mediante búsqueda.

## diseño
https://www.figma.com/make/c1XZ3UvtUFiZsRIYiauumX/User-Greeting?node-id=0-1&t=2PMgSVQAnKXWCiVA-1


## Tecnologías Utilizadas

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Base de datos: MySQL
- Autenticación: JWT

## Funcionalidades MVP

- Registro e inicio de sesión con seguridad (hash y JWT)
- Perfil de usuario (nombre, bio, avatar)
- Crear, editar y eliminar publicaciones (texto + imagen)
- Feed con publicaciones propias y de seguidos
- Likes y comentarios
- Seguir / dejar de seguir usuarios
- Búsqueda básica por usuario y texto

## 📦 Instalación y Ejecución

### 1. Clonar repositorio

```bash
git clone https://github.com/JoelR-Dev/ConnectHub-
cd CONNECTHUB-
```

### 2. Backend

```bash
cd back
npm install
cp .env.example .env
npm run dev
```

### 3. Frontend

```bash
cd front

```

## Estructura de Carpetas

```
connecthub/
 ├── backend/
 ├── frontend/
 └── README.md
```

## 📡 Endpoints Principales

- **POST /auth/register** — Registrar usuario
- **POST /auth/login** — Iniciar sesión
- **GET /posts** — Ver publicaciones del feed
- **POST /posts** — Crear publicación
- **POST /reactions/:postId** — Dar/Quitar like

## 🚀 Despliegue

El proyecto se desplegará usando Render / Railway / Heroku.

---

## 👥 Colaboradores

- Joel Restrepo (@JoelR19)
- Angel Matheus (@AngelMatheus)
- inuk852 (@inuk852)
- Jesús Franco (@JesusDv)
- Jorge Luis Barraza (@JLUISBARRAZA)
- Andres Montero (@MeliodasXDCreador)
- Olaciregui
- Ruben2208

---

## 📄 Licencia

Regáleme una salchipapa y ya 🍟
