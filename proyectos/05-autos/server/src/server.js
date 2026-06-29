require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./db');

// Importar rutas
const authRoutes = require('./routes/auth');
const anunciosRoutes = require('./routes/anuncios');

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Middlewares
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/anuncios', anunciosRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'API funcionando ✅' });
});

// Iniciar servidor
async function startServer() {
  try {
    // Inicializar base de datos
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📡 CORS habilitado para: ${CORS_ORIGIN}`);
      console.log(`🔒 JWT_SECRET configurado`);
      console.log('\n--- Rutas Disponibles ---');
      console.log('POST   /api/auth/register');
      console.log('POST   /api/auth/login');
      console.log('GET    /api/anuncios');
      console.log('GET    /api/anuncios/:id');
      console.log('POST   /api/anuncios (requiere JWT)');
      console.log('PUT    /api/anuncios/:id (requiere JWT)');
      console.log('PATCH  /api/anuncios/:id/sold (requiere JWT)');
      console.log('DELETE /api/anuncios/:id (requiere JWT)');
      console.log('GET    /api/anuncios/user/profile (requiere JWT)');
      console.log('\n');
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
