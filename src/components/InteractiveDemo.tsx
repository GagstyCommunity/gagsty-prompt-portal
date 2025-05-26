
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Sparkles, Zap, Download, Share2 } from 'lucide-react';

const InteractiveDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [gamePreview, setGamePreview] = useState(null);

  const samplePrompts = [
    "A space adventure where you collect crystals while avoiding asteroids",
    "A medieval dragon rescue mission with magic spells and treasures",
    "An underwater exploration game with sea creatures and hidden treasures",
    "A cyberpunk city racing game with neon lights and futuristic cars"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setGamePreview({
        title: prompt.split(' ').slice(0, 3).join(' ').replace(/[^a-zA-Z0-9 ]/g, ''),
        genre: getGenreFromPrompt(prompt),
        mechanics: getMechanicsFromPrompt(prompt),
        estimated_time: '2-3 days',
        estimated_revenue: '$500-2000/month'
      });
      setIsGenerating(false);
    }, 3000);
  };

  const getGenreFromPrompt = (prompt: string) => {
    if (prompt.includes('space') || prompt.includes('sci-fi')) return 'Sci-Fi Adventure';
    if (prompt.includes('medieval') || prompt.includes('dragon')) return 'Fantasy RPG';
    if (prompt.includes('underwater') || prompt.includes('ocean')) return 'Exploration';
    if (prompt.includes('racing') || prompt.includes('car')) return 'Racing';
    return 'Adventure';
  };

  const getMechanicsFromPrompt = (prompt: string) => {
    const mechanics = [];
    if (prompt.includes('collect')) mechanics.push('Collection');
    if (prompt.includes('avoid')) mechanics.push('Dodge');
    if (prompt.includes('rescue')) mechanics.push('Rescue Mission');
    if (prompt.includes('racing')) mechanics.push('Time Trial');
    if (prompt.includes('exploration')) mechanics.push('Open World');
    return mechanics.length > 0 ? mechanics : ['Action', 'Adventure'];
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              See Your Game Come to Life
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Type a game idea and watch our AI instantly create a game concept with mechanics, visuals, and revenue potential
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Sparkles className="mr-2 text-yellow-500" />
                Describe Your Game Idea
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A space adventure where you collect crystals..."
                  className="bg-gray-800 border-gray-700 text-white h-12"
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-2">Try these examples:</p>
                <div className="space-y-2">
                  {samplePrompts.map((sample, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setPrompt(sample)}
                      className="w-full text-left justify-start border-gray-600 text-gray-300 hover:bg-gray-800 h-auto py-2 px-3"
                    >
                      {sample}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
              >
                {isGenerating ? (
                  <>
                    <Zap className="mr-2 animate-spin" size={20} />
                    AI is Creating Your Game...
                  </>
                ) : (
                  <>
                    <Gamepad2 className="mr-2" size={20} />
                    Generate Game Preview
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Gamepad2 className="mr-2 text-blue-500" />
                Your Game Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!gamePreview && !isGenerating && (
                <div className="text-center py-12 text-gray-400">
                  <Gamepad2 size={64} className="mx-auto mb-4 opacity-50" />
                  <p>Enter a game idea to see the magic happen!</p>
                </div>
              )}

              {isGenerating && (
                <div className="text-center py-12">
                  <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-blue-400">AI is analyzing your idea...</p>
                  <p className="text-gray-400 text-sm mt-2">Creating game mechanics & visuals</p>
                </div>
              )}

              {gamePreview && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{gamePreview.title}</h3>
                    <Badge className="bg-purple-600 text-white">{gamePreview.genre}</Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Core Mechanics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {gamePreview.mechanics.map((mechanic, index) => (
                        <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                          {mechanic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-400">Development Time</p>
                      <p className="text-green-400 font-medium">{gamePreview.estimated_time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Revenue Potential</p>
                      <p className="text-yellow-400 font-medium">{gamePreview.estimated_revenue}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <Download className="mr-2" size={16} />
                      Download Concept
                    </Button>
                    <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800">
                      <Share2 className="mr-2" size={16} />
                      Share Preview
                    </Button>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-800/30">
                    <p className="text-blue-300 font-medium">Ready to build this game?</p>
                    <p className="text-gray-400 text-sm mt-1">Join our waitlist to access the full creator platform</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
