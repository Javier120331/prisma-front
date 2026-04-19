/**
 * Card Component
 * Card base reutilizable
 */

import React from 'react';

const Card = ({
  children,
  variant = 'base',
  className = '',
  ...props
}) => {
  const variantStyles = {
    base: 'bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/15',
    elevated: 'bg-surface-container-lowest rounded-xl p-6 shadow-lg shadow-stone-900/10',
    outlined: 'bg-surface rounded-xl p-6 border-2 border-outline-variant',
    flat: 'bg-surface-container-low rounded-xl p-6',
  };

  return (
    <div
      className={`${variantStyles[variant]} transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
