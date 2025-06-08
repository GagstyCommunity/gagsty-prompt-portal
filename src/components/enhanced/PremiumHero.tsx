
import React from 'react';
import { PremiumButton } from '@/components/ui/premium-button';
import { PremiumCard } from '@/components/ui/premium-card';
import { Play, Sparkles, Zap, Star } from 'lucide-react';

const PremiumHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-pink-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(160,132,255,0.15)_0%,rgba(0,198,251,0.1)_35%,rgba(22,255,111,0.05)_70%,transparent_100%)]" />
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Premium badge */}
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-xl border border-yellow-500/30 mb-8 group hover:scale-105 transition-transform duration-300">
          <Sparkles className="w-5 h-5 text-yellow-400 mr-2 group-hover:animate-spin" />
          <span className="text-sm font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Premium AI-Powered Gaming Platform
          </span>
        </div>

        {/* Main heading with enhanced typography */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none">
          <span className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Create
          </span>
          <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Epic Games
          </span>
          <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
            with AI
          </span>
        </h1>

        {/* Enhanced subtitle */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
          Transform your wildest game ideas into reality with our revolutionary AI engine. 
          No coding required – just imagination and creativity.
        </p>

        {/* Premium feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <PremiumCard variant="glass" className="p-6 text-center hover:scale-105">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Instant Creation</h3>
            <p className="text-white/70 text-sm">Games ready in seconds, not months</p>
          </PremiumCard>
          
          <PremiumCard variant="glass" className="p-6 text-center hover:scale-105">
            <Star className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Premium Quality</h3>
            <p className="text-white/70 text-sm">Professional-grade games every time</p>
          </PremiumCard>
          
          <PremiumCard variant="glass" className="p-6 text-center hover:scale-105">
            <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Web3 Powered</h3>
            <p className="text-white/70 text-sm">Own, trade, and monetize your creations</p>
          </PremiumCard>
        </div>

        {/* Enhanced CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <PremiumButton 
            variant="premium" 
            size="xl" 
            className="group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Start Creating Now
              <Sparkles className="ml-2 w-5 h-5 group-hover:animate-spin" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </PremiumButton>
          
          <PremiumButton 
            variant="glass" 
            size="xl" 
            className="group"
          >
            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Watch Demo
          </PremiumButton>
        </div>

        {/* Social proof with premium styling */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/60">
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white/20 ${
                  i === 0 ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
                  i === 1 ? 'bg-gradient-to-r from-blue-600 to-teal-600' :
                  i === 2 ? 'bg-gradient-to-r from-green-600 to-yellow-600' :
                  i === 3 ? 'bg-gradient-to-r from-orange-600 to-red-600' :
                  'bg-gradient-to-r from-pink-600 to-purple-600'
                }`} />
              ))}
            </div>
            <span className="text-sm">50,000+ Creators</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm">4.9/5 Rating</span>
          </div>
          
          <div className="text-sm">
            <span className="text-green-400 font-semibold">1M+</span> Games Created
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumHero;
