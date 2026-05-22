import { Briefcase } from 'lucide-react';

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="auth-page">
      {/* Animated background shapes */}
      <div className="auth-bg-shapes">
        <div className="auth-shape auth-shape-1" />
        <div className="auth-shape auth-shape-2" />
        <div className="auth-shape auth-shape-3" />
      </div>

      <div className="auth-container">
        {/* Logo */}
        <div className="auth-logo-group">
          <div className="auth-logo-icon">
            <Briefcase style={{ width: 20, height: 20, color: '#fff' }} />
          </div>
          <span className="auth-logo-text">TalentBridge</span>
        </div>

        {/* Heading */}
        {title && <h1 className="auth-title">{title}</h1>}
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}

        {/* Card */}
        <div className="auth-card">
          {children}
        </div>
      </div>
    </div>
  );
}
