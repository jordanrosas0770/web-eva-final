import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

export default function MyAds({ user, onNavigate, refresh }) {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarMisAnuncios();
  }, [refresh]);

  const cargarMisAnuncios = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await ApiService.getMyAnuncios();
      setAnuncios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Debes iniciar sesión para ver tus anuncios</p>
        <button onClick={() => onNavigate('login')} style={{ background: '#003366', color: 'white', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer', borderRadius: '4px' }}>
          Iniciar Sesión
        </button>
      </div>
    );
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Mis Anuncios</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>❌ {error}</div>}
      {anuncios.length === 0 ? (
        <div style={{ padding: '2rem', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
          <p>No tienes anuncios publicados</p>
          <button onClick={() => onNavigate('create')} style={{ background: '#28a745', color: 'white', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer', borderRadius: '4px', marginTop: '1rem' }}>
            + Crear Anuncio
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {anuncios.map(anuncio => (
            <div key={anuncio.id} style={{ border: '2px solid #ddd', borderRadius: '8px', padding: '1rem', background: anuncio.estado === 'vendido' ? '#f0f0f0' : '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>{anuncio.marca} {anuncio.modelo}</h3>
                <span style={{ background: anuncio.estado === 'vendido' ? '#dc3545' : '#28a745', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                  {anuncio.estado === 'vendido' ? 'Vendido' : 'Activo'}
                </span>
              </div>
              <p><strong>Año:</strong> {anuncio.año}</p>
              <p><strong>Precio:</strong> ${anuncio.precio.toLocaleString()}</p>
              <p><strong>Kilometraje:</strong> {anuncio.kilometraje.toLocaleString()} km</p>
              {anuncio.descripcion && <p><strong>Descripción:</strong> {anuncio.descripcion.substring(0, 100)}...</p>}
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => onNavigate('detail', anuncio.id)} style={{ flex: 1, background: '#0088cc', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
