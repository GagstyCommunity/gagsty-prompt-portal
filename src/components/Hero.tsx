
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Trophy, GamepadIcon, Shield } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

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

          {/* Key Features Snippets */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mt-8">
            <div className="flex items-center hover:text-blue-400 transition-colors">
              <Sparkles className="mr-2 text-blue-400" size={18} />
              <span>AI-Powered Creation</span>
            </div>
            <div className="flex items-center hover:text-violet-400 transition-colors">
              <Trophy className="mr-2 text-violet-400" size={18} />
              <span>60% Revenue Share</span>
            </div>
            <div className="flex items-center hover:text-orange-400 transition-colors">
              <Zap className="mr-2 text-orange-400" size={18} />
              <span>Community Driven</span>
            </div>
            <div className="flex items-center hover:text-green-400 transition-colors">
              <Shield className="mr-2 text-green-400" size={18} />
              <span>Play-to-Own</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button 
            onClick={() => navigate('/prompt-battle')}
            className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <Trophy className="mr-2" size={20} />
            Try Prompt Battle
          </Button>
          <Button 
            onClick={() => navigate('/auth')}
            variant="outline"
            className="border-2 border-orange-500 text-orange-300 hover:bg-orange-500/20 px-8 py-4 text-lg rounded-xl transition-all duration-300"
          >
            Join Waitlist
          </Button>
        </div>

        {/* Social Proof */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800">
            <span className="text-blue-400 font-semibold">2,847+</span>
            <span className="text-gray-300 ml-1">Creators Building</span>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800">
            <span className="text-violet-400 font-semibold">156</span>
            <span className="text-gray-300 ml-1">Game Concepts</span>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800">
            <span className="text-orange-400 font-semibold">Aug 30</span>
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
