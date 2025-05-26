
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Heart, Share2, Trophy, Filter, Grid, List, Clock, Calendar } from 'lucide-react';

const CreatorGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const featuredGames = [
    {
      id: 1,
      title: "Neon Runner 2077",
      creator: "Alex Chen",
      prompt: "A cyberpunk runner avoiding obstacles in a neon city",
      genre: "Action",
      image: "🏃‍♂️",
      plays: 25847,
      likes: 1203,
      rating: 4.8,
      chips: 2500,
      featured: true,
      description: "High-speed cyberpunk action with stunning neon visuals",
      tags: ["Fast-Paced", "Cyberpunk", "Leaderboards"],
      status: "concept"
    },
    {
      id: 2,
      title: "Mystical Garden",
      creator: "Sofia Rodriguez", 
      prompt: "A peaceful garden where magical creatures help you grow plants",
      genre: "Simulation",
      image: "🌸",
      plays: 18234,
      likes: 892,
      rating: 4.9,
      chips: 1800,
      featured: true,
      description: "Zen gardening experience with magical companions",
      tags: ["Relaxing", "Magic", "Zen"],
      status: "concept"
    },
    {
      id: 3,
      title: "Space Miners",
      creator: "Mike Johnson",
      prompt: "Mining asteroids for rare crystals in deep space",
      genre: "Strategy",
      image: "⛏️",
      plays: 31205,
      likes: 1456,
      rating: 4.7,
      chips: 3100,
      featured: false,
      description: "Strategic resource management in the depths of space",
      tags: ["Strategy", "Resource Management", "Space"],
      status: "concept"
    },
    {
      id: 4,
      title: "Melody Puzzle",
      creator: "Emma Wilson",
      prompt: "Connect musical notes to create beautiful songs",
      genre: "Puzzle",
      image: "🎵",
      plays: 12876,
      likes: 634,
      rating: 4.6,
      chips: 1200,
      featured: false,
      description: "Create music while solving challenging puzzles",
      tags: ["Music", "Creative", "Brain Training"],
      status: "concept"
    },
    {
      id: 5,
      title: "Dragon Academy",
      creator: "Raj Patel",
      prompt: "Train dragons and compete in aerial tournaments",
      genre: "Adventure",
      image: "🐉",
      plays: 22341,
      likes: 1089,
      rating: 4.8,
      chips: 2200,
      featured: true,
      description: "Epic dragon training and tournament battles",
      tags: ["Dragons", "Training", "Competition"],
      status: "concept"
    },
    {
      id: 6,
      title: "Quantum Lab",
      creator: "Lisa Chang",
      prompt: "Solve physics puzzles by manipulating quantum particles",
      genre: "Educational",
      image: "⚛️",
      plays: 8905,
      likes: 445,
      rating: 4.5,
      chips: 890,
      featured: false,
      description: "Learn quantum physics through interactive puzzles",
      tags: ["Educational", "Science", "Mind Bending"],
      status: "concept"
    }
  ];

  const genres = ['all', 'Action', 'Strategy', 'Puzzle', 'Simulation', 'Adventure', 'Educational'];

  const filteredGames = featuredGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || game.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const featuredGamesList = filteredGames.filter(game => game.featured);
  const regularGamesList = filteredGames.filter(game => !game.featured);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Future Creator Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Preview amazing game concepts that will be created by our community
          </p>
          <Badge className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-4 py-2">
            <Calendar className="mr-2" size={16} />
            Games Available August 30, 2025
          </Badge>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              placeholder="Search game concepts, creators, or prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
          
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-full md:w-48 bg-gray-900 border-gray-700 text-white">
              <Filter className="mr-2" size={16} />
              <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              {genres.map(genre => (
                <SelectItem key={genre} value={genre} className="text-white">
                  {genre === 'all' ? 'All Genres' : genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex bg-gray-900 border border-gray-700 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="text-white"
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="text-white"
            >
              <List size={16} />
            </Button>
          </div>
        </div>

        {/* Featured Games */}
        {featuredGamesList.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Trophy className="text-purple-500 mr-2" size={24} />
              <h3 className="text-2xl font-bold text-white">Featured Concepts</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGamesList.map(game => (
                <Card key={game.id} className="bg-gradient-to-br from-purple-900/30 to-emerald-900/30 border-purple-700/50 hover:border-purple-600/70 transition-all group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{game.image}</div>
                      <Badge className="bg-purple-600 text-white">Featured</Badge>
                    </div>
                    
                    <h4 className="text-xl font-bold text-white mb-2">{game.title}</h4>
                    <p className="text-gray-300 text-sm mb-2">by {game.creator}</p>
                    
                    <div className="bg-gray-800/50 p-3 rounded-lg mb-4">
                      <p className="text-gray-400 text-xs">Original Prompt:</p>
                      <p className="text-gray-300 text-sm italic">"{game.prompt}"</p>
                    </div>

                    <p className="text-gray-300 text-sm mb-4">{game.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {game.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                      <span>🎯 Concept</span>
                      <span>❤️ {game.likes}</span>
                      <span>⭐ {game.rating}</span>
                      <span>💎 {game.chips}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700">
                        <Eye className="mr-2" size={16} />
                        Preview Concept
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300">
                        <Heart size={16} />
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300">
                        <Share2 size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Games Grid */}
        {regularGamesList.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Community Concepts</h3>
            
            <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {regularGamesList.map(game => (
                <Card key={game.id} className={`bg-gray-900/50 border-gray-700 hover:border-purple-600 transition-all ${viewMode === 'list' ? 'p-4' : ''}`}>
                  <CardContent className={viewMode === 'list' ? "flex items-center space-x-6" : "p-6"}>
                    {viewMode === 'list' ? (
                      <>
                        <div className="text-3xl">{game.image}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-lg font-bold text-white">{game.title}</h4>
                            <Badge className="bg-purple-700 text-gray-300">{game.genre}</Badge>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">by {game.creator}</p>
                          <p className="text-gray-300 text-sm">{game.description}</p>
                        </div>
                        <div className="text-right text-sm text-gray-400">
                          <div>🎯 Concept</div>
                          <div>⭐ {game.rating}</div>
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          <Clock className="mr-2" size={16} />
                          Coming Soon
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-3xl">{game.image}</div>
                          <Badge className="bg-purple-700 text-gray-300">{game.genre}</Badge>
                        </div>
                        
                        <h4 className="text-lg font-bold text-white mb-1">{game.title}</h4>
                        <p className="text-gray-400 text-sm mb-3">by {game.creator}</p>
                        <p className="text-gray-300 text-sm mb-4">{game.description}</p>

                        <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                          <span>🎯 Concept</span>
                          <span>❤️ {game.likes}</span>
                          <span>⭐ {game.rating}</span>
                        </div>

                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <Clock className="mr-2" size={16} />
                          Coming August 30
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 border-purple-700/50 p-8">
            <CardContent>
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Create Your Own Games?</h3>
              <p className="text-gray-300 mb-6">Join our waitlist to be first to create when we launch on August 30, 2025</p>
              <Button className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 px-8 py-3">
                Join Waitlist Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CreatorGallery;
