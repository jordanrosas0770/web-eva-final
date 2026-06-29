const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DATABASE_URL || path.join(__dirname, '../data/autos.db');
const DATA_DIR = path.dirname(DB_PATH);

// Asegurar que existe la carpeta data/
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  }
  console.log('✅ Conectado a SQLite:', DB_PATH);
});

// Ejecutar promesa (helper)
const runAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

// Obtener un registro (promesa)
const getAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Obtener múltiples registros (promesa)
const allAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Inicializar tablas
async function initDatabase() {
  try {
    // Tabla de usuarios
    await runAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        nombre TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de anuncios
    await runAsync(`
      CREATE TABLE IF NOT EXISTS anuncios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        marca TEXT NOT NULL,
        modelo TEXT NOT NULL,
        año INTEGER NOT NULL,
        precio REAL NOT NULL,
        kilometraje INTEGER NOT NULL,
        estado TEXT DEFAULT 'activo',
        descripcion TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES usuarios(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Tablas inicializadas correctamente');
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    throw error;
  }
}

module.exports = {
  db,
  runAsync,
  getAsync,
  allAsync,
  initDatabase
};
