
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Trophy, GamepadIcon, Shield, Play, Users, Coins, Clock, Star } from 'lucide-react';
import ParticleBackground from '../ParticleBackground';

const ProfessionalHero = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate time until August 2025 launch
  useEffect(() => {
    const targetDate = new Date('2025-08-01T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      <ParticleBackground />
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-12">
          {/* Launch Status Badge */}
          <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-xl border border-orange-500/30 group hover:scale-105 transition-transform duration-300">
            <Clock className="w-6 h-6 text-orange-400 mr-3 group-hover:animate-spin" />
            <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              🚀 Launching August 2025 • Early Access Available
            </span>
          </div>

          {/* Main Headlines */}
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-[#A084FF] via-[#00C6FB] to-[#16FF6F] bg-clip-text text-transparent block mb-4">
                The Future of Gaming
              </span>
              <span className="text-gagsty-primary text-4xl sm:text-5xl lg:text-6xl xl:text-7xl block">
                Starts With Your Ideas
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gagsty-secondary max-w-5xl mx-auto leading-relaxed font-light">
              Join <span className="text-[#00C6FB] font-semibold">50,000+ creators</span> building the future of AI gaming. 
              Submit your concept. Let our AI + community bring it to life. <span className="text-[#16FF6F] font-semibold">You earn rewards.</span>
            </p>
          </div>

          {/* Professional Countdown Timer */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-black/40 via-gray-900/40 to-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                Launch Countdown
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((item, index) => (
                  <div key={item.label} className="text-center">
                    <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl rounded-xl border border-white/10 p-6 shadow-lg">
                      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm font-medium text-white/70 mt-2 uppercase tracking-wider">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Feature Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.text}</h3>
                <p className="text-sm text-white/70">{feature.tooltip}</p>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
            <Button 
              onClick={() => navigate('/auth')} 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 group"
            >
              <Coins className="mr-3 group-hover:rotate-12 transition-transform" size={24} />
              Join the Revolution
              <div className="ml-2 text-sm opacity-90">+ 500 Chips Bonus</div>
            </Button>
            <Button 
              onClick={() => navigate('/prompt-battle')} 
              className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white text-xl px-12 py-6 rounded-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Play className="mr-3" size={24} />
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/60 mt-12">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white/20 ${
                    i === 0 ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
                    i === 1 ? 'bg-gradient-to-r from-blue-600 to-teal-600' :
                    i === 2 ? 'bg-gradient-to-r from-green-600 to-yellow-600' :
                    i === 3 ? 'bg-gradient-to-r from-orange-600 to-red-600' :
                    'bg-gradient-to-r from-pink-600 to-purple-600'
                  }`} />
                ))}
              </div>
              <span className="text-lg">50,000+ Creators Joined</span>
            </div>
            <div className="text-lg">
              <span className="text-green-400 font-semibold">Limited</span> Early Access Spots
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalHero;
