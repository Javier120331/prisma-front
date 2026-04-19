/**
 * API Endpoints & URLs
 * Configuración centralizada para todos los endpoints de la aplicación
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
const CHAT_API_URL = process.env.REACT_APP_CHAT_API_URL || 'http://localhost:8000';

export const AUTH_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  REFRESH: `${API_BASE_URL}/api/auth/refresh`,
  ME: `${API_BASE_URL}/api/auth/me`,
};

export const CHAT_ENDPOINTS = {
  START: `${CHAT_API_URL}/chat/start`,
  STATE: (sessionId) => `${CHAT_API_URL}/chat/${sessionId}/state`,
  HITL: (sessionId) => `${CHAT_API_URL}/chat/${sessionId}/hitl`,
  DOWNLOAD: (sessionId) => `${CHAT_API_URL}/chat/${sessionId}/download`,
  HEALTH: `${CHAT_API_URL}/health`,
};

export const API_URLS = {
  AUTH: AUTH_ENDPOINTS,
  CHAT: CHAT_ENDPOINTS,
};
