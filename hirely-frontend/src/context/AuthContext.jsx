import { createContext, useState, useCallback } from 'react';
import { authService } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!token;

  const saveAuth = useCallback(({ token: t, userId: uid, role: r, ...userData }) => {
    setToken(t);
    if (uid) { setUserId(String(uid)); localStorage.setItem('userId', String(uid)); }
    setRole(r);
    setUser(userData);
    localStorage.setItem('token', t);
    localStorage.setItem('role', r);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const register = useCallback(async (formData) => {
    setIsLoading(true);
    try {
      const res = await authService.register(formData);
      const d = res.data;
      saveAuth({ token: d.token, userId: d.userId, role: d.roles || formData.roles, email: d.email, fullName: d.fullName });
      return { success: true, data: d };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Registration failed.' };
    } finally { setIsLoading(false); }
  }, [saveAuth]);

  const login = useCallback(async (formData) => {
    setIsLoading(true);
    try {
      const res = await authService.login(formData);
      const d = res.data;
      saveAuth({ token: d.token, userId: d.userId, role: d.roles || formData.role, email: d.email, fullName: d.fullName });
      return { success: true, data: d };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Login failed.' };
    } finally { setIsLoading(false); }
  }, [saveAuth]);

  const logout = useCallback(() => {
    setToken(null); setUserId(null); setRole(null); setUser(null);
    ['token', 'userId', 'role', 'user'].forEach((k) => localStorage.removeItem(k));
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, role, user, isAuthenticated, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
