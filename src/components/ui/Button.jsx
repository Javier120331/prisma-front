/**
 * Button Component
 * Botón reutilizable con múltiples variantes
 */

import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  className = '',
  ...props
}) => {
  // Variantes de color
  const variantStyles = {
    primary: 'bg-gradient-to-br from-primary to-primary-container text-on-primary hover:shadow-lg',
    secondary: 'bg-secondary text-on-secondary hover:bg-opacity-90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:bg-opacity-5',
    ghost: 'text-primary hover:bg-primary hover:bg-opacity-10',
    danger: 'bg-error text-on-error hover:shadow-lg',
  };

  // Tamaños
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseStyles = 'font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !loading && <span className="material-symbols-outlined text-lg">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
