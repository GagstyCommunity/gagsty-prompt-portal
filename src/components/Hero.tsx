
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sparkles, Zap, Trophy, GamepadIcon, Shield } from 'lucide-react';
import LaunchTimer from './LaunchTimer';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      text: "AI-Powered Creation",
      tooltip: "Advanced AI transforms your game concepts into playable experiences",
      color: "text-[#00C6FB]"
    },
    {
      icon: Trophy,
      text: "60% Revenue Share",
      tooltip: "Earn 60% of all revenue generated from your game concepts",
      color: "text-[#A084FF]"
    },
    {
      icon: Zap,
      text: "Community Driven",
      tooltip: "Community votes and collaborates to bring the best ideas to life",
      color: "text-[#16FF6F]"
    },
    {
      icon: Shield,
      text: "Play-to-Own",
      tooltip: "True ownership of your gaming assets through blockchain technology",
      color: "text-[#FF61F6]"
    }
  ];

  return (
    <section className="gagsty-section-hero relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00C6FB] rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#16FF6F] rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-[#A084FF] rounded-full animate-pulse opacity-50" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-[#FF61F6] rounded-full animate-pulse opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10 px-4">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-[#A084FF] via-[#00C6FB] to-[#16FF6F] shadow-2xl transform hover:scale-105 transition-transform gagsty-glow-hover">
            <GamepadIcon className="w-8 h-8 text-[#121212]" />
          </div>
        </div>

        {/* Main Headlines */}
        <div className="space-y-6">
          <h1 className="display-xl leading-tight">
            <span className="text-gagsty-gradient">
              World's First AI + Web3
            </span>
            <br />
            <span className="text-gagsty-primary">
              Prompt-to-Game Platform
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gagsty-secondary max-w-4xl mx-auto leading-relaxed">
            Submit your game concept. Let our AI & community build it. You earn rewards. We publish.
          </p>

          {/* Launch Timer */}
          <div className="my-12">
            <LaunchTimer />
          </div>

          {/* Key Features with Tooltips */}
          <TooltipProvider>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gagsty-secondary mt-8">
              {features.map((feature, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center hover:${feature.color} transition-colors cursor-help gagsty-lift-hover`}>
                      <feature.icon className={`mr-2 ${feature.color}`} size={18} />
                      <span>{feature.text}</span>
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button 
            onClick={() => navigate('/prompt-battle')}
            className="btn-gagsty-primary text-lg px-8 py-4"
          >
            <Trophy className="mr-2" size={20} />
            Try Prompt Battle
          </Button>
          <Button 
            onClick={() => navigate('/auth')}
            className="btn-gagsty-secondary text-lg px-8 py-4"
          >
            Join Waitlist
          </Button>
        </div>

        {/* Enhanced Stats Bar with Dynamic Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="gagsty-card gagsty-lift-hover px-6 py-3 rounded-full border border-[#262A34]">
            <span className="text-[#00C6FB] font-semibold">2,847+</span>
            <span className="text-gagsty-secondary ml-1">Creators Building</span>
            <div className="inline-block w-2 h-2 bg-[#16FF6F] rounded-full ml-2 gagsty-status-live" title="Live count" />
          </div>
          <div className="gagsty-card gagsty-lift-hover px-6 py-3 rounded-full border border-[#262A34]">
            <span className="text-[#A084FF] font-semibold">156</span>
            <span className="text-gagsty-secondary ml-1">Game Concepts</span>
            <div className="inline-block w-2 h-2 bg-[#16FF6F] rounded-full ml-2 gagsty-status-live" title="Live count" />
          </div>
          <div className="gagsty-card gagsty-lift-hover px-6 py-3 rounded-full border border-[#262A34]">
            <span className="text-[#16FF6F] font-semibold">Aug 30, 2024</span>
            <span className="text-gagsty-secondary ml-1">Launch Date</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#8B8FA3] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-[#A084FF] to-[#00C6FB] rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
