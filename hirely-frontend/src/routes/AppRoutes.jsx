import { Routes, Route, Navigate } from 'react-router-dom';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Onboarding } from '../pages/Onboarding';
import { Dashboard } from '../pages/Dashboard';
import { StudentDashboard } from '../pages/StudentDashboard';
import { CompanyProfile } from '../pages/CompanyProfile';
import { PublicCompanyProfile } from '../pages/PublicCompanyProfile';
import { PostJob } from '../pages/PostJob';
import { ProtectedRoute } from './ProtectedRoute';
import { JobDetails } from '../pages/JobDetails';
import { FindJob } from '../pages/FindJob';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path ="/job/:jobId" element={
        <ProtectedRoute><JobDetails /></ProtectedRoute>
      } />
      <Route path="/findjobs" element={
        <ProtectedRoute><FindJob /></ProtectedRoute>
      } />
      <Route path="/onboarding" element={
        <ProtectedRoute><Onboarding /></ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute><StudentDashboard /></ProtectedRoute>
      } />
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
