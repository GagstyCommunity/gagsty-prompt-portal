
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Star, Zap, Trophy, Crown } from 'lucide-react';

const BadgesLeaderboardPreview = () => {
  const navigate = useNavigate();

  const badges = [
    {
      icon: Shield,
      name: "Moderator",
      description: "Community guardian",
      color: "blue",
      earned: true
    },
    {
      icon: Zap,
      name: "Builder",
      description: "Game creator",
      color: "violet",
      earned: true
    },
    {
      icon: Star,
      name: "Tester",
      description: "Quality assurance",
      color: "orange",
      earned: false
    },
    {
      icon: Trophy,
      name: "Growth Hacker",
      description: "Community growth",
      color: "green",
      earned: false
    }
  ];

  const getColorClasses = (color: string, earned: boolean) => {
    if (!earned) return 'text-gray-500 bg-gray-800/30 border-gray-700';
    
    switch (color) {
      case 'blue': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'violet': return 'text-violet-400 bg-violet-500/20 border-violet-500/30';
      case 'orange': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'green': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Badges & Achievements
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock exclusive badges by contributing to the Gagsty ecosystem
          </p>
        </div>

        {/* Badge Examples */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className={`p-6 rounded-2xl border transition-all duration-300 hover:transform hover:scale-105 ${
                badge.earned ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-900/20 border-gray-800'
              }`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-4 ${getColorClasses(badge.color, badge.earned)}`}>
                  <Icon size={20} />
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 ${badge.earned ? 'text-white' : 'text-gray-500'}`}>
                  {badge.name}
                </h3>
                <p className={`text-sm ${badge.earned ? 'text-gray-400' : 'text-gray-600'}`}>
                  {badge.description}
                </p>
                
                {badge.earned && (
                  <Badge className="mt-3 bg-green-500/20 text-green-300 border-green-500/30">
                    Earned
                  </Badge>
                )}
              </div>
            );
          })}
        </div>

        {/* Leaderboard Preview */}
        <div className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Top Contributors</h3>
          
          <div className="space-y-4">
            {[
              { rank: 1, name: "CyberBuilder", chips: "12,847", badges: 8 },
              { rank: 2, name: "PixelMaster", chips: "9,234", badges: 6 },
              { rank: 3, name: "GameWizard", chips: "7,891", badges: 5 }
            ].map((user) => (
              <div key={user.rank} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                    user.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                    user.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {user.rank === 1 ? <Crown size={16} /> : `#${user.rank}`}
                  </div>
                  <span className="text-white font-semibold">{user.name}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-blue-400">{user.chips} G-Chips</span>
                  <Badge className="bg-violet-500/20 text-violet-300">
                    {user.badges} badges
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={() => navigate('/leaderboard')}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
          >
            View Full Leaderboard
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BadgesLeaderboardPreview;
