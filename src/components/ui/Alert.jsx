/**
 * Alert Component
 * Alerta para mensajes
 */

import React from 'react';

const Alert = ({
  children,
  variant = 'info',
  icon = null,
  onClose = null,
  className = '',
  ...props
}) => {
  const variantStyles = {
    info: 'bg-primary-fixed/10 border border-primary/30 text-on-primary-fixed',
    success: 'bg-primary-fixed/10 border border-primary/30 text-on-primary-fixed',
    warning: 'bg-secondary-fixed/10 border border-secondary/30 text-on-secondary-fixed',
    error: 'bg-error-container/50 border border-error/30 text-on-error-container',
  };

  const iconMap = {
    info: 'info',
    success: 'check_circle',
    warning: 'warning',
    error: 'error',
  };

  return (
    <div
      className={`p-4 rounded-lg flex gap-3 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {(icon || iconMap[variant]) && (
        <span className="material-symbols-outlined flex-shrink-0 mt-0.5">{icon || iconMap[variant]}</span>
      )}
      <div className="flex-1">
        {children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Cerrar alerta"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      )}
    </div>
  );
};

export default Alert;
