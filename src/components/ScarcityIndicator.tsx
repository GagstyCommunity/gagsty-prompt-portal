
import React, { useState, useEffect } from 'react';
import { Clock, Users, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ScarcityIndicator = () => {
  const [betaSpots, setBetaSpots] = useState(156);
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 7,
    minutes: 34
  });

  useEffect(() => {
    // Simulate spots being taken
    const spotsInterval = setInterval(() => {
      if (Math.random() > 0.8 && betaSpots > 50) { // 20% chance every 30 seconds
        setBetaSpots(prev => prev - 1);
      }
    }, 30000);

    // Update countdown timer
    const timeInterval = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes } = prev;
        
        if (minutes > 0) {
          minutes--;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
        }
        
        return { days, hours, minutes };
      });
    }, 60000); // Update every minute

    return () => {
      clearInterval(spotsInterval);
      clearInterval(timeInterval);
    };
  }, [betaSpots]);

  const urgencyLevel = betaSpots < 100 ? 'high' : betaSpots < 200 ? 'medium' : 'low';
  
  const getUrgencyStyles = () => {
    switch (urgencyLevel) {
      case 'high':
        return {
          bg: 'bg-gradient-to-r from-red-600/20 to-orange-600/20',
          border: 'border-red-500/50',
          text: 'text-red-400',
          pulse: 'animate-pulse'
        };
      case 'medium':
        return {
          bg: 'bg-gradient-to-r from-yellow-600/20 to-orange-600/20',
          border: 'border-yellow-500/50',
          text: 'text-yellow-400',
          pulse: ''
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-green-600/20 to-blue-600/20',
          border: 'border-green-500/50',
          text: 'text-green-400',
          pulse: ''
        };
    }
  };

  const styles = getUrgencyStyles();

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-xl p-6 ${styles.pulse}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className={styles.text} size={20} />
          <h3 className="text-gagsty-primary font-bold">Limited Beta Access</h3>
        </div>
        <Badge className={`${styles.text} bg-transparent border-current`}>
          {urgencyLevel === 'high' ? 'Almost Full!' : urgencyLevel === 'medium' ? 'Filling Fast' : 'Available'}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Beta Spots Counter */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className={styles.text} size={24} />
          </div>
          <div className={`text-3xl font-bold ${styles.text} mb-1`}>
            {betaSpots}
          </div>
          <p className="text-gagsty-secondary text-sm">
            Beta spots remaining
          </p>
          <div className="mt-2 bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full ${urgencyLevel === 'high' ? 'bg-red-500' : urgencyLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'} transition-all duration-500`}
              style={{ width: `${(betaSpots / 500) * 100}%` }}
            />
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className={styles.text} size={24} />
          </div>
          <div className="flex justify-center space-x-2 mb-1">
            <div className="text-center">
              <div className={`text-lg font-bold ${styles.text}`}>{timeLeft.days}</div>
              <div className="text-xs text-gagsty-muted">days</div>
            </div>
            <div className={`text-lg ${styles.text}`}>:</div>
            <div className="text-center">
              <div className={`text-lg font-bold ${styles.text}`}>{timeLeft.hours}</div>
              <div className="text-xs text-gagsty-muted">hrs</div>
            </div>
            <div className={`text-lg ${styles.text}`}>:</div>
            <div className="text-center">
              <div className={`text-lg font-bold ${styles.text}`}>{timeLeft.minutes}</div>
              <div className="text-xs text-gagsty-muted">min</div>
            </div>
          </div>
          <p className="text-gagsty-secondary text-sm">
            Until launch week
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-gagsty-secondary text-sm">
          {urgencyLevel === 'high' 
            ? "🔥 Last chance to secure your spot!" 
            : urgencyLevel === 'medium' 
            ? "⚡ Join thousands of creators already building" 
            : "🚀 Be among the first to experience AI game creation"
          }
        </p>
      </div>
    </div>
  );
};

export default ScarcityIndicator;
