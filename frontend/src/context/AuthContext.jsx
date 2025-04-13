import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode'; // ✅ FIXED HERE

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token); // ✅ FIXED HERE
      setUser(decoded);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token); // ✅ FIXED HERE
    setUser(decoded);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
