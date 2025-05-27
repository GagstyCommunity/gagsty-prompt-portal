
import React from 'react';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Hero from '../components/Hero';
import SimpleDemo from '../components/SimpleDemo';
import CreatorWorkshop from '../components/CreatorWorkshop';
import MultiPathSignup from '../components/MultiPathSignup';
import CommunityMetrics from '../components/CommunityMetrics';
import WaitlistBenefits from '../components/WaitlistBenefits';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <EnhancedHeader />
      <div className="relative pt-16">
        {/* Enhanced animated background effects with waitlist theme colors */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-emerald-900/20 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />
        
        {/* Main content optimized for waitlist experience */}
        <div className="relative z-10">
          <Hero />
          
          {/* Creator Workshop - The main conversion focus */}
          <CreatorWorkshop />
          
          {/* Simple Demo for immediate engagement */}
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <SimpleDemo />
            </div>
          </section>
          
          {/* Multi-path signup for different user types */}
          <section className="py-20 px-4">
            <MultiPathSignup />
          </section>
          
          <CommunityMetrics />
          <WaitlistBenefits />
          <FAQ />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
