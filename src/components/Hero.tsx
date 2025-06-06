import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sparkles, Zap, Trophy, GamepadIcon, Shield, Play, Users } from 'lucide-react';
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
  return <section className="gagsty-section-hero relative overflow-hidden">
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
        

        {/* Main Headlines */}
        <div className="space-y-6">
          <h1 className="display-xl leading-tight">
            <span className="text-gagsty-gradient text-5xl font-normal">
              Turn Your Wildest Game Ideas
            </span>
            <br />
            <span className="text-gagsty-primary text-5xl">
              Into Reality With One Prompt
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gagsty-secondary max-w-4xl mx-auto leading-relaxed">
            Join <span className="text-[#00C6FB] font-semibold">4,847 creators</span> building the future of AI gaming. 
            Submit your concept. Let our AI + community bring it to life. <span className="text-[#16FF6F] font-semibold">You earn rewards.</span>
          </p>

          {/* Demo Video Preview */}
          <div className="my-8">
            <div className="gagsty-card-featured p-6 max-w-2xl mx-auto gagsty-lift-hover cursor-pointer group">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#A084FF] to-[#00C6FB] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="text-white ml-1" size={24} />
                </div>
              </div>
              <h3 className="text-gagsty-primary font-bold mb-2">Watch AI Create "Fortnite 2.0" in 45 Seconds</h3>
              <p className="text-gagsty-secondary text-sm">See how our AI transforms a single sentence into a playable game concept</p>
              <div className="flex items-center justify-center mt-4 space-x-4 text-xs text-gagsty-muted">
                <span>👀 12,847 views</span>
                <span>⭐ 4.9/5 rating</span>
                <span>🔥 #1 trending</span>
              </div>
            </div>
          </div>

          {/* Live Counters */}
          <LiveCounters />

          {/* Key Features with Tooltips */}
          <TooltipProvider>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gagsty-secondary mt-8">
              {features.map((feature, index) => <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center hover:${feature.color} transition-colors cursor-help gagsty-lift-hover`}>
                      <feature.icon className={`mr-2 ${feature.color}`} size={18} />
                      <span>{feature.text}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="gagsty-modal max-w-xs">
                    <p>{feature.tooltip}</p>
                  </TooltipContent>
                </Tooltip>)}
            </div>
          </TooltipProvider>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button onClick={() => navigate('/submit')} className="btn-gagsty-primary text-lg px-8 py-4 group">
            <Trophy className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
            Submit Your Game Idea
          </Button>
          <Button onClick={() => navigate('/prompt-battle')} className="btn-gagsty-secondary text-lg px-8 py-4">
            <Zap className="mr-2" size={20} />
            Try Prompt Battle
          </Button>
        </div>

        {/* Scarcity & Social Proof */}
        <div className="mt-12 max-w-lg mx-auto">
          <ScarcityIndicator />
        </div>

        {/* Launch Timer */}
        <div className="my-12">
          <LaunchTimer />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#8B8FA3] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-[#A084FF] to-[#00C6FB] rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;