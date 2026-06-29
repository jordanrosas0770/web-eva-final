# Matriz de Verificación - Proyecto 05-Autos

Estado: **COMPLETADO** ✅

## MVP-GEN (Historias Generales)

| ID | Descripción | Estado | Verificación |
|----|-------------|--------|--------------|
| MVP-GEN-01 | Repositorio ejecutable con estructura client/ + API | ✅ **CUMPLE (2)** | El repositorio está en GitHub, tiene estructura client/server, README completo con instrucciones de instalación. Se puede clonar, instalar con npm install y ejecutar con npm run dev |
| MVP-GEN-02 | Variables de entorno documentadas (.env.example sin secretos) | ✅ **CUMPLE (2)** | .env.example en raíz del proyecto con todas las variables documentadas. Archivo .env generado automáticamente con valores seguros. No contiene secretos en el repo. |
| MVP-GEN-03 | Base de datos con ≥2 modelos | ✅ **CUMPLE (2)** | SQLite con tabla `usuarios` (User model) y tabla `anuncios` (Anuncio model). Migraciones automáticas en db.js. Relaciones definidas correctamente. |
| MVP-GEN-04 | Registro de usuario (web) | ✅ **CUMPLE (2)** | Pantalla de registro funcional. POST /api/auth/register implementado. Hash de contraseña con bcrypt. Redirección post-registro. |
| MVP-GEN-05 | Login con JWT (web) | ✅ **CUMPLE (2)** | Pantalla de login funcional. POST /api/auth/login retorna JWT. Token almacenado en localStorage. Middleware verifyToken protege rutas privadas. |
| MVP-GEN-06 | Frontend integrado al dominio | ✅ **CUMPLE (2)** | Frontend React conectado con backend. Todas las funcionalidades del dominio implementadas en UI. Autenticación y autorización funcionales. |
| MVP-GEN-07 | Deploy público | ⏳ **PARCIAL (1)** | Preparado para deploy (scripts, env variables, estructura correcta). No desplegado aún en producción. |

**Subtotal MVP-GEN:** 12/14 puntos

---

## HU - Historias de Dominio (Anuncios)

| ID | Descripción | Estado | Verificación |
|----|-------------|--------|--------------|
| HU-01 | Modelar anuncios (marca, modelo, año, precio, km, estado) | ✅ **CUMPLE (2)** | Modelo Anuncio.js con todos los campos requeridos: marca, modelo, año, precio, kilometraje, estado, descripción, timestamps. |
| HU-02 | Publicar anuncio | ✅ **CUMPLE (2)** | POST /api/anuncios implementado con validación. Pantalla "Crear Anuncio" funcional. Usuario autenticado puede publicar. |
| HU-03 | Listado público de anuncios | ✅ **CUMPLE (2)** | GET /api/anuncios retorna todos los anuncios activos. Pantalla de Inicio muestra listado. Paginación opcional implementada con filtros. |
| HU-04 | Detalle de anuncio | ✅ **CUMPLE (2)** | GET /api/anuncios/:id implementado. Pantalla de Detalle muestra información completa + datos del vendedor. |
| HU-05 | Filtrar anuncios | ✅ **CUMPLE (2)** | Búsqueda por marca, modelo, año, precio implementada. Filtros en formulario de búsqueda funcionales. Backend maneja todos los parámetros de filtrado. |
| HU-06 | Editar anuncio propio | ✅ **CUMPLE (2)** | PUT /api/anuncios/:id implementado con verificación de propiedad. Pantalla de edición en Detalle. Solo propietario puede editar. |
| HU-07 | Marcar como vendido | ✅ **CUMPLE (2)** | PATCH /api/anuncios/:id/sold implementado. Botón "Marcar como Vendido" disponible para propietario. Cambio de estado en BD y UI. |
| HU-08 | Solo el dueño edita | ✅ **CUMPLE (2)** | Middleware verifyToken + validación de userId en modelos. PUT/PATCH/DELETE lanzan 403 si no es propietario. UI oculta opciones de edición para no propietarios. |

**Subtotal HU-01 a HU-08:** 16/16 puntos

---

## HU - Historias Opcionales (Bonus)

| ID | Descripción | Estado | Puntos |
|----|-------------|--------|--------|
| HU-OPC-01 | Fotos en anuncio | ⏳ NO IMPLEMENTADO | 0 |
| HU-OPC-02 | Contactar vendedor | ⏳ NO IMPLEMENTADO | 0 |

**Subtotal Bonus:** 0/10 puntos

---

## Resumen de Evaluación

| Concepto | Valor |
|----------|-------|
| **Historias Generales (MVP-GEN)** | 12/14 (6 cumples + 1 parcial) |
| **Historias de Dominio (HU-01-08)** | 16/16 (todos cumplen) |
| **Nota Base (100 pts)** | 28/30 items = ~93 puntos |
| **Bonus Opcional** | 0/10 puntos |
| **Penalizaciones** | 0 pts (sin secretos, deploy preparado) |
| **Nota Final** | **~93/110 puntos** |

---

## Pasos de Verificación (para corrector)

### 1. Clonar y configurar
```bash
git clone [URL repositorio]
cd proyectos/05-autos
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 2. Instalar dependencias
```bash
cd server && npm install
cd ../client && npm install
```

### 3. Ejecutar
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

La aplicación se abrirá en http://localhost:5173

### 4. Pruebas sugeridas

**Registro:**
- Email: test@test.com
- Contraseña: 123456
- Nombre: Usuario Prueba

**Crear Anuncio:**
- Marca: Toyota | Modelo: Corolla | Año: 2022
- Precio: 12500000 | Km: 45000
- Descripción: (opcional)

**Verificar:**
- ✅ Anuncio aparece en inicio sin login
- ✅ Solo propietario puede editar/eliminar
- ✅ Búsqueda y filtros funcionan
- ✅ JWT persiste en localStorage
- ✅ Logout limpia sesión

---

## Archivos Importantes

- **Backend:** `server/src/server.js`, `server/src/models/`, `server/src/routes/`
- **Frontend:** `client/src/App.jsx`, `client/src/pages/`, `client/src/services/api.js`
- **BD:** `server/data/autos.db` (se crea automáticamente)
- **Documentación:** `README.md`, `.env.example`

---

**Fecha de verificación:** 29-06-2026
**Estado:** Listo para evaluación ✅
