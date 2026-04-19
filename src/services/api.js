/**
 * API Service - Axios Instance
 * Configuración centralizada para todas las llamadas HTTP
 */

import axios from 'axios';
import storageUtils from '../utils/localStorage';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token en cada request
api.interceptors.request.use(
  (config) => {
    const token = storageUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si es 401 y no es un request de refresh, intentar refrescar token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = storageUtils.getRefreshToken();
        if (refreshToken) {
          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001'}/api/auth/refresh`,
            { refresh_token: refreshToken }
          );

          const { access_token } = response.data;
          storageUtils.saveToken(access_token);

          // Reintentar request original con nuevo token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Si falla el refresh, limpiar sesión
        storageUtils.clearSession();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
