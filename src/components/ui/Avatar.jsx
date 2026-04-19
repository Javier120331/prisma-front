/**
 * Avatar Component
 * Avatar con iniciales para proteger datos sensibles
 */

import { createInitialAvatar } from '../../utils/privacyUtils';

const Avatar = ({
  name,
  size = 'md',
  className = '',
}) => {
  const { initials, color } = createInitialAvatar(name);

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full
        flex items-center justify-center
        font-bold text-white
        shadow-md
        ${className}
      `}
      style={{ backgroundColor: color }}
      title={`Iniciales: ${initials}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;
