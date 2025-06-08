
import React, { useState, useEffect } from 'react';
import { Clock, Zap, Calendar, Star } from 'lucide-react';
import { PremiumCard } from '@/components/ui/premium-card';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LaunchTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-08-30T00:00:00Z');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <PremiumCard variant="gradient" className="p-12 text-center relative overflow-hidden">
          {/* Background animations */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse" />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Calendar className="text-[#16FF6F] animate-pulse" size={32} />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Official Launch Countdown
              </h2>
              <Calendar className="text-[#16FF6F] animate-pulse" size={32} />
            </div>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              The future of AI-powered game creation launches in
            </p>
            
            {/* Timer Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-wider">DAYS</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-wider">HOURS</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-wider">MINS</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent mb-2">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-wider">SECS</div>
              </div>
            </div>
            
            {/* Launch Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center space-x-2 text-white/80">
                <Star className="text-yellow-400" size={20} />
                <span className="text-sm">Early Access Guaranteed</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-white/80">
                <Zap className="text-blue-400" size={20} />
                <span className="text-sm">Bonus Rewards Unlocked</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-white/80">
                <Clock className="text-purple-400" size={20} />
                <span className="text-sm">VIP Community Access</span>
              </div>
            </div>
            
            <p className="text-white/60 text-sm">
              Join the waitlist now to secure your spot and earn exclusive launch bonuses!
            </p>
          </div>
        </PremiumCard>
      </div>
    </section>
  );
};

export default LaunchTimer;
