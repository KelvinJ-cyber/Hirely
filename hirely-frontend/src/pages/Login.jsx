import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { RoleTab } from '../components/ui/RoleTab';
import { useAuth } from '../hooks/useAuth';
import { loginSchema, validateForm } from '../utils/validation';

const roleLabels = { STUDENT: 'Student', COMPANY: 'Company', ADMIN: 'Admin' };

export function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '', role: 'STUDENT' });
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const validation = validateForm(loginSchema, formData);
    if (!validation.success) { setErrors(validation.errors); return; }

    const { email, password, role } = formData;
    const result = await login({ email, password, role });
    if (result.success) {
      navigate('/dashboard');
    } else {
      setApiError(result.error);
    }
  };

  return (
    <AuthLayout
      title={`${roleLabels[formData.role]} Login`}
      subtitle="Welcome back! Sign in to access your account."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <RoleTab selected={formData.role} onChange={(role) => setFormData((p) => ({ ...p, role }))} />

        {apiError && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-xl text-sm text-error text-center">
            {apiError}
          </div>
        )}

        <Input id="login-email" label="Email" name="email" type="email"
          placeholder="name@talentbridge.com" value={formData.email}
          onChange={handleChange} error={errors.email} />

        <Input id="login-password" label="Password" name="password" type="password"
          placeholder="••••••••" value={formData.password}
          onChange={handleChange} error={errors.password} />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={staySignedIn}
              onChange={(e) => setStaySignedIn(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300" />
            <span className="text-sm text-secondary">Stay signed in</span>
          </label>
          <a href="#" className="text-sm text-accent hover:underline font-medium">Forgot password?</a>
        </div>

        <Button type="submit" variant="accent" size="lg" fullWidth loading={isLoading}
          rightIcon={<LogIn className="w-4 h-4" />}>
          Sign In
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-surface-white text-muted">or continue with</span>
          </div>
        </div>

        {/* OAuth (UI only) */}
        <div className="grid grid-cols-2 gap-3">
          <button type="button"
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-primary cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button type="button"
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-primary cursor-pointer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-secondary">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-accent font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
