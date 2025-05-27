
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Zap, Trophy, Users, Calendar, Clock, CheckCircle, Crown, Share2 } from 'lucide-react';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Calculate days until launch
  const launchDate = new Date('2025-08-30');
  const today = new Date();
  
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
            title: "Welcome back, Creator! 🎮",
            description: "You're already building the future with Gagsty!",
          });
          navigate('/dashboard');
        } else {
          localStorage.setItem('waitlist_email', email);
          setShowConfirmation(true);
          toast({
            title: "Creator Status Reserved! 🏆",
            description: "Welcome to the exclusive Gagsty creator community!",
          });
        }
        setLoading(false);
      }, 1000);
    }
  };

  const shareWaitlist = () => {
    const shareText = "I just joined the Gagsty waitlist - the future of AI-powered game creation! 🎮 Turn text into playable games in minutes. Who else wants to create the future of gaming?";
    if (navigator.share) {
      navigator.share({
        title: "Join me on Gagsty Waitlist",
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      toast({
        title: "Link Copied! 📋",
        description: "Share with your friends to earn bonus G-Chips!",
      });
    }
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
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 shadow-2xl transform hover:scale-105 transition-transform hover-glow">
            <span className="text-2xl font-display font-bold text-white">GAGSTY</span>
          </div>
        </div>

        {/* Updated headline with enhanced typography */}
        <div className="space-y-6">
          <h1 className="display-xl">
            <span className="text-gradient">
              Turn Text into
            </span>
            <br />
            <span className="text-white">Playable Games</span>
            <br />
            <span className="text-gradient">
              in Minutes
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Join {waitlistCount.toLocaleString()}+ creators building the future of AI-powered game development
          </p>

          {/* 3-point value proposition with enhanced styling */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center hover-lift">
              <Sparkles className="mr-2 text-purple-400" size={18} />
              <span>No Coding Required</span>
            </div>
            <div className="flex items-center hover-lift">
              <Trophy className="mr-2 text-emerald-400" size={18} />
              <span>Own Your Creations</span>
            </div>
            <div className="flex items-center hover-lift">
              <Zap className="mr-2 text-blue-400" size={18} />
              <span>Earn from Day One</span>
            </div>
          </div>
        </div>

        {/* Enhanced Countdown Timer */}
        <div className="card-primary max-w-2xl mx-auto hover-lift">
          <h3 className="text-xl font-display font-bold text-white mb-4">Creator Tools Launch In:</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-purple-600 rounded-xl p-4 hover-glow">
              <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.days}</div>
              <div className="text-purple-200 text-sm">Days</div>
            </div>
            <div className="bg-blue-600 rounded-xl p-4 hover-glow">
              <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.hours}</div>
              <div className="text-blue-200 text-sm">Hours</div>
            </div>
            <div className="bg-emerald-600 rounded-xl p-4 hover-glow">
              <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-emerald-200 text-sm">Minutes</div>
            </div>
            <div className="bg-purple-500 rounded-xl p-4 hover-glow">
              <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.seconds}</div>
              <div className="text-purple-200 text-sm">Seconds</div>
            </div>
          </div>
        </div>

        {/* Enhanced waitlist form */}
        <div className="max-w-lg mx-auto mt-12">
          {!showConfirmation ? (
            <form onSubmit={handleWaitlistSignup} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter email for Creator Workshop access + 500 G-Chips"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input flex-1 text-lg py-4"
                  required
                />
                <Button 
                  type="submit"
                  className="btn-primary btn-large"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Sparkles className="mr-2 animate-spin" size={18} />
                      Reserving...
                    </>
                  ) : (
                    <>
                      <Crown className="mr-2" size={18} />
                      Reserve Creator Spot
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-sm text-gray-400">
                Free access + 500 G-Chips bonus at launch
              </p>
            </form>
          ) : (
            <div className="card-primary animate-scale-in">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="text-emerald-400 mr-2" size={24} />
                <h3 className="text-xl font-display font-bold text-white">Creator Status Reserved!</h3>
              </div>
              <p className="text-gray-300 mb-4">You're creator #{estimatedPosition.toLocaleString()} in our exclusive community</p>
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => navigate('/auth')}
                  className="flex-1 btn-primary btn-medium"
                >
                  Enter Creator Workshop
                </Button>
                <Button 
                  onClick={shareWaitlist}
                  variant="outline"
                  className="border-emerald-600 text-emerald-300 hover:bg-emerald-600/20"
                >
                  <Share2 size={16} />
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-400">
            <span>✨ Creator Workshop Access</span>
            <span>💎 500 G-Chips Bonus</span>
            <span>🏆 Founding Badge</span>
          </div>
        </div>

        {/* Enhanced social proof */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-lg hover-lift">
            <Calendar className="mr-2" size={16} />
            August 30, 2025
          </Badge>
          <Badge className="bg-gradient-to-r from-emerald-600 to-purple-600 text-white px-4 py-2 hover-lift">
            <Users className="mr-1" size={14} />
            {waitlistCount.toLocaleString()}+ Creators Building
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 hover-lift">
            <Trophy className="mr-1" size={14} />
            Early Access Guaranteed
          </Badge>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-emerald-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
