import React, { useState } from 'react';
import ApiService from '../services/api';

export default function CreateAd({ onNavigate, user, onRefresh }) {
  const [form, setForm] = useState({
    marca: '',
    modelo: '',
    año: new Date().getFullYear(),
    precio: '',
    kilometraje: '',
    descripcion: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await ApiService.createAnuncio({
        marca: form.marca,
        modelo: form.modelo,
        año: parseInt(form.año),
        precio: parseFloat(form.precio),
        kilometraje: parseInt(form.kilometraje),
        descripcion: form.descripcion
      });
      alert('✅ Anuncio publicado exitosamente');
      onRefresh?.();
      onNavigate('myads');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Debes iniciar sesión para crear un anuncio</p>
        <button onClick={() => onNavigate('login')} style={{ background: '#003366', color: 'white', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer', borderRadius: '4px' }}>
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Crear Nuevo Anuncio</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>❌ {error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Marca: *</label>
          <input type="text" name="marca" value={form.marca} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }} placeholder="Ej: Toyota, Ford, BMW" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Modelo: *</label>
          <input type="text" name="modelo" value={form.modelo} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }} placeholder="Ej: Corolla, Mustang, X5" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Año: *</label>
          <input type="number" name="año" value={form.año} onChange={handleChange} required min="1990" max={new Date().getFullYear()} style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Precio (en pesos): *</label>
          <input type="number" name="precio" value={form.precio} onChange={handleChange} required step="1000" min="0" style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }} placeholder="Ej: 5000000" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Kilometraje (km): *</label>
          <input type="number" name="kilometraje" value={form.kilometraje} onChange={handleChange} required min="0" style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }} placeholder="Ej: 50000" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Descripción:</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows="5" style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }} placeholder="Describe el estado del vehículo, características especiales, etc." />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
          {loading ? 'Publicando...' : '✓ Publicar Anuncio'}
        </button>
      </form>
    </div>
  );
}
