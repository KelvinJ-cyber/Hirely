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
    <div className="tb-input-group">
      {label && (
        <label htmlFor={id} className="tb-input-label">
          {label}
        </label>
      )}
      <div className="tb-input-wrapper">
        {leftIcon && (
          <div className="tb-input-icon tb-input-icon--left">
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          type={inputType}
          className={`tb-input ${error ? 'tb-input--error' : ''} ${className}`}
          style={{
            paddingLeft: leftIcon ? 42 : 16,
            paddingRight: isPassword || rightIcon ? 42 : 16,
          }}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="tb-input-toggle"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword
              ? <EyeOff style={{ width: 18, height: 18 }} />
              : <Eye style={{ width: 18, height: 18 }} />
            }
          </button>
        )}
        {!isPassword && rightIcon && (
          <div className="tb-input-icon tb-input-icon--right">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="tb-input-error">{error}</p>}
    </div>
  );
}
