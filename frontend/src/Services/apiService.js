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
  // LOGIN: Authenticate user with email and password
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  // REGISTER: Create new user account
  register: (userData) =>
    apiClient.post('/auth/register', userData),

  // PASSWORD CHANGE: Update user's password (NEW FUNCTION)
  changePassword: (oldPassword, newPassword) =>
    apiClient.put('/auth/change-password', { oldPassword, newPassword }),

  // LOGOUT: Clear token from localStorage
  logout: () => {
    localStorage.removeItem('token');
  }
};

// User Profile Services are here.
export const userService = {
  // GET FULL PROFILE: Fetch complete user profile with all fields
  getProfile: () =>
    apiClient.get('/users/profile'),

  // UPDATE PROFILE: Update user profile information
  updateProfile: (profileData) =>
    apiClient.put('/users/profile', profileData),

  // GET CURRENT USER: Fetch minimal user info (for navbar display)
  getCurrentUser: () =>
    apiClient.get('/users/me')
};

export default apiClient;