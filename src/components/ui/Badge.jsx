/**
 * Badge Component
 * Badge para tags/status
 */

import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  icon = null,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-surface-variant text-on-surface-variant border border-outline-variant/30',
    primary: 'bg-primary-container text-on-primary-container',
    success: 'bg-primary-fixed text-on-primary-fixed',
    warning: 'bg-secondary-fixed text-on-secondary-fixed',
    danger: 'bg-error-container text-on-error-container',
    info: 'bg-tertiary-fixed text-on-tertiary-fixed',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="material-symbols-outlined text-sm">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
