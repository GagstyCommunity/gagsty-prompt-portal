
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Trophy, Users } from 'lucide-react';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleWaitlistSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      if (user) {
        toast({
          title: "Welcome back, Creator! 🚀",
          description: "You're already part of the Gagsty community!",
        });
        navigate('/dashboard');
      } else {
        // Store email in localStorage for the signup process
        localStorage.setItem('waitlist_email', email);
        toast({
          title: "Join the Creator Revolution! 🎮",
          description: "Sign up now and get 500 G-Chips to start your journey!",
        });
        navigate('/auth');
      }
      setEmail('');
    }
  };

  const getDynamicCTA = () => {
    if (user) {
      return {
        text: "Continue Creating",
        description: "Welcome back to your creator dashboard"
      };
    }
    
    const hasEmail = localStorage.getItem('waitlist_email');
    if (hasEmail) {
      return {
        text: "Complete Your Setup",
        description: "Finish joining the creator community"
      };
    }
    
    return {
      text: "Join Creator Waitlist & Get 500 Chips",
      description: "Start your game creation journey today"
    };
  };

  const ctaInfo = getDynamicCTA();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Enhanced animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-50" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-amber-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-45" />
        <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-55" />
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
        {/* Enhanced Logo */}
        <div className="mb-8">
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 shadow-2xl transform hover:scale-105 transition-transform">
            <span className="text-2xl font-bold text-white">GAGSTY</span>
          </div>
        </div>

        {/* Live community badges */}
        <div className="flex justify-center space-x-4 mb-6">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
            <Users className="mr-1" size={14} />
            2,847+ Creators
          </Badge>
          <Badge className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-2">
            <Trophy className="mr-1" size={14} />
            1,234 Games Created
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
            <Zap className="mr-1" size={14} />
            Live Battles Active
          </Badge>
        </div>

        {/* Enhanced main headline */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Create Games
            </span>
            <br />
            <span className="text-white">with a Prompt.</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Own Your Success.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The world's first AI + Web3 platform where anyone can create, publish, and monetize games using simple prompts — no coding required.
          </p>

          {/* Value propositions */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center">
              <Sparkles className="mr-1 text-yellow-400" size={16} />
              AI-Powered Creation
            </div>
            <div className="flex items-center">
              <Trophy className="mr-1 text-purple-400" size={16} />
              True Ownership
            </div>
            <div className="flex items-center">
              <Zap className="mr-1 text-blue-400" size={16} />
              Instant Publishing
            </div>
          </div>
        </div>

        {/* Enhanced waitlist signup form */}
        <div className="max-w-md mx-auto mt-12">
          <form onSubmit={handleWaitlistSignup} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email to get started"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-lg py-3"
                required
              />
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 hover:from-blue-700 hover:via-purple-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                disabled={loading}
              >
                {user ? (
                  <>
                    <Sparkles className="mr-2" size={18} />
                    Go to Dashboard
                  </>
                ) : (
                  <>
                    <Zap className="mr-2" size={18} />
                    {ctaInfo.text}
                  </>
                )}
              </Button>
            </div>
            
            <p className="text-sm text-gray-400">
              {ctaInfo.description}
            </p>
          </form>
          
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-400">
            <span>✅ Free to join</span>
            <span>🎁 500 Chips bonus</span>
            <span>🚀 Early access</span>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Trusted by creators worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <span className="text-2xl">🇺🇸</span>
            <span className="text-2xl">🇮🇳</span>
            <span className="text-2xl">🇪🇸</span>
            <span className="text-2xl">🇬🇧</span>
            <span className="text-2xl">🇧🇷</span>
            <span className="text-2xl">🇯🇵</span>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
