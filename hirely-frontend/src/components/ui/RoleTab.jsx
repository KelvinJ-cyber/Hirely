import { GraduationCap, Building2, Shield } from 'lucide-react';

const roles = [
  { value: 'STUDENT', label: 'Student', icon: GraduationCap },
  { value: 'COMPANY', label: 'Company', icon: Building2 },
  { value: 'ADMIN', label: 'Admin', icon: Shield },
];

export function RoleTab({ selected, onChange }) {
  return (
    <div>
      <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#8C6E63', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
        Join as
      </span>
      <div style={{ display: 'flex', background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', padding: 4 }}>
        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = selected === role.value;
          return (
            <button
              key={role.value}
              type="button"
              onClick={() => onChange(role.value)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '10px 12px',
                borderRadius: 10,
                fontSize: '0.85rem',
                fontWeight: 500,
                border: isActive ? '1px solid rgba(211,163,118,0.35)' : '1px solid transparent',
                background: isActive ? 'rgba(211,163,118,0.12)' : 'transparent',
                color: isActive ? '#3E2522' : '#9CA3AF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon style={{ width: 16, height: 16 }} />
              {role.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
