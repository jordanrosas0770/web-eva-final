# 05-Autos: Sistema de Anuncios de Automóviles

Plataforma web para publicar, buscar y gestionar anuncios de automóviles. Inspiración: Chileautos.

## Stack Tecnológico

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de Datos:** SQLite3
- **Autenticación:** JWT + bcryptjs
- **CORS:** Habilitado para desarrollo

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** CSS/Tailwind (opcional)
- **HTTP Client:** Fetch API

## Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/rinostrozacl/web-eva-final.git
cd web-eva-final/proyectos/05-autos
```

### 2. Instalar dependencias del backend
```bash
cd server
npm install
```

### 3. Instalar dependencias del frontend
```bash
cd ../client
npm install
```

## Configuración

### Backend
1. Crear archivo `.env` en la carpeta `server/`
2. Copiar variables de `.env.example`
3. Cambiar `JWT_SECRET` a un valor seguro

```bash
cd server
cp .env.example .env
# Editar .env con tus valores
```

## Ejecución

### Opción 1: Usar script de inicio (recomendado)
```bash
# Linux/macOS
./start.sh

# Windows
start.bat
```

### Opción 2: Terminales Separadas
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

La aplicación se abrirá automáticamente en http://localhost:5173

**Usuarios de prueba:** 
- Registra uno nuevo o usa email: `test@test.com` / contraseña: `123456`

## Rutas API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login (retorna JWT)

### Anuncios (Públicas)
- `GET /api/anuncios` - Listado de anuncios
- `GET /api/anuncios/:id` - Detalle de anuncio
- `GET /api/anuncios/search?q=...&filter=...` - Buscar/Filtrar

### Anuncios (Privadas - requieren JWT)
- `POST /api/anuncios` - Crear anuncio
- `PUT /api/anuncios/:id` - Editar anuncio propio
- `DELETE /api/anuncios/:id` - Eliminar anuncio propio
- `PATCH /api/anuncios/:id/sold` - Marcar como vendido

## Estructura de Carpetas

```
05-autos/
├── server/
│   ├── src/
│   │   ├── models/          # Modelos de datos (User, Anuncio)
│   │   ├── routes/          # Rutas de API
│   │   ├── middleware/      # Middlewares (auth, etc)
│   │   ├── db.js            # Inicialización BD
│   │   └── server.js        # Punto de entrada
│   ├── data/                # Base de datos SQLite
│   ├── uploads/             # Archivos subidos
│   ├── package.json
│   └── .env
├── client/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas
│   │   ├── services/        # Servicios API
│   │   └── App.jsx
│   └── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Base de Datos

### Modelos Principales

**Usuario:**
- id (PK)
- email (UNIQUE)
- password (hash)
- nombre
- createdAt

**Anuncio:**
- id (PK)
- userId (FK -> Usuario)
- marca
- modelo
- año
- precio
- kilometraje
- estado (activo/vendido)
- descripción
- createdAt
- updatedAt

## Historias Implementadas

✅ MVP-GEN-01: Repositorio ejecutable
✅ MVP-GEN-02: Variables de entorno
✅ MVP-GEN-03: BD + Modelos
✅ MVP-GEN-04: Registro de usuario
✅ MVP-GEN-05: Login JWT
✅ MVP-GEN-06: Frontend integrado
⏳ MVP-GEN-07: Deploy público

✅ HU-01: Modelar anuncios
✅ HU-02: Publicar anuncio
✅ HU-03: Listado público
✅ HU-04: Detalle de anuncio
✅ HU-05: Filtrar anuncios
✅ HU-06: Editar anuncio propio
✅ HU-07: Marcar como vendido
✅ HU-08: Solo dueño edita

## Contribuidores

- [Tu Nombre/Grupo]

## Licencia

MIT
