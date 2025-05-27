
import React from 'react';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Hero from '../components/Hero';
import HowPromptToGameWorks from '../components/HowPromptToGameWorks';
import PromptBattlePreview from '../components/PromptBattlePreview';
import WhyGagsty from '../components/WhyGagsty';
import WaitlistSection from '../components/WaitlistSection';
import BadgesLeaderboardPreview from '../components/BadgesLeaderboardPreview';
import CodexPreview from '../components/CodexPreview';
import CommunityShoutouts from '../components/CommunityShoutouts';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <EnhancedHeader />
      
      <main className="pt-16">
        {/* Enhanced animated background */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-violet-900/10 to-orange-900/10 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,191,255,0.1),transparent_50%)] pointer-events-none" />
        
        <div className="relative z-10 space-y-20">
          {/* Hero: Turn Prompts into Playable Games */}
          <Hero />
          
          {/* How Prompt-to-Game Works */}
          <HowPromptToGameWorks />
          
          {/* Prompt Battle Cards Preview */}
          <PromptBattlePreview />
          
          {/* Why Gagsty? */}
          <WhyGagsty />
          
          {/* Waitlist Section */}
          <WaitlistSection />
          
          {/* Badges & Leaderboard Preview */}
          <BadgesLeaderboardPreview />
          
          {/* Codex Preview */}
          <CodexPreview />
          
          {/* Community Shoutouts */}
          <CommunityShoutouts />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
