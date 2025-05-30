
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Lightbulb, Upload, Sparkles } from 'lucide-react';

interface UserPromptSubmissionProps {
  onSubmitSuccess: () => void;
}

const UserPromptSubmission: React.FC<UserPromptSubmissionProps> = ({ onSubmitSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    gameType: '',
    description: '',
    thumbnailUrl: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('game_prompts')
        .insert({
          user_id: user.id,
          title: formData.title,
          game_type: formData.gameType,
          description: formData.description,
          thumbnail_url: formData.thumbnailUrl || null,
        });

      if (error) throw error;

      toast({
        title: "Prompt Submitted! 🚀",
        description: "Your game idea has been submitted for review. Check back soon for updates!",
      });

      setFormData({ title: '', gameType: '', description: '', thumbnailUrl: '' });
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting prompt:', error);
      toast({
        title: "Error",
        description: "Failed to submit prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Lightbulb className="mr-3 text-yellow-400" size={28} />
            Submit Your Game Prompt
          </CardTitle>
          <p className="text-gray-300 text-lg">
            Turn your wildest game ideas into reality. Submit a prompt and let our AI + community bring it to life.
          </p>
        </CardHeader>
      </Card>

      {/* Tips Section */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Sparkles className="mr-2 text-blue-400" />
            Writing Tips for Great Prompts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <div>
                  <h4 className="text-white font-medium">Be Specific</h4>
                  <p className="text-gray-400 text-sm">Describe characters, setting, and core mechanics clearly</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <div>
                  <h4 className="text-white font-medium">Focus on Fun</h4>
                  <p className="text-gray-400 text-sm">What makes your game unique and enjoyable?</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <div>
                  <h4 className="text-white font-medium">Paint the Picture</h4>
                  <p className="text-gray-400 text-sm">Help us visualize your game world</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                <div>
                  <h4 className="text-white font-medium">Keep it Achievable</h4>
                  <p className="text-gray-400 text-sm">Think about scope and development feasibility</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Form */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-xl">New Game Prompt</CardTitle>
          <p className="text-gray-400">Fill out the details below to submit your game idea</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Game Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Cyberpunk Cat Café"
                  className="bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Make it catchy and memorable!</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Game Type *
                </label>
                <select
                  value={formData.gameType}
                  onChange={(e) => setFormData({ ...formData, gameType: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select game type</option>
                  <option value="action">Action</option>
                  <option value="adventure">Adventure</option>
                  <option value="puzzle">Puzzle</option>
                  <option value="strategy">Strategy</option>
                  <option value="simulation">Simulation</option>
                  <option value="rpg">RPG</option>
                  <option value="racing">Racing</option>
                  <option value="sports">Sports</option>
                  <option value="horror">Horror</option>
                  <option value="platformer">Platformer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prompt Description * (Up to 150 words)
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your game idea in detail. What makes it unique? What's the gameplay like? Who are the characters? What's the setting?"
                className="bg-gray-800 border-gray-700 text-white min-h-[120px] focus:border-blue-500 focus:ring-blue-500"
                maxLength={750}
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  Be detailed but concise. Focus on core gameplay and what makes it special.
                </p>
                <p className="text-sm text-gray-400">
                  {formData.description.length}/750 characters
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Concept Image URL (Optional)
              </label>
              <div className="flex space-x-2">
                <Input
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  placeholder="https://example.com/your-concept-image.jpg"
                  className="bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  type="url"
                />
                <Button type="button" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Upload size={16} />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Add a reference image or concept art to help visualize your idea
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2" size={20} />
                    Submit My Prompt
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="text-center py-6">
          <p className="text-gray-400 mb-3">
            Need help writing a great prompt? Check out our comprehensive guides!
          </p>
          <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
            View Prompt Writing Guide
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPromptSubmission;
