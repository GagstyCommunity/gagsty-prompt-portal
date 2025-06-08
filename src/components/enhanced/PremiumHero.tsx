
import React from 'react';
import { PremiumButton } from '@/components/ui/premium-button';
import { PremiumCard } from '@/components/ui/premium-card';
import { Play, Sparkles, Zap, Star, Calendar, Users, Clock } from 'lucide-react';

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
        {/* Premium launch badge */}
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-xl border border-orange-500/30 mb-8 group hover:scale-105 transition-transform duration-300">
          <Clock className="w-5 h-5 text-orange-400 mr-2 group-hover:animate-spin" />
          <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Launching August 2025 • Early Access Available
          </span>
        </div>

        {/* Main heading with enhanced typography */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none">
          <span className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            The Future of
          </span>
          <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Game Creation
          </span>
          <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
            is Coming
          </span>
        </h1>

        {/* Enhanced subtitle */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
          Be among the first to experience our revolutionary AI-powered game creation platform. 
          Join the waitlist and secure your spot in gaming history.
        </p>

        {/* Waitlist benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <PremiumCard variant="glass" className="p-6 text-center hover:scale-105">
            <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Early Access</h3>
            <p className="text-white/70 text-sm">Be first to create games when we launch</p>
          </PremiumCard>
          
          <PremiumCard variant="glass" className="p-6 text-center hover:scale-105">
            <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Bonus Rewards</h3>
            <p className="text-white/70 text-sm">Exclusive chips and creator benefits</p>
          </PremiumCard>
          
          <PremiumCard variant="glass" className="p-6 text-center hover:scale-105">
            <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">VIP Community</h3>
            <p className="text-white/70 text-sm">Join exclusive Discord and events</p>
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
              Join the Waitlist
              <Star className="ml-2 w-5 h-5 group-hover:animate-spin" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </PremiumButton>
          
          <PremiumButton 
            variant="glass" 
            size="xl" 
            className="group"
          >
            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Watch Preview
          </PremiumButton>
        </div>

        {/* Waitlist social proof */}
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
            <span className="text-sm">50,000+ on Waitlist</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-orange-400 mr-2" />
            <span className="text-sm">Launching August 2025</span>
          </div>
          
          <div className="text-sm">
            <span className="text-green-400 font-semibold">Limited</span> Early Access Spots
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumHero;
