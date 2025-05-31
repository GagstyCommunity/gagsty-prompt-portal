
import React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldEnhancedProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  helpText?: string;
  className?: string;
}

const FormFieldEnhanced: React.FC<FormFieldEnhancedProps> = ({
  label,
  error,
  required,
  children,
  helpText,
  className
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {children}
        {error && (
          <div className="absolute -bottom-6 left-0 flex items-center text-red-400 text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
      </div>
      
      {helpText && !error && (
        <p className="text-xs text-gray-500 mt-1">{helpText}</p>
      )}
    </div>
  );
};

export default FormFieldEnhanced;
