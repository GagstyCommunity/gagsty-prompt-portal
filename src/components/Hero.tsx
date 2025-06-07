
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sparkles, Zap, Trophy, GamepadIcon, Shield, Play, Users, Coins } from 'lucide-react';
import LaunchTimer from './LaunchTimer';
import ParticleBackground from './ParticleBackground';
import LiveCounters from './LiveCounters';
import ScarcityIndicator from './ScarcityIndicator';

const Hero = () => {
  const navigate = useNavigate();
  
  const features = [{
    icon: Sparkles,
    text: "AI-Powered Creation",
    tooltip: "Advanced AI transforms your game concepts into playable experiences",
    color: "text-[#00C6FB]"
  }, {
    icon: Trophy,
    text: "60% Revenue Share",
    tooltip: "Earn 60% of all revenue generated from your game concepts",
    color: "text-[#A084FF]"
  }, {
    icon: Zap,
    text: "Community Driven",
    tooltip: "Community votes and collaborates to bring the best ideas to life",
    color: "text-[#16FF6F]"
  }, {
    icon: Shield,
    text: "Play-to-Own",
    tooltip: "True ownership of your gaming assets through blockchain technology",
    color: "text-[#FF61F6]"
  }];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gagsty-deep via-[#0D1117] to-[#161B22]">
      {/* Enhanced Particle Background */}
      <ParticleBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#00C6FB] rounded-full animate-pulse opacity-70 blur-sm" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#16FF6F] rounded-full animate-pulse opacity-50 blur-sm" />
        <div className="absolute bottom-1/4 left-1/2 w-2.5 h-2.5 bg-[#A084FF] rounded-full animate-pulse opacity-60 blur-sm" />
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-[#FF61F6] rounded-full animate-pulse opacity-70 blur-sm" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/5 right-1/5 w-16 h-16 border border-[#00C6FB]/20 rotate-45 animate-float" />
        <div className="absolute bottom-1/5 left-1/5 w-12 h-12 border border-[#16FF6F]/20 rotate-12 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-12">
          {/* Main Headlines with improved typography */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight">
              <span className="text-gagsty-gradient bg-gradient-to-r from-[#A084FF] via-[#00C6FB] to-[#16FF6F] bg-clip-text text-transparent">
                Turn Your Wildest Game Ideas
              </span>
              <br />
              <span className="text-gagsty-primary text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mt-4 block">
                Into Reality With One Prompt
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gagsty-secondary max-w-5xl mx-auto leading-relaxed font-light">
              Join <span className="text-[#00C6FB] font-semibold">4,847 creators</span> building the future of AI gaming. 
              Submit your concept. Let our AI + community bring it to life. <span className="text-[#16FF6F] font-semibold">You earn rewards.</span>
            </p>

            {/* Enhanced Demo Video Preview */}
            <div className="my-12">
              <div className="gagsty-card-featured p-8 max-w-3xl mx-auto gagsty-lift-hover cursor-pointer group transform transition-all duration-500 hover:scale-105">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#A084FF] via-[#00C6FB] to-[#16FF6F] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <Play className="text-white ml-1" size={32} />
                    </div>
                    <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-[#A084FF] via-[#00C6FB] to-[#16FF6F] rounded-full animate-ping opacity-20" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gagsty-primary mb-3">Watch AI Create "Fortnite 2.0" in 45 Seconds</h3>
                <p className="text-gagsty-secondary text-lg">See how our AI transforms a single sentence into a playable game concept</p>
                <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-gagsty-muted">
                  <span className="flex items-center">👀 12,847 views</span>
                  <span className="flex items-center">⭐ 4.9/5 rating</span>
                  <span className="flex items-center">🔥 #1 trending</span>
                </div>
              </div>
            </div>

            {/* Live Counters */}
            <LiveCounters />

            {/* Enhanced Key Features with Tooltips */}
            <TooltipProvider>
              <div className="flex flex-wrap justify-center gap-8 text-base text-gagsty-secondary mt-12">
                {features.map((feature, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className={`flex items-center hover:${feature.color} transition-all duration-300 cursor-help gagsty-lift-hover p-3 rounded-lg hover:bg-white/5`}>
                        <feature.icon className={`mr-3 ${feature.color}`} size={24} />
                        <span className="font-medium">{feature.text}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="gagsty-modal max-w-xs">
                      <p>{feature.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
            <Button 
              onClick={() => navigate('/auth')} 
              className="btn-gagsty-primary text-xl px-10 py-6 group transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Coins className="mr-3 group-hover:rotate-12 transition-transform" size={24} />
              Earn 500 Chips
              <div className="ml-2 text-sm opacity-90">+ 100 Bonus</div>
            </Button>
            <Button 
              onClick={() => navigate('/prompt-battle')} 
              className="btn-gagsty-secondary text-xl px-10 py-6 transform hover:scale-105 transition-all duration-300"
            >
              <Zap className="mr-3" size={24} />
              Try Prompt Battle
            </Button>
          </div>

          {/* Enhanced Scarcity & Social Proof */}
          <div className="mt-16 max-w-2xl mx-auto">
            <ScarcityIndicator />
          </div>

          {/* Launch Timer */}
          <div className="my-16">
            <LaunchTimer />
          </div>

          {/* Modern Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 border-2 border-[#8B8FA3]/50 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
              <div className="w-1.5 h-4 bg-gradient-to-b from-[#A084FF] via-[#00C6FB] to-[#16FF6F] rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-gagsty-deep/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-gagsty-deep/10 via-transparent to-gagsty-deep/10 pointer-events-none" />
    </section>
  );
};

export default Hero;
