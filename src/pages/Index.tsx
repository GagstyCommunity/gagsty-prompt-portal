
import React from 'react';
import DynamicHeader from '../components/navigation/DynamicHeader';
import Hero from '../components/Hero';
import SocialProofBand from '../components/SocialProofBand';
import HowPromptToGameWorks from '../components/HowPromptToGameWorks';
import PromptBattlePreview from '../components/PromptBattlePreview';
import EcosystemPreview from '../components/EcosystemPreview';
import WhyGagsty from '../components/WhyGagsty';
import WaitlistSection from '../components/WaitlistSection';
import BadgesLeaderboardPreview from '../components/BadgesLeaderboardPreview';
import CodexPreview from '../components/CodexPreview';
import CommunityShoutouts from '../components/CommunityShoutouts';
import LiveActivityFeed from '../components/LiveActivityFeed';
import Footer from '../components/Footer';
import GeometricDivider from '../components/GeometricDivider';

const Index = () => {
  return (
    <div className="min-h-screen bg-gagsty-deep text-gagsty-primary">
      <DynamicHeader />
      
      <main className="pt-16">
        {/* Hero: Turn Prompts into Playable Games */}
        <Hero />
        
        {/* Social Proof Band */}
        <SocialProofBand />
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="circuit" />
        
        {/* How Prompt-to-Game Works */}
        <div className="gagsty-section-alternate">
          <HowPromptToGameWorks />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="scanline" />
        
        {/* Prompt Battle Cards Preview */}
        <div className="gagsty-section-primary">
          <PromptBattlePreview />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="pulse" />
        
        {/* Complete Ecosystem */}
        <div className="gagsty-section-featured">
          <EcosystemPreview />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="neon" />
        
        {/* Why Gagsty? */}
        <div className="gagsty-section-alternate">
          <WhyGagsty />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="circuit" />
        
        {/* Community Activity Section */}
        <div className="gagsty-section-primary py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Waitlist Section - Takes up 2 columns */}
              <div className="lg:col-span-2">
                <WaitlistSection />
              </div>
              
              {/* Live Activity Feed - Takes up 1 column */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <LiveActivityFeed />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="scanline" />
        
        {/* Badges & Leaderboard Preview */}
        <div className="gagsty-section-alternate">
          <BadgesLeaderboardPreview />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="pulse" />
        
        {/* Codex Preview */}
        <div className="gagsty-section-featured">
          <CodexPreview />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="neon" />
        
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
