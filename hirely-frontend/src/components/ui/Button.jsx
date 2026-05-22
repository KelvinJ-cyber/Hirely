import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) {
  const classes = [
    'tb-btn',
    `tb-btn--${variant}`,
    `tb-btn--${size}`,
    fullWidth ? 'tb-btn--full' : '',
    (disabled || loading) ? 'tb-btn--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="tb-btn-spinner" style={{ width: 16, height: 16 }} /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
