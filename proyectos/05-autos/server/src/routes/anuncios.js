const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const Anuncio = require('../models/Anuncio');

// GET /api/anuncios - Listar todos (público)
router.get('/', async (req, res) => {
  try {
    const filtros = {
      marca: req.query.marca,
      modelo: req.query.modelo,
      año_min: req.query.año_min ? parseInt(req.query.año_min) : null,
      año_max: req.query.año_max ? parseInt(req.query.año_max) : null,
      precio_min: req.query.precio_min ? parseFloat(req.query.precio_min) : null,
      precio_max: req.query.precio_max ? parseFloat(req.query.precio_max) : null
    };

    // Limpiar valores null
    Object.keys(filtros).forEach(key => {
      if (filtros[key] === null || filtros[key] === undefined) {
        delete filtros[key];
      }
    });

    const anuncios = await Anuncio.findAll(filtros);
    res.json(anuncios);
  } catch (error) {
    console.error('Error listando anuncios:', error);
    res.status(500).json({ error: 'Error al listar anuncios' });
  }
});

// GET /api/anuncios/:id - Detalle (público)
router.get('/:id', async (req, res) => {
  try {
    const anuncio = await Anuncio.findById(req.params.id);
    if (!anuncio) {
      return res.status(404).json({ error: 'Anuncio no encontrado' });
    }
    res.json(anuncio);
  } catch (error) {
    console.error('Error obteniendo anuncio:', error);
    res.status(500).json({ error: 'Error al obtener anuncio' });
  }
});

// POST /api/anuncios - Crear (privado)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { marca, modelo, año, precio, kilometraje, descripcion } = req.body;

    if (!marca || !modelo || !año || !precio || kilometraje === undefined) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const anuncio = await Anuncio.create(
      req.user.id,
      marca,
      modelo,
      parseInt(año),
      parseFloat(precio),
      parseInt(kilometraje),
      descripcion || ''
    );

    res.status(201).json({
      message: 'Anuncio creado exitosamente',
      anuncio
    });
  } catch (error) {
    console.error('Error creando anuncio:', error);
    res.status(500).json({ error: 'Error al crear anuncio' });
  }
});

// PUT /api/anuncios/:id - Editar (solo propietario)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const anuncio = await Anuncio.update(req.params.id, req.user.id, req.body);
    res.json({
      message: 'Anuncio actualizado exitosamente',
      anuncio
    });
  } catch (error) {
    if (error.message === 'No autorizado') {
      return res.status(403).json({ error: 'No autorizado' });
    }
    console.error('Error actualizando anuncio:', error);
    res.status(500).json({ error: 'Error al actualizar anuncio' });
  }
});

// PATCH /api/anuncios/:id/sold - Marcar como vendido
router.patch('/:id/sold', verifyToken, async (req, res) => {
  try {
    const anuncio = await Anuncio.markAsSold(req.params.id, req.user.id);
    res.json({
      message: 'Anuncio marcado como vendido',
      anuncio
    });
  } catch (error) {
    if (error.message === 'No autorizado') {
      return res.status(403).json({ error: 'No autorizado' });
    }
    console.error('Error marcando como vendido:', error);
    res.status(500).json({ error: 'Error al marcar como vendido' });
  }
});

// DELETE /api/anuncios/:id - Eliminar (solo propietario)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Anuncio.delete(req.params.id, req.user.id);
    res.json({ message: 'Anuncio eliminado exitosamente' });
  } catch (error) {
    if (error.message === 'No autorizado') {
      return res.status(403).json({ error: 'No autorizado' });
    }
    console.error('Error eliminando anuncio:', error);
    res.status(500).json({ error: 'Error al eliminar anuncio' });
  }
});

// GET /api/anuncios/user/:userId - Mis anuncios (privado)
router.get('/user/profile', verifyToken, async (req, res) => {
  try {
    const anuncios = await Anuncio.findByUserId(req.user.id);
    res.json(anuncios);
  } catch (error) {
    console.error('Error obteniendo mis anuncios:', error);
    res.status(500).json({ error: 'Error al obtener anuncios' });
  }
});

module.exports = router;
