import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function Input({
  label,
  type = 'text',
  error,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div>
      {label && (
        <label htmlFor={id} style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#3E2522', marginBottom: 6 }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {leftIcon && (
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          type={inputType}
          className={`tb-input ${error ? 'error' : ''} ${className}`}
          style={{
            paddingLeft: leftIcon ? 40 : 16,
            paddingRight: isPassword || rightIcon ? 40 : 16,
          }}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: 0 }}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
          </button>
        )}
        {!isPassword && rightIcon && (
          <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p style={{ fontSize: '0.8rem', color: '#DC2626', marginTop: 4 }}>{error}</p>}
    </div>
  );
}
