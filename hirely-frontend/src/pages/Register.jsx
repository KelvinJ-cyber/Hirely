import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { RoleTab } from '../components/ui/RoleTab';
import { PasswordStrength } from '../components/PasswordStrength';
import { useAuth } from '../hooks/useAuth';
import { registerSchema, validateForm } from '../utils/validation';

export function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '', role: 'STUDENT',
  });
  const [errors, setErrors] = useState({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: '',
  });
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
    const validation = validateForm(registerSchema, formData);
    if (!validation.success) { setErrors(validation.errors); return; }
    const { confirmPassword, ...rest } = formData;
    const result = await register(rest);
    if (result.success) navigate('/onboarding');
    else setApiError(result.error);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join the platform connecting top-tier talent with world-class opportunities."
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        <RoleTab selected={formData.role} onChange={(role) => setFormData((p) => ({ ...p, role }))} />

        {apiError && (
          <div style={{ padding: 10, background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.15)', borderRadius: 10, fontSize: '0.8rem', color: '#DC2626', textAlign: 'center' }}>
            {apiError}
          </div>
        )}

        {/* 2-column: Full Name + Phone */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
          <Input id="register-fullname" label="Full Name" name="fullName" placeholder="John Doe"
            value={formData.fullName} onChange={handleChange} error={errors.fullName} />
          <Input id="register-phone" label="Phone Number" name="phone" type="tel"
            placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} error={errors.phone} />
        </div>

        <Input id="register-email" label="Work Email" name="email" type="email"
          placeholder="name@talentbridge.com" value={formData.email} onChange={handleChange} error={errors.email} />

        <div>
          <Input id="register-password" label="Password" name="password" type="password"
            placeholder="••••••••" value={formData.password} onChange={handleChange} error={errors.password} />
          <div style={{ marginTop: 8 }}>
            <PasswordStrength password={formData.password} />
          </div>
        </div>

        <Input id="register-confirm-password" label="Confirm Password" name="confirmPassword" type="password"
          placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

        <Button type="submit" variant="accent" size="lg" fullWidth loading={isLoading}
          rightIcon={<ArrowRight style={{ width: 16, height: 16 }} />}>
          Get Started
        </Button>

        <p style={{ fontSize: '0.7rem', textAlign: 'center', color: '#8C6E63', lineHeight: 1.5, margin: 0 }}>
          By creating an account, you agree to our{' '}
          <a href="#" style={{ color: '#D3A376', fontWeight: 500 }}>Terms of Service</a>
          {' '}and{' '}
          <a href="#" style={{ color: '#D3A376', fontWeight: 500 }}>Privacy Policy</a>.
        </p>
      </form>

      <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #F3F4F6', textAlign: 'center' }}>
        <p style={{ fontSize: '0.82rem', color: '#8C6E63', margin: 0 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#D3A376', fontWeight: 600, textDecoration: 'none' }}>
            Log in instead
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
