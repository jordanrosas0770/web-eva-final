import React, { useState } from 'react';
import ApiService from '../services/api';

export default function Register({ onSuccess, onNavigate }) {
  const [form, setForm] = useState({ email: '', password: '', nombre: '' });
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
      const result = await ApiService.register(form.email, form.password, form.nombre);
      console.log('Registro exitoso:', result);
      onSuccess(result.user);
      onNavigate('home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Registro</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>❌ {error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', background: '#0088cc', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>¿Ya tienes cuenta? <button onClick={() => onNavigate('login')} style={{ background: 'none', border: 'none', color: '#0088cc', cursor: 'pointer', textDecoration: 'underline' }}>Inicia sesión</button></p>
    </div>
  );
}
