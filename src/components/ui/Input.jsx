/**
 * Input Component
 * Input reutilizable con soporte para iconos
 */

import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder = '',
  error = null,
  icon = null,
  iconPosition = 'left',
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'w-full px-4 py-3 bg-surface-container-low text-on-surface rounded-lg border-2 border-transparent transition-all duration-300 focus:border-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const errorStyles = error ? 'border-error bg-error-container/10' : '';

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-on-surface">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-on-surface-variant">{icon}</span>
          </div>
        )}

        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseStyles} ${errorStyles} ${icon && iconPosition === 'left' ? 'pl-12' : ''} ${icon && iconPosition === 'right' ? 'pr-12' : ''} ${className}`}
          {...props}
        />

        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-on-surface-variant">{icon}</span>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-error font-medium">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
