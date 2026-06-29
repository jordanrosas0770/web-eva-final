const { getAsync, allAsync, runAsync } = require('../db');

class Anuncio {
  static async create(userId, marca, modelo, año, precio, kilometraje, descripcion = '') {
    const result = await runAsync(
      `INSERT INTO anuncios (userId, marca, modelo, año, precio, kilometraje, descripcion, estado) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'activo')`,
      [userId, marca, modelo, año, precio, kilometraje, descripcion]
    );
    return this.findById(result.lastID);
  }

  static async findById(id) {
    return getAsync(
      `SELECT a.*, u.nombre as vendedor_nombre, u.email as vendedor_email 
       FROM anuncios a 
       LEFT JOIN usuarios u ON a.userId = u.id 
       WHERE a.id = ?`,
      [id]
    );
  }

  static async findAll(filtros = {}) {
    let query = `SELECT a.*, u.nombre as vendedor_nombre FROM anuncios a 
                 LEFT JOIN usuarios u ON a.userId = u.id 
                 WHERE a.estado = 'activo'`;
    let params = [];

    if (filtros.marca) {
      query += ` AND LOWER(a.marca) LIKE ?`;
      params.push(`%${filtros.marca.toLowerCase()}%`);
    }

    if (filtros.modelo) {
      query += ` AND LOWER(a.modelo) LIKE ?`;
      params.push(`%${filtros.modelo.toLowerCase()}%`);
    }

    if (filtros.año_min) {
      query += ` AND a.año >= ?`;
      params.push(filtros.año_min);
    }

    if (filtros.año_max) {
      query += ` AND a.año <= ?`;
      params.push(filtros.año_max);
    }

    if (filtros.precio_min) {
      query += ` AND a.precio >= ?`;
      params.push(filtros.precio_min);
    }

    if (filtros.precio_max) {
      query += ` AND a.precio <= ?`;
      params.push(filtros.precio_max);
    }

    query += ` ORDER BY a.createdAt DESC`;

    return allAsync(query, params);
  }

  static async findByUserId(userId) {
    return allAsync(
      `SELECT * FROM anuncios WHERE userId = ? ORDER BY createdAt DESC`,
      [userId]
    );
  }

  static async update(id, userId, datos) {
    // Verificar que el usuario es propietario
    const anuncio = await this.findById(id);
    if (!anuncio || anuncio.userId !== userId) {
      throw new Error('No autorizado');
    }

    const campos = [];
    const valores = [];

    for (const [key, value] of Object.entries(datos)) {
      if (['marca', 'modelo', 'año', 'precio', 'kilometraje', 'descripcion', 'estado'].includes(key)) {
        campos.push(`${key} = ?`);
        valores.push(value);
      }
    }

    if (campos.length === 0) return anuncio;

    campos.push('updatedAt = CURRENT_TIMESTAMP');
    valores.push(id);

    await runAsync(
      `UPDATE anuncios SET ${campos.join(', ')} WHERE id = ?`,
      valores
    );

    return this.findById(id);
  }

  static async markAsSold(id, userId) {
    return this.update(id, userId, { estado: 'vendido' });
  }

  static async delete(id, userId) {
    const anuncio = await this.findById(id);
    if (!anuncio || anuncio.userId !== userId) {
      throw new Error('No autorizado');
    }

    await runAsync('DELETE FROM anuncios WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Anuncio;
