import { apiClient } from './api';
import { MOCK_USERS } from '../data/mockData';

const AUTH_STORAGE_KEY = 'c360_active_user';

export const authService = {
  /**
   * Log in user by role (in mock mode) or credentials (in API mode)
   */
  async login(roleKey = 'student', credentials = null) {
    try {
      if (credentials && import.meta.env.VITE_USE_REAL_BACKEND === 'true') {
        const response = await apiClient.post('/auth/login', credentials);
        if (response?.user) {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response.user));
          if (response.token) localStorage.setItem('c360_auth_token', response.token);
          return response.user;
        }
      }

      // Fallback to institutional mock profile
      const user = MOCK_USERS[roleKey.toLowerCase()] || MOCK_USERS.student;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return user;
    } catch (error) {
      console.warn('Auth fallback to mock user due to API status:', error.message);
      const user = MOCK_USERS[roleKey.toLowerCase()] || MOCK_USERS.student;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return user;
    }
  },

  getCurrentUser() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem('c360_auth_token');
  },
};
