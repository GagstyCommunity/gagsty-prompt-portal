
import React from 'react';

// Enhanced Card Component
export const EnhancedCard = ({ children, className = '', variant = 'default' }: {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass';
}) => {
  const baseClasses = 'rounded-2xl border transition-all duration-300 hover:transform hover:scale-[1.02]';
  const variantClasses = {
    default: 'bg-gray-900/50 border-gray-800 hover:border-gray-700',
    gradient: 'bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-500/30 hover:border-purple-400/50',
    glass: 'bg-white/5 backdrop-blur-lg border-white/10 hover:border-white/20'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

// Enhanced Button Component
export const EnhancedButton = ({ children, className = '', variant = 'primary', size = 'md', ...props }: {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  [key: string]: any;
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-6 text-xl'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg',
    secondary: 'bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white shadow-lg',
    outline: 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white',
    ghost: 'text-white hover:bg-white/10'
  };

  return (
    <button className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Enhanced Typography Components
export const EnhancedHeading = ({ children, level = 1, className = '' }: {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}) => {
  const baseClasses = 'font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent';
  const levelClasses = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl lg:text-5xl',
    3: 'text-2xl md:text-3xl lg:text-4xl',
    4: 'text-xl md:text-2xl lg:text-3xl'
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`${baseClasses} ${levelClasses[level]} ${className}`}>
      {children}
    </Tag>
  );
};

export default {
  EnhancedCard,
  EnhancedButton,
  EnhancedHeading
};
