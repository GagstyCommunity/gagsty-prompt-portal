
import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import KeyFeatures from '../components/KeyFeatures';
import WaitlistBenefits from '../components/WaitlistBenefits';
import PromptCompetition from '../components/PromptCompetition';
import CodexTeaser from '../components/CodexTeaser';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="relative">
        {/* Animated background effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-emerald-900/20 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none" />
        
        {/* Main content */}
        <div className="relative z-10">
          <Hero />
          <HowItWorks />
          <KeyFeatures />
          <WaitlistBenefits />
          <PromptCompetition />
          <CodexTeaser />
          <FAQ />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
