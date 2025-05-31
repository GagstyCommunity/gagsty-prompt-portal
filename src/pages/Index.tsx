
import React from 'react';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Hero from '../components/Hero';
import HowPromptToGameWorks from '../components/HowPromptToGameWorks';
import PromptBattlePreview from '../components/PromptBattlePreview';
import EcosystemPreview from '../components/EcosystemPreview';
import WhyGagsty from '../components/WhyGagsty';
import WaitlistSection from '../components/WaitlistSection';
import BadgesLeaderboardPreview from '../components/BadgesLeaderboardPreview';
import CodexPreview from '../components/CodexPreview';
import CommunityShoutouts from '../components/CommunityShoutouts';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gagsty-deep text-gagsty-primary">
      <EnhancedHeader />
      
      <main className="pt-16">
        {/* Hero: Turn Prompts into Playable Games */}
        <Hero />
        
        {/* Section Divider */}
        <div className="gagsty-divider-neon" />
        
        {/* How Prompt-to-Game Works */}
        <div className="gagsty-section-alternate">
          <HowPromptToGameWorks />
        </div>
        
        {/* Section Divider */}
        <div className="gagsty-divider" />
        
        {/* Prompt Battle Cards Preview */}
        <div className="gagsty-section-primary">
          <PromptBattlePreview />
        </div>
        
        {/* Section Divider */}
        <div className="gagsty-divider-thick" />
        
        {/* Complete Ecosystem */}
        <div className="gagsty-section-featured">
          <EcosystemPreview />
        </div>
        
        {/* Section Divider */}
        <div className="gagsty-divider" />
        
        {/* Why Gagsty? */}
        <div className="gagsty-section-alternate">
          <WhyGagsty />
        </div>
        
        {/* Section Divider */}
        <div className="gagsty-divider-neon" />
        
        {/* Waitlist Section */}
        <div className="gagsty-section-primary">
          <WaitlistSection />
        </div>
        
        {/* Section Divider */}
        <div className="gagsty-divider" />
        
        {/* Badges & Leaderboard Preview */}
        <div className="gagsty-section-alternate">
          <BadgesLeaderboardPreview />
        </div>
        
        {/* Section Divider */}
        <div className="gagsty-divider-thick" />
        
        {/* Codex Preview */}
        <div className="gagsty-section-featured">
          <CodexPreview />
        </div>
        
        {/* Section Divider */}
        <div className="gagsty-divider" />
        
        {/* Community Shoutouts */}
        <div className="gagsty-section-primary">
          <CommunityShoutouts />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
