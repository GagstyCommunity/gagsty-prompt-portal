
import React, { useState } from 'react';
import EnhancedHeader from '../components/enhanced/EnhancedHeader';
import PremiumHero from '../components/enhanced/PremiumHero';
import EnhancedParticleBackground from '../components/enhanced/EnhancedParticleBackground';
import ChatBot from '../components/chatbot/ChatBot';
import ChatBotTrigger from '../components/chatbot/ChatBotTrigger';
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
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const toggleChatBot = () => {
    setIsChatBotOpen(!isChatBotOpen);
  };

  return (
    <div className="min-h-screen bg-gagsty-deep text-gagsty-primary relative overflow-hidden">
      {/* Enhanced Particle Background */}
      <EnhancedParticleBackground 
        density={80}
        colors={['#A084FF', '#00C6FB', '#16FF6F', '#FF61F6']}
        interactive={true}
      />
      
      {/* Enhanced Header */}
      <EnhancedHeader />
      
      <main className="relative z-10">
        {/* Premium Hero Section */}
        <PremiumHero />
        
        {/* Social Proof Band */}
        <div className="relative z-10">
          <SocialProofBand />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="circuit" />
        
        {/* How Prompt-to-Game Works */}
        <div className="gagsty-section-alternate relative z-10">
          <HowPromptToGameWorks />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="scanline" />
        
        {/* Prompt Battle Cards Preview */}
        <div className="gagsty-section-primary relative z-10">
          <PromptBattlePreview />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="pulse" />
        
        {/* Complete Ecosystem */}
        <div className="gagsty-section-featured relative z-10">
          <EcosystemPreview />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="neon" />
        
        {/* Why Gagsty? */}
        <div className="gagsty-section-alternate relative z-10">
          <WhyGagsty />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="circuit" />
        
        {/* Community Activity Section with Premium Styling */}
        <div className="gagsty-section-primary py-20 relative z-10">
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
        <div className="gagsty-section-alternate relative z-10">
          <BadgesLeaderboardPreview />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="pulse" />
        
        {/* Codex Preview */}
        <div className="gagsty-section-featured relative z-10">
          <CodexPreview />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="neon" />
        
        {/* Community Shoutouts */}
        <div className="gagsty-section-primary relative z-10">
          <CommunityShoutouts />
        </div>
      </main>
      
      {/* Enhanced Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* ChatBot Integration */}
      <ChatBot isOpen={isChatBotOpen} onToggle={toggleChatBot} />
      {!isChatBotOpen && <ChatBotTrigger onClick={toggleChatBot} />}
    </div>
  );
};

export default Index;
