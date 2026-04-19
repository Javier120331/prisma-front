/**
 * Auth Service
 * Funciones para autenticación con la API
 * Fallback a mock en desarrollo si el backend no está disponible
 */

import api from './api';
import { AUTH_ENDPOINTS } from '../constants/api';
import mockAuthService from './mockAuthService';

const USE_MOCK = process.env.REACT_APP_USE_MOCK_AUTH === 'true' || process.env.NODE_ENV === 'development';

const authService = {
  /**
   * Login - Autentica el usuario con email y password
   * Intenta conectar al backend real, fallback a mock en desarrollo
   */
  login: async (email, password) => {
    try {
      // Intentar conectar al backend real
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { access_token, refresh_token, user } = response.data;

      return {
        user,
        tokens: {
          access_token,
          refresh_token,
        },
      };
    } catch (error) {
      // Si el backend no está disponible y estamos en desarrollo, usar mock
      if (USE_MOCK && error.code === 'ERR_NETWORK') {
        console.log('Backend no disponible, usando autenticación mock para desarrollo');
        return mockAuthService.mockLogin(email, password);
      }

      if (error.response?.status === 401) {
        throw new Error('Correo o contraseña incorrectos');
      }
      
      // Fallback a mock si estamos en desarrollo
      if (USE_MOCK) {
        console.log('Error en backend, usando mock auth...');
        return mockAuthService.mockLogin(email, password);
      }
      
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  },

  /**
   * Register - Crea un nuevo usuario
   * Intenta conectar al backend real, fallback a mock en desarrollo
   */
  register: async (email, password, nombre, rut) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.REGISTER, {
        email,
        password,
        nombre,
        rut,
      });

      const { access_token, refresh_token, user } = response.data;

      return {
        user,
        tokens: {
          access_token,
          refresh_token,
        },
      };
    } catch (error) {
      // Si el backend no está disponible y estamos en desarrollo, usar mock
      if (USE_MOCK && error.code === 'ERR_NETWORK') {
        return mockAuthService.mockRegister(email, password, nombre, rut);
      }

      if (error.response?.status === 409) {
        throw new Error('El correo ya está registrado');
      }
      
      // Fallback a mock si estamos en desarrollo
      if (USE_MOCK) {
        return mockAuthService.mockRegister(email, password, nombre, rut);
      }
      
      throw new Error(error.response?.data?.message || 'Error al registrarse');
    }
  },

  /**
   * Logout - Invalida la sesión en el servidor
   */
  logout: async () => {
    try {
      await api.post(AUTH_ENDPOINTS.LOGOUT);
      return { success: true };
    } catch (error) {
      // Aunque falle la llamada al servidor, limpiamos la sesión local
      console.warn('Error al cerrar sesión en el servidor:', error);
      return { success: true };
    }
  },

  /**
   * Refresh Token - Renueva el token de acceso
   */
  refreshToken: async (refreshToken) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.REFRESH, {
        refresh_token: refreshToken,
      });

      const { access_token, refresh_token: newRefreshToken } = response.data;

      return {
        access_token,
        refresh_token: newRefreshToken || refreshToken,
      };
    } catch (error) {
      throw new Error('No se pudo renovar la sesión');
    }
  },

  /**
   * Get Current User - Obtiene los datos del usuario autenticado
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get(AUTH_ENDPOINTS.ME);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener datos del usuario');
    }
  },

  /**
   * Update Profile - Actualiza datos del perfil del usuario
   */
  updateProfile: async (userData) => {
    try {
      const response = await api.patch(AUTH_ENDPOINTS.ME, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar perfil');
    }
  },
};

export default authService;
