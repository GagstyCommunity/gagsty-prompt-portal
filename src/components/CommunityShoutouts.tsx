
import React, { useState, useEffect } from 'react';
import { Coins, Trophy, Users } from 'lucide-react';

const CommunityShoutouts = () => {
  const [currentShoutout, setCurrentShoutout] = useState(0);

  const shoutouts = [
    {
      text: "@CyberBuilder just earned 2,500 G-Chips for submitting the winning prompt!",
      icon: Trophy,
      type: "winner"
    },
    {
      text: "@PixelMaster reached 10,000 G-Chips milestone and unlocked the Builder badge!",
      icon: Coins,
      type: "milestone"
    },
    {
      text: "500+ creators joined the community this week. Welcome to the future!",
      icon: Users,
      type: "growth"
    },
    {
      text: "@GameWizard's 'Quantum Puzzle' concept got featured in our showcase!",
      icon: Trophy,
      type: "featured"
    },
    {
      text: "Daily active creators increased by 156% this month. Keep building!",
      icon: Users,
      type: "stats"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShoutout((prev) => (prev + 1) % shoutouts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [shoutouts.length]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'winner': return 'from-yellow-500 to-orange-500';
      case 'milestone': return 'from-blue-500 to-violet-500';
      case 'growth': return 'from-green-500 to-emerald-500';
      case 'featured': return 'from-violet-500 to-purple-500';
      case 'stats': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Community Highlights
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Celebrating our amazing creators and their achievements
          </p>
        </div>

        {/* Rotating Shoutouts */}
        <div className="relative h-24 overflow-hidden">
          {shoutouts.map((shoutout, index) => {
            const Icon = shoutout.icon;
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === currentShoutout 
                    ? 'translate-y-0 opacity-100' 
                    : index < currentShoutout 
                      ? '-translate-y-full opacity-0' 
                      : 'translate-y-full opacity-0'
                }`}
              >
                <div className={`bg-gradient-to-r ${getTypeColor(shoutout.type)} p-6 rounded-2xl text-white text-center shadow-2xl`}>
                  <div className="flex items-center justify-center mb-2">
                    <Icon size={20} className="mr-2" />
                  </div>
                  <p className="text-lg font-medium">{shoutout.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {shoutouts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentShoutout(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentShoutout 
                  ? 'bg-blue-400 w-8' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityShoutouts;
