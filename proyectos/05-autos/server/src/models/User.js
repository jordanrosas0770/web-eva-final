const { getAsync, allAsync, runAsync } = require('../db');
const bcrypt = require('bcryptjs');

class User {
  static async create(email, password, nombre) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await runAsync(
      `INSERT INTO usuarios (email, password, nombre) VALUES (?, ?, ?)`,
      [email, hashedPassword, nombre]
    );
    return this.findById(result.lastID);
  }

  static async findByEmail(email) {
    return getAsync('SELECT * FROM usuarios WHERE email = ?', [email]);
  }

  static async findById(id) {
    return getAsync('SELECT id, email, nombre, createdAt FROM usuarios WHERE id = ?', [id]);
  }

  static async verifyPassword(email, password) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    
    return { id: user.id, email: user.email, nombre: user.nombre };
  }
}

module.exports = User;
