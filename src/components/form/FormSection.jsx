/**
 * FormSection Component
 * Componente para agrupar secciones del formulario PACI
 */

import React from 'react';
import { Card } from '../ui';

const FormSection = ({
  title,
  description,
  children,
  icon = null,
  variant = 'base',
}) => {
  return (
    <Card variant={variant}>
      {/* Header */}
      {(title || description) && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-start gap-3">
            {icon && (
              <span className="material-symbols-outlined text-primary text-2xl mt-1">
                {icon}
              </span>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-bold text-gray-900 font-headline">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-gray-600 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="space-y-4">
        {children}
      </div>
    </Card>
  );
};

export default FormSection;
