const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  static getToken() {
    return localStorage.getItem('token');
  }

  static setToken(token) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  static getAuthHeader() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Auth
  static async register(email, password, nombre) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, nombre })
    });
    const data = await res.json();
    if (data.token) this.setToken(data.token);
    if (!res.ok) throw new Error(data.error || 'Error en registro');
    return data;
  }

  static async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) this.setToken(data.token);
    if (!res.ok) throw new Error(data.error || 'Error en login');
    return data;
  }

  static logout() {
    this.setToken(null);
  }

  // Anuncios públicos
  static async getAnuncios(filtros = {}) {
    const params = new URLSearchParams();
    if (filtros.marca) params.append('marca', filtros.marca);
    if (filtros.modelo) params.append('modelo', filtros.modelo);
    if (filtros.año_min) params.append('año_min', filtros.año_min);
    if (filtros.año_max) params.append('año_max', filtros.año_max);
    if (filtros.precio_min) params.append('precio_min', filtros.precio_min);
    if (filtros.precio_max) params.append('precio_max', filtros.precio_max);

    const res = await fetch(`${API_URL}/anuncios?${params}`);
    if (!res.ok) throw new Error('Error al obtener anuncios');
    return res.json();
  }

  static async getAnuncio(id) {
    const res = await fetch(`${API_URL}/anuncios/${id}`);
    if (!res.ok) throw new Error('Anuncio no encontrado');
    return res.json();
  }

  // Anuncios privados (requieren token)
  static async createAnuncio(datos) {
    const res = await fetch(`${API_URL}/anuncios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader()
      },
      body: JSON.stringify(datos)
    });
    if (!res.ok) throw new Error('Error al crear anuncio');
    return res.json();
  }

  static async updateAnuncio(id, datos) {
    const res = await fetch(`${API_URL}/anuncios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader()
      },
      body: JSON.stringify(datos)
    });
    if (!res.ok) throw new Error('Error al actualizar anuncio');
    return res.json();
  }

  static async markAsSold(id) {
    const res = await fetch(`${API_URL}/anuncios/${id}/sold`, {
      method: 'PATCH',
      headers: this.getAuthHeader()
    });
    if (!res.ok) throw new Error('Error al marcar como vendido');
    return res.json();
  }

  static async deleteAnuncio(id) {
    const res = await fetch(`${API_URL}/anuncios/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeader()
    });
    if (!res.ok) throw new Error('Error al eliminar anuncio');
    return res.json();
  }

  static async getMyAnuncios() {
    const res = await fetch(`${API_URL}/anuncios/user/profile`, {
      headers: this.getAuthHeader()
    });
    if (!res.ok) throw new Error('Error al obtener mis anuncios');
    return res.json();
  }
}

export default ApiService;
