import { StudentDashboardLayout } from '../components/layout/StudentDashboardLayout';
import { FileText } from 'lucide-react';
import '../styles/student-dashboard.css';

export function StudentApplications() {
  return (
    <StudentDashboardLayout>
      <div className="empty-state" style={{ marginTop: '2rem' }}>
        <FileText size={48} style={{ color: '#D3A376', marginBottom: '1rem' }} />
        <h3 style={{ color: '#3E2522', margin: '0 0 4px' }}>My Applications</h3>
        <p style={{ color: '#8C6E63', fontSize: '0.88rem' }}>
          This feature is coming soon. You'll be able to track your job applications here.
        </p>
      </div>
    </StudentDashboardLayout>
  );
}
