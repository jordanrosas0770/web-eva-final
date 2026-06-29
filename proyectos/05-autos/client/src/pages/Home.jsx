import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

export default function Home({ onNavigate, user }) {
  const [anuncios, setAnuncios] = useState([]);
  const [filtros, setFiltros] = useState({ marca: '', modelo: '', año_min: '', año_max: '', precio_min: '', precio_max: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarAnuncios();
  }, []);

  const cargarAnuncios = async (f = filtros) => {
    setLoading(true);
    setError('');
    try {
      const limpiados = Object.fromEntries(Object.entries(f).filter(([_, v]) => v !== ''));
      const data = await ApiService.getAnuncios(limpiados);
      setAnuncios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    cargarAnuncios(filtros);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ background: '#f5f5f5', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>Buscar Automóviles</h2>
        <form onSubmit={handleBuscar} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <input type="text" name="marca" placeholder="Marca" value={filtros.marca} onChange={handleFiltroChange} style={{ padding: '0.5rem' }} />
          <input type="text" name="modelo" placeholder="Modelo" value={filtros.modelo} onChange={handleFiltroChange} style={{ padding: '0.5rem' }} />
          <input type="number" name="año_min" placeholder="Año mín" value={filtros.año_min} onChange={handleFiltroChange} style={{ padding: '0.5rem' }} />
          <input type="number" name="año_max" placeholder="Año máx" value={filtros.año_max} onChange={handleFiltroChange} style={{ padding: '0.5rem' }} />
          <input type="number" name="precio_min" placeholder="Precio mín" value={filtros.precio_min} onChange={handleFiltroChange} step="1000" style={{ padding: '0.5rem' }} />
          <input type="number" name="precio_max" placeholder="Precio máx" value={filtros.precio_max} onChange={handleFiltroChange} step="1000" style={{ padding: '0.5rem' }} />
          <button type="submit" disabled={loading} style={{ gridColumn: 'span 1', background: '#003366', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>❌ {error}</div>}

      <div>
        <h2>Anuncios Disponibles ({anuncios.length})</h2>
        {anuncios.length === 0 ? (
          <p>No hay anuncios disponibles</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {anuncios.map(anuncio => (
              <div key={anuncio.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', background: anuncio.estado === 'vendido' ? '#f0f0f0' : 'white' }}>
                <h3>{anuncio.marca} {anuncio.modelo}</h3>
                <p><strong>Año:</strong> {anuncio.año}</p>
                <p><strong>Precio:</strong> ${anuncio.precio.toLocaleString()}</p>
                <p><strong>Kilometraje:</strong> {anuncio.kilometraje.toLocaleString()} km</p>
                <p><strong>Estado:</strong> {anuncio.estado === 'vendido' ? '🔴 Vendido' : '🟢 Activo'}</p>
                {anuncio.descripcion && <p><strong>Descripción:</strong> {anuncio.descripcion}</p>}
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Vendedor: {anuncio.vendedor_nombre}</p>
                <button onClick={() => onNavigate('detail', anuncio.id)} style={{ background: '#0088cc', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                  Ver Detalles
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
