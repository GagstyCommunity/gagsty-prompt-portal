
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Play, Star, Users, TrendingUp, Eye } from 'lucide-react';

const CreatorGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const genres = ['All', 'Adventure', 'Puzzle', 'Racing', 'RPG', 'Strategy', 'Simulation'];

  const featuredGames = [
    {
      id: 1,
      title: 'Crystal Quest',
      creator: 'Alex Chen',
      genre: 'Adventure',
      originalPrompt: 'A space adventure where you collect crystals while avoiding asteroids',
      plays: 15420,
      rating: 4.8,
      revenue: '$2,340',
      thumbnail: '/placeholder.svg',
      featured: true
    },
    {
      id: 2,
      title: 'Dragon Rescue',
      creator: 'Sarah Kim',
      genre: 'RPG',
      originalPrompt: 'A medieval fantasy where you rescue dragons from evil wizards',
      plays: 12890,
      rating: 4.6,
      revenue: '$1,890',
      thumbnail: '/placeholder.svg',
      featured: false
    },
    {
      id: 3,
      title: 'Ocean Explorer',
      creator: 'Mike Rodriguez',
      genre: 'Adventure',
      originalPrompt: 'An underwater exploration game with mysterious sea creatures',
      plays: 9650,
      rating: 4.7,
      revenue: '$1,540',
      thumbnail: '/placeholder.svg',
      featured: false
    },
    {
      id: 4,
      title: 'Neon Racer',
      creator: 'Emma Wilson',
      genre: 'Racing',
      originalPrompt: 'A cyberpunk racing game through neon-lit city streets',
      plays: 18200,
      rating: 4.9,
      revenue: '$3,120',
      thumbnail: '/placeholder.svg',
      featured: true
    },
    {
      id: 5,
      title: 'Magic Academy',
      creator: 'David Park',
      genre: 'Simulation',
      originalPrompt: 'Manage a magic school and train young wizards',
      plays: 7830,
      rating: 4.5,
      revenue: '$1,200',
      thumbnail: '/placeholder.svg',
      featured: false
    },
    {
      id: 6,
      title: 'Puzzle Dimension',
      creator: 'Lisa Garcia',
      genre: 'Puzzle',
      originalPrompt: 'A mind-bending puzzle game that shifts between dimensions',
      plays: 11340,
      rating: 4.8,
      revenue: '$1,780',
      thumbnail: '/placeholder.svg',
      featured: false
    }
  ];

  const filteredGames = featuredGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.originalPrompt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || game.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Creator Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See real games created by our community from simple prompts
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search games, creators, or prompts..."
              className="pl-10 bg-gray-900/50 border-gray-700 text-white"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                className={selectedGenre === genre 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                  : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <Card key={game.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all group">
              <div className="relative">
                <img 
                  src={game.thumbnail} 
                  alt={game.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {game.featured && (
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                    Featured
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button className="bg-white text-black hover:bg-gray-200">
                    <Play size={16} className="mr-2" />
                    Play Game
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{game.title}</h3>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {game.genre}
                  </Badge>
                </div>
                
                <p className="text-gray-400 text-sm mb-3">by {game.creator}</p>
                
                <div className="bg-gray-800/50 p-3 rounded-lg mb-3">
                  <p className="text-gray-300 text-sm italic">
                    Original Prompt: "{game.originalPrompt}"
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-blue-400 mb-1">
                      <Play size={12} className="mr-1" />
                      <span className="font-medium">{game.plays.toLocaleString()}</span>
                    </div>
                    <span className="text-gray-500">Plays</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-yellow-400 mb-1">
                      <Star size={12} className="mr-1" />
                      <span className="font-medium">{game.rating}</span>
                    </div>
                    <span className="text-gray-500">Rating</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-green-400 mb-1">
                      <TrendingUp size={12} className="mr-1" />
                      <span className="font-medium">{game.revenue}</span>
                    </div>
                    <span className="text-gray-500">Revenue</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-gray-700 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Create Your Game?</h3>
              <p className="text-gray-300 mb-6">
                Join thousands of creators turning ideas into profitable games
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3">
                Submit Your Game Idea
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CreatorGallery;
