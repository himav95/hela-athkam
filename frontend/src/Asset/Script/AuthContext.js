// src/Asset/Script/AuthContext.js
// GLOBAL USER STATE MANAGEMENT - Manages user authentication across the app
import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService, authService } from '../../Services/apiService';

// CREATE CONTEXT: For sharing user data globally
const AuthContext = createContext();

// CUSTOM HOOK: Easy access to auth context in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AUTH PROVIDER: Wraps the app to provide user state everywhere
export const AuthProvider = ({ children }) => {
  // STATE VARIABLES
  const [user, setUser] = useState(null);           // Current user data (name, email, role)
  const [loading, setLoading] = useState(true);     // Loading state for initial user fetch
  const [token, setToken] = useState(localStorage.getItem('token')); // JWT token

  // FETCH CURRENT USER: Get user data when app loads
  const fetchUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await userService.getCurrentUser();
      setUser(response.data.user); // Set user data (name, email, role)
    } catch (error) {
      console.error('Error fetching user:', error);
      // CLEAR INVALID TOKEN: If fetch fails, token might be expired
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // LOGIN FUNCTION: Authenticate user and store data
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const data = response.data;

      if (data.success) {
        // STORE TOKEN: Save to localStorage and state
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user); // Store user info (name, email, role)
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Network error. Please try again.'
      };
    }
  };

  // LOGOUT FUNCTION: Clear all user data
  const logout = () => {
    authService.logout(); // Clear from localStorage
    setToken(null);       // Clear from state
    setUser(null);        // Clear user data
  };

  // CHANGE PASSWORD FUNCTION: Update user password
  const changePassword = async (oldPassword, newPassword) => {
    try {
      const response = await authService.changePassword(oldPassword, newPassword);
      return response.data;
    } catch (error) {
      console.error('Password change error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Network error. Please try again.'
      };
    }
  };

  // UPDATE PROFILE FUNCTION: Update user profile and refresh state
  const updateProfile = async (profileData) => {
    try {
      const response = await userService.updateProfile(profileData);

      if (response.data.success) {
        setUser(response.data.user); // Update user state with new data
      }

      return response.data;
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Network error. Please try again.'
      };
    }
  };

  // FETCH USER ON MOUNT: Get user data when app starts or token changes
  useEffect(() => {
    fetchUser();
  }, [token]);

  // VALUES PROVIDED TO ALL COMPONENTS: What components can access
  const value = {
    // USER DATA
    user,                                    // Current user object {id, name, email, role}
    token,                                   // JWT token
    loading,                                 // Loading state

    // FUNCTIONS
    login,                                   // Login function
    logout,                                  // Logout function
    changePassword,                          // Change password function
    updateProfile,                           // Update profile function

    // COMPUTED VALUES
    isAuthenticated: !!user,                 // True if user is logged in
    isAdmin: user?.role === 'admin',         // True if user is admin
    isUser: user?.role === 'user',           // True if user is regular user
    userName: user?.name || 'User',          // User's name or fallback
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};