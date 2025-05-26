
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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
          title: "Already signed up! 🚀",
          description: "You're already part of the Gagsty community!",
        });
        navigate('/dashboard');
      } else {
        // Store email in localStorage for the signup process
        localStorage.setItem('waitlist_email', email);
        toast({
          title: "Join us now! 🚀",
          description: "Sign up to join the Gagsty community and get 500 G-Chips!",
        });
        navigate('/auth');
      }
      setEmail('');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-50" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-amber-400 rounded-full animate-pulse opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
        {/* Logo placeholder */}
        <div className="mb-8">
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl">
            <span className="text-2xl font-bold text-white">GAGSTY</span>
          </div>
        </div>

        {/* Main headline */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Launch Your Game
            </span>
            <br />
            <span className="text-white">with a Prompt.</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Join the Future of Play.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            AI + Web3-powered platform where anyone can create, play, and earn through games — even without coding.
          </p>
        </div>

        {/* Waitlist signup form */}
        <div className="max-w-md mx-auto mt-12">
          <form onSubmit={handleWaitlistSignup} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <Button 
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {user ? 'Go to Dashboard' : 'Join Now & Get 500 Chips'}
            </Button>
          </form>
          
          <p className="text-sm text-gray-400 mt-4">
            Join 1,000+ creators building the future of gaming
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
