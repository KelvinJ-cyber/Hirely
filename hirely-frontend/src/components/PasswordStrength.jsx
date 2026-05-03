import { Circle, CheckCircle2 } from 'lucide-react';
import { passwordChecks } from '../utils/validation';

export function PasswordStrength({ password = '' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
      {passwordChecks.map((check) => {
        const passed = check.test(password);
        return (
          <div key={check.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {passed ? (
              <CheckCircle2 style={{ width: 14, height: 14, color: '#16A34A', flexShrink: 0 }} />
            ) : (
              <Circle style={{ width: 14, height: 14, color: '#9CA3AF', flexShrink: 0 }} />
            )}
            <span style={{ fontSize: '0.75rem', color: passed ? '#16A34A' : '#9CA3AF', transition: 'color 0.2s' }}>
              {check.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
