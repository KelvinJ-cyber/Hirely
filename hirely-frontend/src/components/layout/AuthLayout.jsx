import { Briefcase } from 'lucide-react';

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div style={{ minHeight: '100vh', background: '#FFE0B2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 1rem' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
        <div style={{ width: 36, height: 36, background: '#3E2522', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(62,37,34,0.2)' }}>
          <Briefcase style={{ width: 18, height: 18, color: '#fff' }} />
        </div>
        <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#3E2522', letterSpacing: '-0.02em' }}>TalentBridge</span>
      </div>

      {/* Heading */}
      {title && <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#3E2522', textAlign: 'center', margin: 0 }}>{title}</h1>}
      {subtitle && (
        <p style={{ fontSize: '0.8rem', color: '#8C6E63', textAlign: 'center', marginTop: 4, marginBottom: '1rem', maxWidth: 380, lineHeight: 1.4 }}>
          {subtitle}
        </p>
      )}

      {/* Card */}
      <div className="auth-card" style={{ padding: '1.75rem 2rem' }}>
        {children}
      </div>
    </div>
  );
}
