import { Loader2 } from 'lucide-react';

const variantStyles = {
  primary: { background: '#3E2522', color: '#fff' },
  secondary: { background: '#8C6E63', color: '#fff' },
  outline: { background: 'transparent', color: '#8C6E63', border: '2px solid #8C6E63' },
  danger: { background: '#DC2626', color: '#fff' },
  accent: { background: '#D3A376', color: '#fff' },
};

const sizeStyles = {
  sm: { padding: '6px 12px', fontSize: '0.8rem' },
  md: { padding: '10px 20px', fontSize: '0.85rem' },
  lg: { padding: '12px 24px', fontSize: '0.95rem' },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style: customStyle = {},
  ...props
}) {
  const vStyle = variantStyles[variant] || variantStyles.primary;
  const sStyle = sizeStyles[size] || sizeStyles.md;

  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontWeight: 600,
        borderRadius: 12,
        border: vStyle.border || 'none',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.5 : 1,
        transition: 'all 0.2s ease',
        boxShadow: variant === 'accent' || variant === 'primary' ? '0 2px 8px rgba(62,37,34,0.12)' : 'none',
        width: fullWidth ? '100%' : 'auto',
        ...vStyle,
        ...sStyle,
        ...customStyle,
      }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
