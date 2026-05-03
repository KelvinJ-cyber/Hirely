import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Briefcase, LogOut } from 'lucide-react';

export function Dashboard() {
  const { user, role, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <span className="text-2xl font-bold text-primary tracking-tight">TalentBridge</span>
      </div>

      <div className="w-full max-w-md bg-surface-white rounded-2xl shadow-card p-8 text-center">
        <h1 className="text-2xl font-bold text-primary mb-2">Welcome{user?.fullName ? `, ${user.fullName}` : ''}!</h1>
        <p className="text-secondary mb-1">Role: <span className="font-medium text-primary">{role}</span></p>
        <p className="text-sm text-muted mb-6">Your dashboard is coming soon.</p>
        <Button variant="outline" onClick={logout} leftIcon={<LogOut className="w-4 h-4" />}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
