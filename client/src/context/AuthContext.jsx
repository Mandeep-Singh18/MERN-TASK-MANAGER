import { createContext, useState, useEffect } from 'react';
import API from '../api/axios.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await API.get('/auth/profile');
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  const register = async (userData) => {
    try {
      const res = await API.post('/auth/register', userData);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    setUser(res.data.user);
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
      setUser(null); 
      toast.info('Logged out successfully');
    } catch (err) {
      console.error('Logout error', err);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};