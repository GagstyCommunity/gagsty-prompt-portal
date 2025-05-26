
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Share2, Users, Calendar, Clock, CheckCircle, Sparkles } from 'lucide-react';

const StreamlinedHero = () => {
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
            title: "Welcome back, Creator! 🚀",
            description: "You're already part of the exclusive Gagsty waitlist!",
          });
          navigate('/dashboard');
        } else {
          localStorage.setItem('waitlist_email', email);
          setShowConfirmation(true);
          toast({
            title: "Welcome to the Future of Gaming! 🎮",
            description: "Check your email to complete your waitlist registration!",
          });
        }
        setLoading(false);
      }, 1000);
    }
  };

  const handleSocialShare = (platform: string) => {
    const shareText = "Just joined the @Gagsty waitlist! 🎮 Turn text into playable games with AI. Who else is building the future of gaming?";
    const shareUrl = window.location.href;
    
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Simplified animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-50" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 shadow-2xl transform hover:scale-105 transition-transform">
            <span className="text-2xl font-bold text-white">GAGSTY</span>
          </div>
        </div>

        {/* Main headline */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Turn Text into
            </span>
            <br />
            <span className="text-white">Playable Games</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              in Minutes
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join 2,847+ creators building the future of AI-powered game development
          </p>
        </div>

        {/* Three key value points */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
          <div className="flex items-center">
            <Sparkles className="mr-2 text-purple-400" size={16} />
            No Coding Required
          </div>
          <div className="flex items-center">
            <CheckCircle className="mr-2 text-emerald-400" size={16} />
            60% Revenue Share
          </div>
          <div className="flex items-center">
            <Users className="mr-2 text-blue-400" size={16} />
            True Game Ownership
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 rounded-2xl p-6 border border-purple-700/50 max-w-md mx-auto">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center">
            <Calendar className="mr-2" size={20} />
            Platform Launches In:
          </h3>
          <div className="grid grid-cols-4 gap-4">
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

        {/* Waitlist signup form */}
        <div className="max-w-md mx-auto">
          {!showConfirmation ? (
            <form onSubmit={handleWaitlistSignup} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Reserve your creator spot with email"
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
                      <Clock className="mr-2 animate-spin" size={18} />
                      Joining...
                    </>
                  ) : (
                    'Reserve Creator Spot'
                  )}
                </Button>
              </div>
              
              <p className="text-sm text-gray-400">
                Free access + 500 G-Chips bonus at launch
              </p>
            </form>
          ) : (
            <div className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 rounded-lg p-6 border border-purple-700/50">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="text-emerald-400 mr-2" size={24} />
                <h3 className="text-xl font-bold text-white">Spot Reserved!</h3>
              </div>
              <p className="text-gray-300 mb-4">You're now #{estimatedPosition.toLocaleString()} on our waitlist</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => navigate('/auth')}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700"
                >
                  Complete Profile
                </Button>
                <Button 
                  onClick={() => handleSocialShare('twitter')}
                  variant="outline"
                  className="flex-1 border-purple-600 text-purple-300 hover:bg-purple-600 hover:text-white"
                >
                  <Share2 className="mr-2" size={16} />
                  Share
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Benefits summary */}
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
          <span>✅ Free to join</span>
          <span>🎁 500 Chips bonus</span>
          <span>🚀 Early access guaranteed</span>
        </div>
      </div>
    </section>
  );
};

export default StreamlinedHero;
