import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('serveeasy_token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  // Validate token and restore session on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('serveeasy_token');
      if (storedToken) {
        try {
          const res = await authAPI.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          }
        } catch (error) {
          console.warn('Session verification failed, clearing stale token.');
          localStorage.removeItem('serveeasy_token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    if (res.success && res.token) {
      localStorage.setItem('serveeasy_token', res.token);
      setToken(res.token);
      setUser(res.user);
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      return res.user;
    }
    throw new Error(res.message || 'Login failed.');
  };

  const signup = async (userData) => {
    const res = await authAPI.signup(userData);
    if (res.success && res.token) {
      localStorage.setItem('serveeasy_token', res.token);
      setToken(res.token);
      setUser(res.user);
      showToast(`Welcome to ServeEasy, ${res.user.name}!`, 'success');
      return res.user;
    }
    throw new Error(res.message || 'Signup failed.');
  };

  const logout = () => {
    localStorage.removeItem('serveeasy_token');
    setToken(null);
    setUser(null);
    showToast('You have been logged out successfully.', 'info');
  };

  // Instant 1-click login for testing/demo
  const demoLogin = async (role = 'customer') => {
    const credentials =
      role === 'provider'
        ? { email: 'provider@serveeasy.in', password: 'password123' }
        : { email: 'customer@serveeasy.in', password: 'password123' };

    return await login(credentials.email, credentials.password);
  };

  const value = {
    user,
    token,
    role: user?.role || null,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    signup,
    logout,
    demoLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
