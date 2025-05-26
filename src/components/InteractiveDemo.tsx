
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wand2, Gamepad2, Sparkles, Play, Share2 } from 'lucide-react';

const InteractiveDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGame, setGeneratedGame] = useState<any>(null);

  const demoGames = [
    {
      prompt: "A space explorer collecting crystals on alien planets",
      title: "Crystal Galaxy Quest",
      genre: "Adventure",
      description: "Navigate through 12 unique alien worlds, collect rare crystals, and upgrade your spaceship.",
      features: ["3D Environments", "Upgrade System", "12 Levels"],
      image: "🚀",
      stats: { plays: 2847, rating: 4.8 }
    },
    {
      prompt: "A ninja cat avoiding obstacles in a neon city",
      title: "Neon Cat Ninja",
      genre: "Platformer", 
      description: "High-speed parkour action with a cyberpunk cat hero through neon-lit cityscapes.",
      features: ["Fast-Paced Action", "Combo System", "Leaderboards"],
      image: "🐱‍👤",
      stats: { plays: 5621, rating: 4.9 }
    },
    {
      prompt: "A puzzle game where you connect colored dots to create music",
      title: "Harmony Dots",
      genre: "Puzzle",
      description: "Create beautiful melodies by connecting colored dots in this zen puzzle experience.",
      features: ["Music Creation", "Zen Mode", "Share Compositions"],
      image: "🎵",
      stats: { plays: 3412, rating: 4.7 }
    }
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const randomGame = demoGames[Math.floor(Math.random() * demoGames.length)];
      setGeneratedGame({
        ...randomGame,
        prompt: prompt,
        title: `${prompt.split(' ').slice(0, 3).join(' ')} Game`,
        description: `An AI-generated game based on: "${prompt}"`
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              See AI Magic in Action
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Type any game idea below and watch our AI transform it into a playable game concept
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gray-900/50 border-gray-700 p-8">
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="e.g., A wizard brewing potions in a magical forest..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 text-lg py-4"
                  />
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 animate-spin" size={20} />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2" size={20} />
                      Create Game
                    </>
                  )}
                </Button>
              </div>

              {/* Generated Game Preview */}
              {generatedGame && (
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-700/50">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{generatedGame.image}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{generatedGame.title}</h3>
                      <Badge className="bg-purple-600 text-white">{generatedGame.genre}</Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{generatedGame.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {generatedGame.features.map((feature: string, index: number) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>🎮 {generatedGame.stats.plays.toLocaleString()} plays</span>
                      <span>⭐ {generatedGame.stats.rating}/5.0</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Play className="mr-2" size={16} />
                        Try Demo
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300">
                        <Share2 className="mr-2" size={16} />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Example Games Gallery */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Popular AI-Generated Games</h3>
          <p className="text-gray-400">Created by our community using simple prompts</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {demoGames.map((game, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{game.image}</div>
                  <h4 className="text-lg font-bold text-white">{game.title}</h4>
                  <Badge className="bg-blue-600 text-white">{game.genre}</Badge>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{game.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <span>🎮 {game.stats.plays.toLocaleString()}</span>
                  <span>⭐ {game.stats.rating}</span>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Gamepad2 className="mr-2" size={16} />
                  Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
