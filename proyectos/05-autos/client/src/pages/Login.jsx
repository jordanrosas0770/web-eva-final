import React, { useState } from 'react';
import ApiService from '../services/api';

export default function Login({ onSuccess, onNavigate }) {
  const [form, setForm] = useState({ email: '', password: '' });
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
      const result = await ApiService.login(form.email, form.password);
      console.log('Login exitoso:', result);
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
      <h2>Iniciar Sesión</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>❌ {error}</div>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', background: '#003366', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>¿No tienes cuenta? <button onClick={() => onNavigate('register')} style={{ background: 'none', border: 'none', color: '#0088cc', cursor: 'pointer', textDecoration: 'underline' }}>Regístrate aquí</button></p>
    </div>
  );
}
