/**
 * TextArea Component
 * Componente para input de texto multilínea
 */

import React, { useState } from 'react';

const TextArea = ({
  label,
  placeholder = '',
  value = '',
  onChange = () => {},
  error = '',
  required = false,
  rows = 4,
  maxLength = null,
  className = '',
  disabled = false,
  helper = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {/* TextArea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded-lg border-2 font-sans
          transition-all duration-200 resize-none
          placeholder:text-gray-400
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error
            ? 'border-error text-error focus:border-error focus:outline-none'
            : isFocused
            ? 'border-primary-500 focus:outline-none'
            : 'border-gray-300'
          }
        `}
      />

      {/* Helper Text or Error */}
      <div className="mt-2 flex justify-between items-start">
        <p className={`text-xs ${error ? 'text-error' : 'text-gray-500'}`}>
          {error || helper}
        </p>
        {maxLength && (
          <span className="text-xs text-gray-400">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextArea;
