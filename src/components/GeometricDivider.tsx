
import React from 'react';

interface GeometricDividerProps {
  variant?: 'neon' | 'scanline' | 'circuit' | 'pulse';
  className?: string;
}

const GeometricDivider: React.FC<GeometricDividerProps> = ({ variant = 'neon', className = '' }) => {
  if (variant === 'scanline') {
    return (
      <div className={`gagsty-divider-scanline ${className}`}>
        <div className="gagsty-scanline-animation" />
      </div>
    );
  }

  if (variant === 'circuit') {
    return (
      <div className={`gagsty-divider-circuit ${className}`}>
        <svg width="100%" height="60" viewBox="0 0 800 60" className="opacity-60">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A084FF" />
              <stop offset="50%" stopColor="#00C6FB" />
              <stop offset="100%" stopColor="#16FF6F" />
            </linearGradient>
          </defs>
          <path
            d="M0,30 L100,30 L120,10 L180,10 L200,30 L300,30 L320,50 L380,50 L400,30 L500,30 L520,10 L580,10 L600,30 L800,30"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            fill="none"
            className="gagsty-circuit-path"
          />
          <circle cx="120" cy="10" r="3" fill="#00C6FB" className="gagsty-circuit-node" />
          <circle cx="320" cy="50" r="3" fill="#16FF6F" className="gagsty-circuit-node" />
          <circle cx="520" cy="10" r="3" fill="#A084FF" className="gagsty-circuit-node" />
        </svg>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`gagsty-divider-pulse ${className}`}>
        <div className="gagsty-pulse-line" />
      </div>
    );
  }

  // Default neon variant
  return (
    <div className={`gagsty-divider-neon ${className}`} />
  );
};

export default GeometricDivider;
