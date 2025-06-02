
import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LaunchTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2024-08-30T00:00:00Z');
    
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
    <div className="gagsty-launch-timer">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Zap className="text-[#16FF6F] animate-pulse" size={24} />
          <h3 className="text-lg font-semibold text-gagsty-gradient">Launching In</h3>
          <Zap className="text-[#16FF6F] animate-pulse" size={24} />
        </div>
        
        <div className="gagsty-timer-display">
          <div className="gagsty-timer-unit">
            <div className="gagsty-timer-number">{timeLeft.days.toString().padStart(2, '0')}</div>
            <div className="gagsty-timer-label">DAYS</div>
          </div>
          <div className="gagsty-timer-separator">:</div>
          <div className="gagsty-timer-unit">
            <div className="gagsty-timer-number">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="gagsty-timer-label">HOURS</div>
          </div>
          <div className="gagsty-timer-separator">:</div>
          <div className="gagsty-timer-unit">
            <div className="gagsty-timer-number">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="gagsty-timer-label">MINS</div>
          </div>
          <div className="gagsty-timer-separator">:</div>
          <div className="gagsty-timer-unit">
            <div className="gagsty-timer-number">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="gagsty-timer-label">SECS</div>
          </div>
        </div>
        
        <p className="text-gagsty-secondary text-sm">
          Sign up for early access & get bonus Gagsty Chips!
        </p>
      </div>
    </div>
  );
};

export default LaunchTimer;
