
import React, { useState } from 'react';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trophy, Clock, Users, Filter, Search, TrendingUp, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PromptBattle = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [filterBy, setFilterBy] = useState('all');

  // Mock data for prompts
  const mockPrompts = [
    {
      id: 1,
      title: "Cyberpunk Cat Café",
      description: "A cozy management game where you run a café for cybernetic cats in a neon-lit city. Serve digital treats and upgrade your feline friends with the latest tech.",
      genre: "simulation",
      creator: "NeonDreamer",
      votes: 127,
      timeLeft: "2d 14h",
      status: "trending",
      thumbnail: "🐱"
    },
    {
      id: 2,
      title: "Quantum Puzzle Realms",
      description: "Mind-bending puzzle game where players manipulate quantum mechanics to solve increasingly complex challenges across parallel dimensions.",
      genre: "puzzle",
      creator: "PhysicsGuru",
      votes: 89,
      timeLeft: "4d 8h",
      status: "new",
      thumbnail: "🔬"
    },
    {
      id: 3,
      title: "Dragon Merchant Empire",
      description: "Build a trading empire with dragons as your business partners. Navigate politics, manage resources, and establish trade routes across mystical kingdoms.",
      genre: "strategy",
      creator: "FantasyBuilder",
      votes: 203,
      timeLeft: "1d 3h",
      status: "hot",
      thumbnail: "🐉"
    },
    {
      id: 4,
      title: "Eco-Warrior Platformer",
      description: "An action-platformer where you play as nature spirits fighting to restore balance to a polluted world. Use elemental powers to heal the environment.",
      genre: "action",
      creator: "EcoHero",
      votes: 156,
      timeLeft: "3d 12h",
      status: "rising",
      thumbnail: "🌱"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'trending': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'hot': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'rising': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'new': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getGenreColor = (genre: string) => {
    switch (genre) {
      case 'action': return 'bg-red-500/20 text-red-300';
      case 'puzzle': return 'bg-purple-500/20 text-purple-300';
      case 'strategy': return 'bg-yellow-500/20 text-yellow-300';
      case 'simulation': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <EnhancedHeader />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Vote on the Next Hit Game Ideas
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The community decides which games get built. Vote for your favorites in the Prompt Battle Arena and watch them come to life!
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search prompts..."
                  className="bg-gray-800 border-gray-700 text-white pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
                >
                  <option value="trending">Trending</option>
                  <option value="newest">Newest</option>
                  <option value="most-votes">Most Votes</option>
                  <option value="ending-soon">Ending Soon</option>
                </select>

                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
                >
                  <option value="all">All Genres</option>
                  <option value="action">Action</option>
                  <option value="puzzle">Puzzle</option>
                  <option value="strategy">Strategy</option>
                  <option value="simulation">Simulation</option>
                  <option value="rpg">RPG</option>
                </select>
              </div>
            </div>

            <Button 
              onClick={() => navigate('/submit')}
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 px-6 py-2"
            >
              Submit New Prompt
            </Button>
          </div>

          {/* How Voting Works */}
          <div className="mb-12 p-6 bg-gradient-to-r from-blue-900/20 to-violet-900/20 rounded-2xl border border-blue-500/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Trophy className="mr-2 text-yellow-500" />
              Your Vote Matters
            </h2>
            <p className="text-gray-300 mb-4">
              Browse the submitted game prompts. Read the descriptions and consider their potential. Cast your vote for the ideas you believe should be developed by Gagsty and the community. Winning prompts move to the next stage, and active voters earn G-Chips!
            </p>
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-300 hover:bg-blue-500/20"
              onClick={() => navigate('/about')}
            >
              Learn more about G-Chips
            </Button>
          </div>

          {/* Prompt Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockPrompts.map((prompt) => (
              <Card key={prompt.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(prompt.status)}>
                        {prompt.status === 'trending' && <TrendingUp size={12} className="mr-1" />}
                        {prompt.status.toUpperCase()}
                      </Badge>
                      <Badge className={getGenreColor(prompt.genre)}>
                        {prompt.genre.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-orange-400 text-sm">
                        <Clock size={12} className="mr-1" />
                        {prompt.timeLeft}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{prompt.thumbnail}</div>
                    <div>
                      <CardTitle className="text-white text-lg leading-tight">
                        {prompt.title}
                      </CardTitle>
                      <p className="text-gray-400 text-sm">by @{prompt.creator}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {prompt.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-blue-400">
                      <Heart size={16} className="mr-1" />
                      <span className="font-semibold">{prompt.votes}</span>
                      <span className="text-gray-400 ml-1 text-sm">votes</span>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => {
                        // This would require login
                        navigate('/auth');
                      }}
                    >
                      Vote Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-700 px-8 py-3"
            >
              Load More Prompts
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PromptBattle;
