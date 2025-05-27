
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wand2, Save, Share2, Lightbulb } from 'lucide-react';

const SimpleDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedConcept, setGeneratedConcept] = useState<any>(null);

  const demoPrompts = [
    "A space explorer collecting crystals on alien planets",
    "A ninja cat avoiding obstacles in a neon city",
    "A puzzle game where you connect colored dots to create music"
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      setGeneratedConcept({
        title: `${prompt.split(' ').slice(0, 3).join(' ')} Adventure`,
        description: `An innovative game concept: ${prompt}`,
        genre: 'Adventure',
        mechanics: ['Exploration', 'Collection', 'Progression'],
        earnings: '$800-2,400/month'
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Card className="bg-gray-900/50 border-purple-700 p-6">
      <CardContent className="space-y-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white mb-2">Creator Workshop Demo</h3>
          <p className="text-gray-300">Test the prompt-to-concept generator</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Game Concept Prompt
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your game idea... e.g., A wizard brewing potions in a magical forest"
              className="bg-gray-800 border-purple-600 text-white placeholder-gray-400 min-h-[100px]"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 flex-1"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="mr-2 animate-spin" size={16} />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2" size={16} />
                  Generate Concept
                </>
              )}
            </Button>
          </div>

          <div className="text-sm text-gray-400">
            <p className="mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {demoPrompts.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setPrompt(example)}
                  className="border-purple-600 text-purple-300 hover:bg-purple-600/20 text-xs"
                >
                  {example.substring(0, 30)}...
                </Button>
              ))}
            </div>
          </div>
        </div>

        {generatedConcept && (
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-emerald-900/30 rounded-lg border border-purple-700/50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold text-white">{generatedConcept.title}</h4>
              <Badge className="bg-emerald-600 text-white">{generatedConcept.genre}</Badge>
            </div>
            
            <p className="text-gray-300 mb-3">{generatedConcept.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {generatedConcept.mechanics?.map((mechanic: string, index: number) => (
                <Badge key={index} variant="outline" className="border-blue-600 text-blue-300">
                  {mechanic}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-emerald-300 text-sm">
                Estimated Earnings: {generatedConcept.earnings}
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Save className="mr-1" size={14} />
                  Save
                </Button>
                <Button size="sm" variant="outline" className="border-emerald-600 text-emerald-300">
                  <Share2 className="mr-1" size={14} />
                  Share
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Badge className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-4 py-2">
            <Lightbulb className="mr-2" size={16} />
            Full Creator Tools Launch August 30, 2025
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleDemo;
