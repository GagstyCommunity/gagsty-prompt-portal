
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const PromptCompetition = () => {
  const [promptTitle, setPromptTitle] = useState('');
  const [promptDescription, setPromptDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptTitle && promptDescription) {
      toast({
        title: "Prompt Submitted! 🎮",
        description: "Your game idea is now in the running. May the best prompt win!",
      });
      setPromptTitle('');
      setPromptDescription('');
    }
  };

  return (
    <section className="py-20 px-4 bg-gray-900/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
            🎮 PROMPT BATTLE STARTS SOON
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Submit Your Game Idea
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Top 3 prompts get built by the Gagsty team. You earn 60% of game revenue. 
            Submit yours before it's too late!
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="promptTitle" className="block text-sm font-medium text-gray-300 mb-2">
                Game Title
              </label>
              <Input
                id="promptTitle"
                type="text"
                placeholder="e.g., Flying Cats Battle Royale"
                value={promptTitle}
                onChange={(e) => setPromptTitle(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="promptDescription" className="block text-sm font-medium text-gray-300 mb-2">
                Game Description (150 words max)
              </label>
              <Textarea
                id="promptDescription"
                placeholder="Describe your dream game in detail. What makes it unique? What's the gameplay like? Be creative!"
                value={promptDescription}
                onChange={(e) => setPromptDescription(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500 min-h-[120px]"
                maxLength={1000}
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                {promptDescription.length}/150 words
              </p>
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-4 text-lg transition-all duration-300 transform hover:scale-105"
            >
              Submit Prompt Now 🚀
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
            <p className="text-sm text-blue-200">
              <strong>💡 Pro tip:</strong> The more creative and detailed your prompt, the better chance you have of winning. 
              Think about gameplay mechanics, visual style, and what makes your game special!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptCompetition;
