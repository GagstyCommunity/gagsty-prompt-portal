
import React from 'react';
import UnifiedHeader from '../navigation/UnifiedHeader';
import Footer from '../Footer';
import EnhancedParticleBackground from '../enhanced/EnhancedParticleBackground';

interface PageLayoutProps {
  children: React.ReactNode;
  showParticles?: boolean;
  className?: string;
}

const PageLayout = ({ children, showParticles = true, className = '' }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen bg-gagsty-deep text-gagsty-primary relative overflow-hidden ${className}`}>
      {/* Enhanced Particle Background */}
      {showParticles && (
        <EnhancedParticleBackground 
          density={60}
          colors={['#A084FF', '#00C6FB', '#16FF6F', '#FF61F6']}
          interactive={true}
        />
      )}
      
      {/* Unified Header */}
      <UnifiedHeader />
      
      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {children}
      </main>
      
      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
