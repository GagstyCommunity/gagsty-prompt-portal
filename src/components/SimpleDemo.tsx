
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Share2, Bookmark, Eye } from 'lucide-react';

const SimpleDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [gamePreview, setGamePreview] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const sampleGame = {
    title: 'Crystal Galaxy Quest',
    description: 'An epic space adventure where players collect magical crystals while navigating through asteroid fields and battling alien pirates.',
    genre: 'Action Adventure',
    mechanics: ['Resource Collection', 'Combat System', 'Exploration', 'Upgrade Trees'],
    estimatedRevenue: '$2,400/month',
    playerEngagement: '85%',
    visual: '🚀✨🔮'
  };

  const handleGenerateGame = () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      setGamePreview(sampleGame);
      setIsGenerating(false);
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my game concept on Gagsty!',
        text: `I just created "${sampleGame.title}" using AI on Gagsty!`,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`Check out my game concept: "${sampleGame.title}" - Created with AI on Gagsty!`);
    }
  };

  const handleReserveConcept = () => {
    // This would normally save to user's profile
    alert('Game concept reserved! You\'ll be notified when the platform launches.');
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Test Our AI Demo
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            See what your game concept could become. Try our demo and reserve your favorite ideas for launch day.
          </p>
          <Badge className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-4 py-2">
            <Eye className="mr-2" size={16} />
            Demo Preview - Full Platform August 30, 2025
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-gray-900/50 border-purple-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Sparkles className="mr-2 text-purple-400" size={24} />
                Describe Your Game
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: A magical forest adventure with talking animals and puzzle-solving quests"
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 h-20"
                multiline
              />
              <Button 
                onClick={handleGenerateGame}
                disabled={!prompt || isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white font-semibold py-3"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 animate-spin" size={18} />
                    Generating Game Concept...
                  </>
                ) : (
                  'Generate Game Concept'
                )}
              </Button>
              <p className="text-sm text-gray-400 text-center">
                This is a demo preview. Full creation tools launch August 30, 2025.
              </p>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="bg-gray-900/50 border-purple-700/50">
            <CardHeader>
              <CardTitle className="text-white">Your Game Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {gamePreview ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{sampleGame.visual}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{sampleGame.title}</h3>
                    <Badge className="bg-blue-600 text-white">{sampleGame.genre}</Badge>
                  </div>
                  
                  <p className="text-gray-300">{sampleGame.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Core Mechanics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {sampleGame.mechanics.map((mechanic, index) => (
                          <Badge key={index} variant="outline" className="border-purple-600 text-purple-300">
                            {mechanic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-center">
                        <div className="text-emerald-400 font-bold">{sampleGame.estimatedRevenue}</div>
                        <div className="text-xs text-gray-400">Est. Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-400 font-bold">{sampleGame.playerEngagement}</div>
                        <div className="text-xs text-gray-400">Engagement Rate</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleReserveConcept}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700"
                    >
                      <Bookmark className="mr-2" size={16} />
                      Reserve Concept
                    </Button>
                    <Button 
                      onClick={handleShare}
                      variant="outline"
                      className="border-purple-600 text-purple-300 hover:bg-purple-600 hover:text-white"
                    >
                      <Share2 size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a game description to see your AI-generated concept</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">
            Love what you see? Reserve your spot to access the full platform at launch.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white font-semibold px-8 py-3">
            Join Waitlist for Full Access
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SimpleDemo;
