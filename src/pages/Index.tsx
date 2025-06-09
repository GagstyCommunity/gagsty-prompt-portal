
import React, { useState } from 'react';
import UnifiedHeader from '../components/navigation/UnifiedHeader';
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
import LaunchTimer from '../components/LaunchTimer';

const Index = () => {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const toggleChatBot = () => {
    setIsChatBotOpen(!isChatBotOpen);
  };

  return (
    <div className="min-h-screen bg-gagsty-deep text-gagsty-primary relative overflow-hidden">
      {/* Enhanced Particle Background */}
      <EnhancedParticleBackground 
        density={100}
        colors={['#A084FF', '#00C6FB', '#16FF6F', '#FF61F6']}
        interactive={true}
      />
      
      {/* Unified Header */}
      <UnifiedHeader />
      
      <main className="relative z-10">
        {/* Enhanced Full-Screen Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <div className="space-y-8">
              {/* Main Headline - Dramatically Larger */}
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                  AI CREATES
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                  YOUR GAMES
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-2xl md:text-4xl lg:text-5xl text-white/90 font-bold max-w-5xl mx-auto leading-relaxed">
                From <span className="text-purple-400">Prompt</span> to <span className="text-blue-400">Playable</span> in Minutes
              </p>
              
              {/* Description */}
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mt-8">
                The future of game development is here. Join thousands of creators turning imagination into interactive experiences.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl md:text-2xl font-bold py-6 px-12 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  Join Waitlist Now
                </button>
                <button className="border-2 border-white/30 text-white text-xl md:text-2xl font-bold py-6 px-12 rounded-2xl hover:bg-white/10 transition-all duration-300">
                  Watch Demo
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-purple-400">10K+</div>
                  <div className="text-lg md:text-xl text-white/80">Creators Waiting</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-blue-400">500+</div>
                  <div className="text-lg md:text-xl text-white/80">Games Created</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-green-400">99%</div>
                  <div className="text-lg md:text-xl text-white/80">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Social Proof Band */}
        <div className="relative z-10">
          <SocialProofBand />
        </div>
        
        {/* Launch Timer */}
        <div className="relative z-10">
          <LaunchTimer />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="circuit" />
        
        {/* Main Waitlist Section */}
        <div className="gagsty-section-featured relative z-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <WaitlistSection />
              </div>
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
        
        {/* How It Works */}
        <div className="gagsty-section-alternate relative z-10">
          <HowPromptToGameWorks />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="pulse" />
        
        {/* Coming Soon Previews */}
        <div className="gagsty-section-primary relative z-10">
          <PromptBattlePreview />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="neon" />
        
        {/* Complete Ecosystem */}
        <div className="gagsty-section-featured relative z-10">
          <EcosystemPreview />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="circuit" />
        
        {/* Why Join Early */}
        <div className="gagsty-section-alternate relative z-10">
          <WhyGagsty />
        </div>
        
        {/* Enhanced Section Divider */}
        <GeometricDivider variant="scanline" />
        
        {/* Future Features */}
        <div className="gagsty-section-primary relative z-10">
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
        
        {/* Community */}
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
