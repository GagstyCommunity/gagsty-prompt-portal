
import React from 'react';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Footer from '../components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, Clock, Flame, Filter } from 'lucide-react';

const PromptBattle = () => {
  const battles = [
    {
      id: 1,
      title: "Cyberpunk Cat Café",
      description: "A cozy management game where you run a cat café in a neon-lit cyberpunk city. Customers are hackers, androids, and street cats. Manage resources, customize your café, and unlock new cybernetic cat breeds.",
      genre: "Simulation",
      upvotes: 127,
      timeLeft: "2d 14h",
      author: "NeonDreamer",
      trending: true,
      status: "active"
    },
    // Add more battles...
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <EnhancedHeader />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
              <Flame className="mr-2" size={16} />
              PROMPT BATTLE ARENA
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Vote on Game Ideas
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              The community decides which games get built. Vote for your favorites and watch them come to life!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600">
                Submit New Prompt
              </Button>
              <Button variant="outline" className="border-orange-500 text-orange-300 hover:bg-orange-500/20">
                <Filter className="mr-2" size={16} />
                Filter Results
              </Button>
            </div>
          </div>

          {/* Battle Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {battles.map((battle) => (
              <div key={battle.id} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-2">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {battle.genre}
                    </Badge>
                    {battle.trending && (
                      <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                        <Flame size={12} className="mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock size={14} className="mr-1" />
                    {battle.timeLeft}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{battle.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    {battle.description}
                  </p>
                  <p className="text-xs text-gray-500">by @{battle.author}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-blue-400">
                    <ThumbsUp size={16} className="mr-2" />
                    <span className="font-semibold">{battle.upvotes}</span>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white"
                  >
                    Vote Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PromptBattle;
