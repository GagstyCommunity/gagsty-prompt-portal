
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Submit New Game Prompt</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Game Title *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Space Cat Adventure"
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Game Type *
            </label>
            <select
              value={formData.gameType}
              onChange={(e) => setFormData({ ...formData, gameType: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              required
            >
              <option value="">Select game type</option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="puzzle">Puzzle</option>
              <option value="strategy">Strategy</option>
              <option value="simulation">Simulation</option>
              <option value="rpg">RPG</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Prompt Description * (Max 150 words)
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your game idea in detail. What makes it unique? What's the gameplay like?"
              className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
              maxLength={750}
              required
            />
            <p className="text-sm text-gray-400 mt-1">
              {formData.description.length}/750 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Thumbnail URL (Optional)
            </label>
            <Input
              value={formData.thumbnailUrl}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="bg-gray-800 border-gray-700 text-white"
              type="url"
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Prompt'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserPromptSubmission;
