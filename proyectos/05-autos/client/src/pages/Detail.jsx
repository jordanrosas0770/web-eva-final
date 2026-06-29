import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

export default function Detail({ id, onNavigate, user }) {
  const [anuncio, setAnuncio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    cargarAnuncio();
  }, [id]);

  const cargarAnuncio = async () => {
    try {
      const data = await ApiService.getAnuncio(id);
      setAnuncio(data);
      setEditForm(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const result = await ApiService.updateAnuncio(id, editForm);
      setAnuncio(result.anuncio);
      setEditing(false);
      alert('Anuncio actualizado');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleMarkSold = async () => {
    if (confirm('¿Marcar como vendido?')) {
      try {
        await ApiService.markAsSold(id);
        await cargarAnuncio();
        alert('Anuncio marcado como vendido');
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  const handleDelete = async () => {
    if (confirm('¿Eliminar anuncio?')) {
      try {
        await ApiService.deleteAnuncio(id);
        alert('Anuncio eliminado');
        onNavigate('home');
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</div>;
  if (error) return <div style={{ color: 'red', padding: '2rem' }}>Error: {error}</div>;
  if (!anuncio) return <div style={{ padding: '2rem' }}>Anuncio no encontrado</div>;

  const esOwner = user && user.id === anuncio.userId;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <button onClick={() => onNavigate('home')} style={{ marginBottom: '1rem', background: '#ccc', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>
        ← Volver
      </button>

      {editing && esOwner ? (
        <div>
          <h2>Editar Anuncio</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label>Marca:</label>
            <input type="text" name="marca" value={editForm.marca} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Modelo:</label>
            <input type="text" name="modelo" value={editForm.modelo} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Año:</label>
            <input type="number" name="año" value={editForm.año} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Precio:</label>
            <input type="number" name="precio" value={editForm.precio} onChange={handleEditChange} step="1000" style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Kilometraje:</label>
            <input type="number" name="kilometraje" value={editForm.kilometraje} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Descripción:</label>
            <textarea name="descripcion" value={editForm.descripcion} onChange={handleEditChange} rows="4" style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleSaveEdit} style={{ background: '#0088cc', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', marginRight: '0.5rem' }}>
            Guardar
          </button>
          <button onClick={() => setEditing(false)} style={{ background: '#ccc', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <h1>{anuncio.marca} {anuncio.modelo} ({anuncio.año})</h1>
          <p style={{ fontSize: '1.5rem', color: '#003366', fontWeight: 'bold' }}>
            ${anuncio.precio.toLocaleString()}
          </p>
          <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
            <p><strong>Kilometraje:</strong> {anuncio.kilometraje.toLocaleString()} km</p>
            <p><strong>Estado:</strong> {anuncio.estado === 'vendido' ? '🔴 Vendido' : '🟢 Activo'}</p>
            <p><strong>Vendedor:</strong> {anuncio.vendedor_nombre} ({anuncio.vendedor_email})</p>
          </div>
          {anuncio.descripcion && (
            <div style={{ marginBottom: '1rem' }}>
              <h3>Descripción</h3>
              <p>{anuncio.descripcion}</p>
            </div>
          )}
          <div style={{ marginTop: '2rem' }}>
            {esOwner ? (
              <>
                <button onClick={() => setEditing(true)} style={{ background: '#FFA500', color: 'white', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer', borderRadius: '4px', marginRight: '0.5rem' }}>
                  ✏️ Editar
                </button>
                {anuncio.estado !== 'vendido' && (
                  <button onClick={handleMarkSold} style={{ background: '#28a745', color: 'white', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer', borderRadius: '4px', marginRight: '0.5rem' }}>
                    ✓ Marcar como Vendido
                  </button>
                )}
                <button onClick={handleDelete} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer', borderRadius: '4px' }}>
                  🗑️ Eliminar
                </button>
              </>
            ) : (
              <div style={{ background: '#e7f3ff', padding: '1rem', borderRadius: '4px' }}>
                <p>📞 Para contactar al vendedor, regístrate o inicia sesión en la plataforma.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
