import React from 'react';

export default function Header({ user, onLogout, onNavigate }) {
  return (
    <header style={{
      background: '#003366',
      color: 'white',
      padding: '1rem',
      marginBottom: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, cursor: 'pointer' }} onClick={() => onNavigate('home')}>
          🚗 Auto Anuncios
        </h1>
        <nav>
          <button onClick={() => onNavigate('home')} style={{ marginRight: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem' }}>
            Inicio
          </button>
          {user ? (
            <>
              <button onClick={() => onNavigate('create')} style={{ marginRight: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem' }}>
                Crear Anuncio
              </button>
              <button onClick={() => onNavigate('myads')} style={{ marginRight: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem' }}>
                Mis Anuncios
              </button>
              <span style={{ marginRight: '1rem' }}>Hola, {user.nombre}</span>
              <button onClick={onLogout} style={{ background: '#ff6b6b', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <button onClick={() => onNavigate('login')} style={{ marginRight: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem' }}>
                Iniciar Sesión
              </button>
              <button onClick={() => onNavigate('register')} style={{ background: '#0088cc', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>
                Registrarse
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
