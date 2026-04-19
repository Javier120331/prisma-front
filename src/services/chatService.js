/**
 * Chat Service
 * Funciones para interactuar con la API de Chat (PRISMA Agents)
 */

import axios from 'axios';
import { CHAT_ENDPOINTS } from '../constants/api';

const chatApi = axios.create({
  baseURL: process.env.REACT_APP_CHAT_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const chatService = {
  /**
   * Start Chat Session - Inicia una sesión del flujo multi-agente
   */
  startSession: async (paciFile, materialFile, prompt = null, schoolId = 'colegio_demo') => {
    try {
      const formData = new FormData();
      formData.append('paci_file', paciFile);
      formData.append('material_file', materialFile);
      if (prompt) formData.append('prompt', prompt);
      formData.append('school_id', schoolId);

      const response = await chatApi.post(CHAT_ENDPOINTS.START, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión de chat');
    }
  },

  /**
   * Get Session State - Obtiene el estado actual de una sesión
   */
  getSessionState: async (sessionId) => {
    try {
      const response = await axios.get(CHAT_ENDPOINTS.STATE(sessionId));
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Sesión no encontrada');
      }
      throw new Error(error.response?.data?.message || 'Error al obtener estado de sesión');
    }
  },

  /**
   * Send HITL Decision - Envía la decisión del docente en checkpoint de revisión
   */
  sendHitlDecision: async (sessionId, approved, reason = null, agentToRetry = null) => {
    try {
      const response = await axios.post(CHAT_ENDPOINTS.HITL(sessionId), {
        approved,
        reason,
        agent_to_retry: agentToRetry,
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Sesión no encontrada');
      }
      if (error.response?.status === 409) {
        throw new Error('La sesión no está esperando una decisión');
      }
      throw new Error(error.response?.data?.message || 'Error al enviar decisión');
    }
  },

  /**
   * Download Result - Descarga el archivo generado
   */
  downloadResult: async (sessionId, filename = 'resultado.docx') => {
    try {
      const response = await axios.get(CHAT_ENDPOINTS.DOWNLOAD(sessionId), {
        responseType: 'blob',
      });

      // Crear un blob y descargar
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      return { success: true };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Sesión o archivo no encontrado');
      }
      throw new Error(error.response?.data?.message || 'Error al descargar resultado');
    }
  },

  /**
   * Health Check - Verifica que el servidor de chat esté disponible
   */
  healthCheck: async () => {
    try {
      const response = await axios.get(CHAT_ENDPOINTS.HEALTH);
      return response.data;
    } catch (error) {
      throw new Error('Servidor de chat no disponible');
    }
  },

  /**
   * Poll Session - Hace polling continuo del estado de la sesión
   * (útil para actualizaciones en tiempo real)
   */
  pollSession: async (sessionId, interval = 2000, timeout = null) => {
    return new Promise((resolve, reject) => {
      let isComplete = false;
      let startTime = Date.now();

      const poll = async () => {
        try {
          if (timeout && Date.now() - startTime > timeout) {
            reject(new Error('Timeout esperando resultado de sesión'));
            return;
          }

          const state = await chatService.getSessionState(sessionId);

          if (state.phase === 'completed' || state.phase === 'error') {
            isComplete = true;
            resolve(state);
            return;
          }

          if (!isComplete) {
            setTimeout(poll, interval);
          }
        } catch (error) {
          reject(error);
        }
      };

      poll();
    });
  },
};

export default chatService;
