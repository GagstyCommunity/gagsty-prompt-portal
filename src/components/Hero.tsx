
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sparkles, Zap, Trophy, GamepadIcon, Shield } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      text: "AI-Powered Creation",
      tooltip: "Advanced AI transforms your game concepts into playable experiences",
      color: "text-blue-400"
    },
    {
      icon: Trophy,
      text: "60% Revenue Share",
      tooltip: "Earn 60% of all revenue generated from your game concepts",
      color: "text-violet-400"
    },
    {
      icon: Zap,
      text: "Community Driven",
      tooltip: "Community votes and collaborates to bring the best ideas to life",
      color: "text-orange-400"
    },
    {
      icon: Shield,
      text: "Play-to-Own",
      tooltip: "True ownership of your gaming assets through blockchain technology",
      color: "text-green-400"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse opacity-50" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-blue-500 via-violet-500 to-orange-500 shadow-2xl transform hover:scale-105 transition-transform">
            <GamepadIcon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Main Headlines */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-orange-400 bg-clip-text text-transparent">
              Build a Game
            </span>
            <br />
            <span className="text-white">
              with just a Prompt
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Submit your game concept. Let our AI & community build it. You earn rewards. We publish.
          </p>

          {/* Key Features with Tooltips */}
          <TooltipProvider>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mt-8">
              {features.map((feature, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center hover:${feature.color} transition-colors cursor-help`}>
                      <feature.icon className={`mr-2 ${feature.color}`} size={18} />
                      <span>{feature.text}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{feature.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>

        {/* Standardized CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button 
            onClick={() => navigate('/prompt-battle')}
            className="btn-primary btn-large"
          >
            <Trophy className="mr-2" size={20} />
            Try Prompt Battle
          </Button>
          <Button 
            onClick={() => navigate('/auth')}
            variant="outline"
            className="btn-secondary btn-large border-2 border-orange-500 text-orange-300 hover:bg-orange-500/20"
          >
            Join Waitlist
          </Button>
        </div>

        {/* Enhanced Stats Bar with Dynamic Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800 hover:bg-gray-800/50 transition-colors">
            <span className="text-blue-400 font-semibold">2,847+</span>
            <span className="text-gray-300 ml-1">Creators Building</span>
            <div className="inline-block w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse" title="Live count" />
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800 hover:bg-gray-800/50 transition-colors">
            <span className="text-violet-400 font-semibold">156</span>
            <span className="text-gray-300 ml-1">Game Concepts</span>
            <div className="inline-block w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse" title="Live count" />
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800 hover:bg-gray-800/50 transition-colors">
            <span className="text-orange-400 font-semibold">Dec 2024</span>
            <span className="text-gray-300 ml-1">Launch Date</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-orange-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
