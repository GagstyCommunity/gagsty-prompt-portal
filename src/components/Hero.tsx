
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Zap, Trophy, Users, Calendar, Clock, CheckCircle } from 'lucide-react';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Calculate days until launch
  const launchDate = new Date('2025-08-30');
  const today = new Date();
  const daysUntilLaunch = Math.ceil((launchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const hoursUntilLaunch = Math.ceil((launchDate.getTime() - today.getTime()) / (1000 * 60 * 60));

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const waitlistCount = 2847;
  const estimatedPosition = waitlistCount + Math.floor(Math.random() * 50);

  const handleWaitlistSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      
      setTimeout(() => {
        if (user) {
          toast({
            title: "Welcome back, Future Creator! 🚀",
            description: "You're already part of the exclusive Gagsty waitlist!",
          });
          navigate('/dashboard');
        } else {
          localStorage.setItem('waitlist_email', email);
          setShowConfirmation(true);
          setStep(2);
          toast({
            title: "Welcome to the Future of Gaming! 🎮",
            description: "Check your email to complete your waitlist registration!",
          });
        }
        setLoading(false);
      }, 1000);
    }
  };

  const completeRegistration = () => {
    navigate('/auth');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Enhanced animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-50" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-pulse opacity-45" />
        <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-55" />
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
        {/* Enhanced Logo */}
        <div className="mb-8">
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 shadow-2xl transform hover:scale-105 transition-transform">
            <span className="text-2xl font-bold text-white">GAGSTY</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 rounded-2xl p-6 border border-purple-700/50 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Platform Launches In:</h3>
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            <div className="bg-purple-600 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
              <div className="text-purple-200 text-sm">Days</div>
            </div>
            <div className="bg-blue-600 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
              <div className="text-blue-200 text-sm">Hours</div>
            </div>
            <div className="bg-emerald-600 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-emerald-200 text-sm">Minutes</div>
            </div>
            <div className="bg-purple-500 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
              <div className="text-purple-200 text-sm">Seconds</div>
            </div>
          </div>
        </div>

        {/* Launch countdown and waitlist badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-lg">
            <Calendar className="mr-2" size={16} />
            August 30, 2025
          </Badge>
          <Badge className="bg-gradient-to-r from-emerald-600 to-purple-600 text-white px-4 py-2">
            <Users className="mr-1" size={14} />
            {waitlistCount.toLocaleString()}+ Creators Waiting
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2">
            <Trophy className="mr-1" size={14} />
            Early Access Reserved
          </Badge>
        </div>

        {/* Enhanced main headline */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Create Games
            </span>
            <br />
            <span className="text-white">with a Prompt.</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Own Your Success.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join the waitlist for the world's first AI + Web3 platform where anyone can create, publish, and monetize games using simple prompts — no coding required.
          </p>

          {/* Value propositions */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center">
              <Sparkles className="mr-1 text-purple-400" size={16} />
              AI-Powered Creation
            </div>
            <div className="flex items-center">
              <Trophy className="mr-1 text-emerald-400" size={16} />
              True Ownership
            </div>
            <div className="flex items-center">
              <Zap className="mr-1 text-blue-400" size={16} />
              Early Access Benefits
            </div>
          </div>
        </div>

        {/* Enhanced waitlist signup form with progress */}
        <div className="max-w-md mx-auto mt-12">
          {!showConfirmation ? (
            <>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Step {step} of 2</span>
                  <span className="text-sm text-purple-400">Join {waitlistCount.toLocaleString()}+ creators</span>
                </div>
                <Progress value={step * 50} className="h-2" />
              </div>
              
              <form onSubmit={handleWaitlistSignup} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email for early access"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-gray-900/50 border-purple-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 text-lg py-3"
                    required
                  />
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 hover:from-purple-700 hover:via-blue-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Sparkles className="mr-2 animate-spin" size={18} />
                        Joining...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2" size={18} />
                        Join Waitlist
                      </>
                    )}
                  </Button>
                </div>
                
                <p className="text-sm text-gray-400">
                  Get early access + 500 bonus G-Chips when we launch
                </p>
              </form>
            </>
          ) : (
            <div className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 rounded-lg p-6 border border-purple-700/50">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="text-emerald-400 mr-2" size={24} />
                <h3 className="text-xl font-bold text-white">Email Confirmed!</h3>
              </div>
              <p className="text-gray-300 mb-4">You're now #{estimatedPosition.toLocaleString()} on our waitlist</p>
              <Button 
                onClick={completeRegistration}
                className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700"
              >
                Complete Profile (Step 2)
              </Button>
            </div>
          )}
          
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-400">
            <span>✅ Free to join</span>
            <span>🎁 500 Chips bonus</span>
            <span>🚀 Early access guaranteed</span>
          </div>
        </div>

        {/* Waitlist benefits highlight */}
        <div className="mt-12 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-700/50">
          <h3 className="text-xl font-bold text-white mb-4">Exclusive Waitlist Benefits</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🎮</div>
              <p className="text-gray-300">Early access to game creation tools</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💎</div>
              <p className="text-gray-300">500 G-Chips bonus on launch</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🏆</div>
              <p className="text-gray-300">Founding Creator badge & perks</p>
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-emerald-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
