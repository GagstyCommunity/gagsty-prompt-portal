
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import KeyFeatures from '../components/KeyFeatures';
import InteractiveDemo from '../components/InteractiveDemo';
import CreatorGallery from '../components/CreatorGallery';
import CommunityMetrics from '../components/CommunityMetrics';
import WaitlistBenefits from '../components/WaitlistBenefits';
import PromptCompetition from '../components/PromptCompetition';
import CodexTeaser from '../components/CodexTeaser';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <div className="relative pt-16">
        {/* Enhanced animated background effects with waitlist theme colors */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-emerald-900/20 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />
        
        {/* Main content optimized for waitlist experience */}
        <div className="relative z-10">
          <Hero />
          <InteractiveDemo />
          <CommunityMetrics />
          <HowItWorks />
          <KeyFeatures />
          <CreatorGallery />
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
