// This file contains the API service for handling authentication and user profile operations
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

// Auth Services are here.
export const authService = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  register: (userData) =>
    apiClient.post('/auth/register', userData),

  logout: () => {
    localStorage.removeItem('token');
  }
};

// User Profile Services are here.
export const userService = {
  getProfile: () =>
    apiClient.get('/users/profile'),

  updateProfile: (profileData) =>
    apiClient.put('/users/profile', profileData),

  getCurrentUser: () =>
    apiClient.get('/users/me')
};

export default apiClient;