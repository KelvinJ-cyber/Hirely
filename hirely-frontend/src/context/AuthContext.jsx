import { createContext, useState, useCallback } from 'react';
import { authService } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const saveUserData = useCallback(({ userId: uid, role: r, ...userData }) => {
    if (uid) { setUserId(String(uid)); localStorage.setItem('userId', String(uid)); }
    setRole(r);
    setUser(userData);
    localStorage.setItem('role', r);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const register = useCallback(async (formData) => {
    setIsLoading(true);
    try {
      const res = await authService.register(formData);
      const d = res.data;
      saveUserData({ userId: d.userId, role: d.roles || formData.roles, email: d.email, fullName: d.fullName });
      return { success: true, data: d };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Registration failed.' };
    } finally { setIsLoading(false); }
  }, [saveUserData]);

  const login = useCallback(async (formData) => {
    setIsLoading(true);
    try {
      const res = await authService.login(formData);
      const d = res.data;
      saveUserData({ userId: d.userId, role: d.roles || formData.role, email: d.email, fullName: d.fullName });
      return { success: true, data: d };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Login failed.' };
    } finally { setIsLoading(false); }
  }, [saveUserData]);

  const logout = useCallback(() => {
    setUserId(null); setRole(null); setUser(null);
    ['userId', 'role', 'user'].forEach((k) => localStorage.removeItem(k));
  }, []);

  return (
    <AuthContext.Provider value={{ userId, role, user, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
