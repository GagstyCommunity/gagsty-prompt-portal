
import React from 'react';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Footer from '../components/Footer';
import { Badge } from '@/components/ui/badge';
import { Crown, Trophy, Star, Zap } from 'lucide-react';

const Leaderboard = () => {
  const topCreators = [
    { rank: 1, name: "CyberBuilder", chips: "12,847", badges: 8, avatar: "🤖" },
    { rank: 2, name: "PixelMaster", chips: "9,234", badges: 6, avatar: "🎨" },
    { rank: 3, name: "GameWizard", chips: "7,891", badges: 5, avatar: "🧙‍♂️" },
    // Add more users...
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <EnhancedHeader />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Creator Leaderboard
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Celebrating our top contributors and badge collectors
            </p>
          </div>

          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {topCreators.slice(0, 3).map((creator) => (
              <div key={creator.rank} className={`text-center p-6 rounded-2xl border ${
                creator.rank === 1 ? 'bg-yellow-500/10 border-yellow-500/30' :
                creator.rank === 2 ? 'bg-gray-400/10 border-gray-400/30' :
                'bg-orange-500/10 border-orange-500/30'
              }`}>
                <div className="text-4xl mb-4">{creator.avatar}</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  creator.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                  creator.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {creator.rank === 1 ? <Crown size={16} /> : `#${creator.rank}`}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{creator.name}</h3>
                <p className="text-blue-400 mb-2">{creator.chips} G-Chips</p>
                <Badge className="bg-violet-500/20 text-violet-300">
                  {creator.badges} badges
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
