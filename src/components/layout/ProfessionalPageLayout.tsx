
import React from 'react';
import ProfessionalHeader from '../navigation/ProfessionalHeader';
import Footer from '../Footer';
import EnhancedParticleBackground from '../enhanced/EnhancedParticleBackground';

interface ProfessionalPageLayoutProps {
  children: React.ReactNode;
  showParticles?: boolean;
  className?: string;
}

const ProfessionalPageLayout = ({ children, showParticles = true, className = '' }: ProfessionalPageLayoutProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gagsty-deep via-purple-900/20 to-blue-900/20 text-gagsty-primary relative overflow-hidden ${className}`}>
      {/* Enhanced Particle Background */}
      {showParticles && (
        <EnhancedParticleBackground 
          density={80}
          colors={['#A084FF', '#00C6FB', '#16FF6F', '#FF61F6']}
          interactive={true}
        />
      )}
      
      {/* Professional Header */}
      <ProfessionalHeader />
      
      {/* Main Content */}
      <main className="relative z-10 pt-20 min-h-screen">
        <div className="bg-gradient-to-r from-purple-500/5 to-blue-500/5 backdrop-blur-sm">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default ProfessionalPageLayout;
