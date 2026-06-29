import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Detail from './pages/Detail';
import CreateAd from './pages/CreateAd';
import MyAds from './pages/MyAds';
import ApiService from './services/api';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [detailId, setDetailId] = useState(null);
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Verificar si hay token al cargar
    const token = ApiService.getToken();
    if (token) {
      // Intentar obtener datos del usuario desde localStorage o token
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleNavigate = (page, id = null) => {
    setCurrentPage(page);
    if (id) setDetailId(id);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    ApiService.logout();
    localStorage.removeItem('user');
    setCurrentPage('home');
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app">
      <Header user={user} onLogout={handleLogout} onNavigate={handleNavigate} />
      <main style={{ minHeight: 'calc(100vh - 100px)', paddingBottom: '2rem' }}>
        {currentPage === 'home' && <Home onNavigate={handleNavigate} user={user} />}
        {currentPage === 'login' && <Login onSuccess={handleLogin} onNavigate={handleNavigate} />}
        {currentPage === 'register' && <Register onSuccess={handleLogin} onNavigate={handleNavigate} />}
        {currentPage === 'detail' && detailId && <Detail id={detailId} onNavigate={handleNavigate} user={user} />}
        {currentPage === 'create' && <CreateAd onNavigate={handleNavigate} user={user} onRefresh={handleRefresh} />}
        {currentPage === 'myads' && <MyAds user={user} onNavigate={handleNavigate} refresh={refreshKey} />}
      </main>
      <footer style={{ background: '#f5f5f5', padding: '2rem', textAlign: 'center', marginTop: '2rem', borderTop: '1px solid #ddd' }}>
        <p>&copy; 2026 Sistema de Anuncios de Automóviles - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
