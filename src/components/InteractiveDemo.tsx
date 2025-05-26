
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wand2, Gamepad2, Sparkles, Eye, Share2, Clock, Calendar, Save, Bookmark, DollarSign } from 'lucide-react';

const InteractiveDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGame, setGeneratedGame] = useState<any>(null);
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);

  const demoGames = [
    {
      prompt: "A space explorer collecting crystals on alien planets",
      title: "Crystal Galaxy Quest",
      genre: "Adventure",
      description: "Navigate through 12 unique alien worlds, collect rare crystals, and upgrade your spaceship.",
      features: ["3D Environments", "Upgrade System", "12 Levels"],
      mechanics: ["Resource Collection", "Ship Upgrades", "Planet Exploration", "Alien Encounters", "Crystal Trading"],
      image: "🚀",
      stats: { plays: 2847, rating: 4.8 },
      earningPotential: "$1,200-3,500/month",
      visual: "Stunning 3D alien landscapes with glowing crystal formations"
    },
    {
      prompt: "A ninja cat avoiding obstacles in a neon city",
      title: "Neon Cat Ninja",
      genre: "Platformer", 
      description: "High-speed parkour action with a cyberpunk cat hero through neon-lit cityscapes.",
      features: ["Fast-Paced Action", "Combo System", "Leaderboards"],
      mechanics: ["Wall Running", "Double Jumps", "Stealth Mode", "Combo Chains", "Time Challenges"],
      image: "🐱‍👤",
      stats: { plays: 5621, rating: 4.9 },
      earningPotential: "$800-2,100/month",
      visual: "Vibrant cyberpunk cityscape with neon lights and futuristic architecture"
    },
    {
      prompt: "A puzzle game where you connect colored dots to create music",
      title: "Harmony Dots",
      genre: "Puzzle",
      description: "Create beautiful melodies by connecting colored dots in this zen puzzle experience.",
      features: ["Music Creation", "Zen Mode", "Share Compositions"],
      mechanics: ["Pattern Matching", "Music Theory", "Creative Mode", "Social Sharing", "Audio Visualization"],
      image: "🎵",
      stats: { plays: 3412, rating: 4.7 },
      earningPotential: "$600-1,800/month",
      visual: "Minimalist interface with flowing musical notes and color-reactive animations"
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
        description: `An AI-generated game concept based on: "${prompt}"`
      });
      setIsGenerating(false);
    }, 2000);
  };

  const savePrompt = () => {
    if (prompt && !savedPrompts.includes(prompt)) {
      setSavedPrompts([...savedPrompts, prompt]);
    }
  };

  const shareGame = () => {
    if (generatedGame) {
      const shareText = `Check out this amazing game concept I created with AI: "${generatedGame.title}" - ${generatedGame.description}`;
      if (navigator.share) {
        navigator.share({
          title: generatedGame.title,
          text: shareText,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(shareText);
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Test AI Magic Now
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Try our AI game concept generator - available during waitlist period
          </p>
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2">
            <Calendar className="mr-2" size={16} />
            Full Creation Tools Launch August 30, 2025
          </Badge>
        </div>

        {/* Interactive Demo */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gray-900/50 border-purple-700 p-8">
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="e.g., A wizard brewing potions in a magical forest..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-gray-800 border-purple-600 text-white placeholder-gray-400 text-lg py-4 focus:border-purple-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 px-8 py-4 text-lg"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 animate-spin" size={20} />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2" size={20} />
                        Test Demo
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={savePrompt}
                    variant="outline"
                    className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
                    disabled={!prompt.trim()}
                  >
                    <Save size={20} />
                  </Button>
                </div>
              </div>

              {/* Saved Prompts */}
              {savedPrompts.length > 0 && (
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-700/50">
                  <h3 className="text-white font-semibold mb-2">Your Saved Concepts ({savedPrompts.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {savedPrompts.map((savedPrompt, index) => (
                      <Badge key={index} variant="outline" className="border-purple-600 text-purple-300">
                        {savedPrompt.length > 30 ? `${savedPrompt.substring(0, 30)}...` : savedPrompt}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Generated Game Preview */}
              {generatedGame && (
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-emerald-900/30 rounded-lg border border-purple-700/50">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{generatedGame.image}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">{generatedGame.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge className="bg-purple-600 text-white">{generatedGame.genre}</Badge>
                        <Badge className="bg-emerald-600 text-white">Demo Concept</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{generatedGame.description}</p>
                  
                  {/* Visual Mockup */}
                  <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                    <h4 className="text-purple-300 font-semibold mb-2">Visual Style Preview:</h4>
                    <p className="text-gray-400 text-sm italic">{generatedGame.visual}</p>
                  </div>

                  {/* Core Mechanics */}
                  <div className="mb-4">
                    <h4 className="text-purple-300 font-semibold mb-2">Core Gameplay Mechanics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {generatedGame.mechanics?.map((mechanic: string, index: number) => (
                        <Badge key={index} variant="outline" className="border-blue-600 text-blue-300">
                          {mechanic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Revenue Potential */}
                  <div className="bg-emerald-900/20 p-3 rounded-lg mb-4 border border-emerald-700/50">
                    <div className="flex items-center">
                      <DollarSign className="text-emerald-400 mr-2" size={18} />
                      <span className="text-emerald-300 font-semibold">
                        Estimated Revenue Potential: {generatedGame.earningPotential}
                      </span>
                    </div>
                    <p className="text-emerald-200 text-sm mt-1">Based on similar games in this genre</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>🎮 Demo concept</span>
                      <span>⭐ AI-generated</span>
                      <span>🚀 Coming Aug 30</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Eye className="mr-2" size={16} />
                        Reserve Concept
                      </Button>
                      <Button 
                        onClick={shareGame}
                        variant="outline" 
                        className="border-emerald-600 text-emerald-300 hover:bg-emerald-600"
                      >
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
          <h3 className="text-2xl font-bold text-white mb-4">Game Concepts Created by Waitlist Members</h3>
          <p className="text-gray-400">Preview what you'll be able to create at launch</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {demoGames.map((game, index) => (
            <Card key={index} className="bg-gray-900/50 border-purple-700 hover:border-purple-600 transition-all">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{game.image}</div>
                  <h4 className="text-lg font-bold text-white">{game.title}</h4>
                  <div className="flex justify-center gap-2 mt-1">
                    <Badge className="bg-purple-600 text-white">{game.genre}</Badge>
                    <Badge className="bg-blue-600 text-white">Waitlist Demo</Badge>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{game.description}</p>
                
                <div className="bg-emerald-900/20 p-2 rounded mb-4 border border-emerald-700/50">
                  <div className="text-emerald-300 text-xs font-semibold">Revenue Potential:</div>
                  <div className="text-emerald-200 text-sm">{game.earningPotential}</div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <span>🎯 Demo</span>
                  <span>⭐ {game.stats.rating}</span>
                  <span>👥 {game.stats.plays.toLocaleString()}</span>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700">
                  <Clock className="mr-2" size={16} />
                  Coming August 30
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action for waitlist */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 border-purple-700/50 p-8">
            <CardContent>
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Create Your Own Games?</h3>
              <p className="text-gray-300 mb-6">Join our waitlist to unlock the full creation suite on August 30, 2025</p>
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

export default InteractiveDemo;
