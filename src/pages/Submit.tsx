
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Lightbulb, Trophy, Coins, Upload } from 'lucide-react';

const Submit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    gameType: '',
    description: '',
    thumbnailUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 750; // Clarified: 750 characters (approximately 150 words)

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setFormData({ ...formData, description: text });
      setCharCount(text.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a prompt.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (charCount < 50) {
      toast({
        title: "Description Too Short",
        description: "Please provide at least 50 characters describing your game idea.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Prompt Submitted! 🚀",
        description: "Your game idea has been submitted for review. Check back soon for updates!",
      });

      setFormData({ title: '', gameType: '', description: '', thumbnailUrl: '' });
      setCharCount(0);
    } catch (error) {
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
    <div className="min-h-screen bg-black text-white">
      <EnhancedHeader />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Submit Your Game Prompt
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Turn your wildest game ideas into reality. Submit a prompt and let our AI + community bring it to life.
            </p>
          </div>

          {/* Helper Tips */}
          <div className="mb-8 p-6 bg-blue-900/20 rounded-2xl border border-blue-500/30">
            <div className="flex items-center mb-4">
              <Lightbulb className="text-blue-400 mr-2" size={20} />
              <span className="text-blue-400 font-medium">Need help writing a great prompt?</span>
            </div>
            <p className="text-gray-300 mb-4">
              Check out our guides in the <Button 
                variant="link" 
                className="text-blue-400 p-0 h-auto"
                onClick={() => navigate('/codex')}
              >
                Codex
              </Button> for tips on creating compelling game prompts that capture voters' attention.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Submit Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Trophy className="mr-2 text-yellow-500" />
                    New Game Prompt
                  </CardTitle>
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
                        placeholder="e.g., Cyberpunk Cat Café"
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
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select game type</option>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="puzzle">Puzzle</option>
                        <option value="strategy">Strategy</option>
                        <option value="simulation">Simulation</option>
                        <option value="rpg">RPG</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Prompt Description * (Max 750 characters / ~150 words)
                      </label>
                      <Textarea
                        value={formData.description}
                        onChange={handleDescriptionChange}
                        placeholder="Describe your game idea in detail. What makes it unique? What's the gameplay like? Focus on core mechanics, theme, and player experience."
                        className="bg-gray-800 border-gray-700 text-white min-h-[120px] resize-none"
                        required
                      />
                      <div className="flex justify-between items-center mt-2">
                        <p className={`text-sm ${charCount > maxChars * 0.9 ? 'text-orange-400' : 'text-gray-400'}`}>
                          {charCount}/{maxChars} characters
                        </p>
                        {charCount < 50 && (
                          <p className="text-sm text-red-400">
                            Minimum 50 characters required
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Thumbnail URL (Optional)
                      </label>
                      <div className="flex items-center space-x-2">
                        <Upload className="text-gray-400" size={20} />
                        <Input
                          value={formData.thumbnailUrl}
                          onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                          className="bg-gray-800 border-gray-700 text-white"
                          type="url"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended: 400x300px, JPG/PNG format
                      </p>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 text-lg"
                      disabled={loading || charCount < 50}
                    >
                      {loading ? 'Submitting...' : 'Submit Prompt'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Your Creator Journey */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center text-lg">
                    <Coins className="mr-2 text-yellow-500" />
                    Your Creator Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">G-Chips Balance</span>
                        <span className="text-yellow-500 font-semibold">1,250</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress to Creative Badge ✨</span>
                          <span className="text-blue-400">3/5</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => navigate('/leaderboard')}
                      >
                        View All Badges & Rewards
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-400 mb-4">Sign in to track your progress and earn rewards!</p>
                      <Button 
                        onClick={() => navigate('/auth')}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        Sign In
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Your Submissions */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Your Submitted Prompts</CardTitle>
                </CardHeader>
                <CardContent>
                  {user ? (
                    <div className="space-y-4">
                      {/* Example submission */}
                      <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium text-sm">Space Cat Adventure</h4>
                          <Badge className="bg-blue-500/20 text-blue-300 text-xs">
                            In Review
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-xs mb-2">Submitted 2 days ago</p>
                        <p className="text-gray-500 text-xs">A cosmic journey featuring feline astronauts...</p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => navigate('/dashboard')}
                      >
                        View All Submissions
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">📝</div>
                      <p className="text-gray-400 text-sm">
                        Sign in to see your submissions
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Submit;
