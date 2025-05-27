
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, Clock, Flame } from 'lucide-react';

const PromptBattlePreview = () => {
  const navigate = useNavigate();

  const promptBattles = [
    {
      id: 1,
      title: "Cyberpunk Cat Café",
      description: "A cozy management game where you run a cat café in a neon-lit cyberpunk city...",
      genre: "Simulation",
      upvotes: 127,
      timeLeft: "2d 14h",
      author: "NeonDreamer",
      trending: true
    },
    {
      id: 2,
      title: "Dragon Chess Master",
      description: "Epic chess battles where pieces transform into mythical creatures...",
      genre: "Strategy",
      upvotes: 89,
      timeLeft: "4d 8h",
      author: "ChessWizard",
      trending: false
    },
    {
      id: 3,
      title: "Quantum Garden",
      description: "Grow plants that exist in multiple dimensions simultaneously...",
      genre: "Puzzle",
      upvotes: 156,
      timeLeft: "1d 2h",
      author: "QuantumGardener",
      trending: true
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
            <Flame className="mr-2" size={16} />
            PROMPT BATTLE LIVE
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Community Game Ideas
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Vote on the best game concepts. Top 3 get built by our team!
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {promptBattles.map((prompt) => (
            <div key={prompt.id} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-2">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {prompt.genre}
                  </Badge>
                  {prompt.trending && (
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                      <Flame size={12} className="mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock size={14} className="mr-1" />
                  {prompt.timeLeft}
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">{prompt.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  {prompt.description}
                </p>
                <p className="text-xs text-gray-500">by @{prompt.author}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-blue-400">
                  <ThumbsUp size={16} className="mr-2" />
                  <span className="font-semibold">{prompt.upvotes}</span>
                </div>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white"
                  onClick={() => navigate('/battle')}
                >
                  Vote Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={() => navigate('/battle')}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
          >
            View All Battles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PromptBattlePreview;
