import { GraduationCap, Building2, Shield } from 'lucide-react';

const roles = [
  { value: 'STUDENT', label: 'Student', icon: GraduationCap },
  { value: 'COMPANY', label: 'Company', icon: Building2 },
  { value: 'ADMIN', label: 'Admin', icon: Shield },
];

export function RoleTab({ selected, onChange }) {
  return (
    <div className="role-tab-wrapper">
      <span className="role-tab-label">Sign in as</span>
      <div className="role-tab-bar">
        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = selected === role.value;
          return (
            <button
              key={role.value}
              type="button"
              onClick={() => onChange(role.value)}
              className={`role-tab-btn ${isActive ? 'role-tab-btn--active' : ''}`}
            >
              <Icon style={{ width: 15, height: 15 }} />
              {role.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
