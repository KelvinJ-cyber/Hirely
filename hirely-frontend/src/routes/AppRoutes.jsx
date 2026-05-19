import { Routes, Route, Navigate } from 'react-router-dom';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Onboarding } from '../pages/Onboarding';
import { Dashboard } from '../pages/Dashboard';
import { CompanyProfile } from '../pages/CompanyProfile';
import { PublicCompanyProfile } from '../pages/PublicCompanyProfile';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={
        <ProtectedRoute><Onboarding /></ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      {/* Company routes */}
      <Route path="/Cdashboard" element={<Dashboard />} />
      <Route path="/company-profile" element={<CompanyProfile />} />
      <Route path="/post-job" element={<CompanyProfile />} />
      <Route path="/public/company/:userId" element={<PublicCompanyProfile />} />
      {/* Catch-all — must be LAST */}
      <Route path="*" element={<Navigate to="/company-profile" replace />} />
    </Routes>
  );
}
