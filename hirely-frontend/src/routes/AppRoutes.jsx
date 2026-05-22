import { Routes, Route, Navigate } from 'react-router-dom';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Onboarding } from '../pages/Onboarding';
import { Dashboard } from '../pages/Dashboard';
import { CompanyProfile } from '../pages/CompanyProfile';
import { PublicCompanyProfile } from '../pages/PublicCompanyProfile';
import { PostJob } from '../pages/PostJob';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={
        <ProtectedRoute><Onboarding /></ProtectedRoute>
      } />
      {/* Student dashboard */}
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      {/* Company routes */}
      <Route path="/Cdashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/company-profile" element={
        <ProtectedRoute><CompanyProfile /></ProtectedRoute>
      } />
      <Route path="/post-job" element={
        <ProtectedRoute><PostJob /></ProtectedRoute>
      } />
      <Route path="/public/company/:userId" element={<PublicCompanyProfile />} />
      {/* Catch-all — redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
