
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Footer from '../components/Footer';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FormFieldEnhanced from '@/components/ui/form-field-enhanced';
import SuccessModal from '@/components/ui/success-modal';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Lightbulb, Trophy, Coins, Upload, Star, Zap, GamepadIcon } from 'lucide-react';

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const maxChars = 750;

  const gameTypes = [
    { value: 'action', label: 'Action', description: 'Fast-paced gameplay with combat' },
    { value: 'adventure', label: 'Adventure', description: 'Story-driven exploration' },
    { value: 'puzzle', label: 'Puzzle', description: 'Brain-teasing challenges' },
    { value: 'strategy', label: 'Strategy', description: 'Tactical decision making' },
    { value: 'simulation', label: 'Simulation', description: 'Real-world system modeling' },
    { value: 'rpg', label: 'RPG', description: 'Character progression and storytelling' },
    { value: 'racing', label: 'Racing', description: 'Speed and competition' },
    { value: 'sports', label: 'Sports', description: 'Athletic competitions' },
    { value: 'horror', label: 'Horror', description: 'Suspense and fear elements' },
    { value: 'platformer', label: 'Platformer', description: 'Jump and run mechanics' },
    { value: 'other', label: 'Other', description: 'Unique or hybrid genres' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Game title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.gameType) {
      newErrors.gameType = 'Please select a game type';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (formData.thumbnailUrl && !isValidUrl(formData.thumbnailUrl)) {
      newErrors.thumbnailUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setFormData({ ...formData, description: text });
      setCharCount(text.length);
      if (errors.description && text.length >= 50) {
        setErrors({ ...errors, description: '' });
      }
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

    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please fix the errors below and try again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success modal instead of toast
      setShowSuccessModal(true);
      setFormData({ title: '', gameType: '', description: '', thumbnailUrl: '' });
      setCharCount(0);
      setErrors({});
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Failed to submit prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const tips = [
    {
      icon: Star,
      title: "Be Specific",
      description: "Describe characters, setting, and core mechanics clearly"
    },
    {
      icon: Zap,
      title: "Focus on Fun",
      description: "What makes your game unique and enjoyable?"
    },
    {
      icon: GamepadIcon,
      title: "Paint the Picture",
      description: "Help us visualize your game world"
    },
    {
      icon: Trophy,
      title: "Keep it Achievable",
      description: "Think about scope and development feasibility"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <EnhancedHeader />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-blue-500 via-violet-500 to-orange-500 shadow-2xl transform hover:scale-105 transition-transform mb-6">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Submit Your Game Prompt
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your wildest game ideas into reality. Submit a prompt and let our AI + community bring it to life.
            </p>
          </div>

          {/* Tips Section */}
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-800/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-xl">
                  <Lightbulb className="mr-3 text-yellow-400" size={24} />
                  Writing Tips for Great Prompts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-900/50 rounded-lg">
                      <div className="flex-shrink-0">
                        <tip.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{tip.title}</h4>
                        <p className="text-gray-400 text-sm">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Enhanced Submit Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center text-2xl">
                    <Trophy className="mr-3 text-yellow-500" />
                    New Game Prompt
                  </CardTitle>
                  <p className="text-gray-400">Fill out the details below to submit your game idea</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormFieldEnhanced
                        label="Game Title"
                        required
                        error={errors.title}
                        helpText="Make it catchy and memorable!"
                      >
                        <Input
                          value={formData.title}
                          onChange={(e) => {
                            setFormData({ ...formData, title: e.target.value });
                            if (errors.title && e.target.value.length >= 3) {
                              setErrors({ ...errors, title: '' });
                            }
                          }}
                          placeholder="e.g., Cyberpunk Cat Café"
                          className="bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                        />
                      </FormFieldEnhanced>

                      <FormFieldEnhanced
                        label="Game Type"
                        required
                        error={errors.gameType}
                        helpText="Choose the genre that best fits your idea"
                      >
                        <select
                          value={formData.gameType}
                          onChange={(e) => {
                            setFormData({ ...formData, gameType: e.target.value });
                            if (errors.gameType) {
                              setErrors({ ...errors, gameType: '' });
                            }
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select game type</option>
                          {gameTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label} - {type.description}
                            </option>
                          ))}
                        </select>
                      </FormFieldEnhanced>
                    </div>

                    <FormFieldEnhanced
                      label={`Prompt Description (${charCount}/${maxChars} characters)`}
                      required
                      error={errors.description}
                      helpText="Describe your game idea in detail. What makes it unique? What's the gameplay like? Focus on core mechanics, theme, and player experience."
                    >
                      <Textarea
                        value={formData.description}
                        onChange={handleDescriptionChange}
                        placeholder="Describe your game idea in detail. What makes it unique? What's the gameplay like? Focus on core mechanics, theme, and player experience."
                        className="bg-gray-800 border-gray-700 text-white min-h-[140px] resize-none focus:border-blue-500 focus:ring-blue-500"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <div className={`text-sm ${charCount > maxChars * 0.9 ? 'text-orange-400' : 'text-gray-400'}`}>
                          {charCount < 50 && (
                            <span className="text-red-400">Minimum 50 characters required</span>
                          )}
                        </div>
                        <div className={`text-sm ${charCount > maxChars * 0.9 ? 'text-orange-400' : 'text-gray-400'}`}>
                          {Math.max(0, maxChars - charCount)} characters remaining
                        </div>
                      </div>
                    </FormFieldEnhanced>

                    <FormFieldEnhanced
                      label="Concept Image URL (Optional)"
                      error={errors.thumbnailUrl}
                      helpText="Add a reference image or concept art (recommended: 400x300px, JPG/PNG)"
                    >
                      <div className="flex items-center space-x-2">
                        <Upload className="text-gray-400 flex-shrink-0" size={20} />
                        <Input
                          value={formData.thumbnailUrl}
                          onChange={(e) => {
                            setFormData({ ...formData, thumbnailUrl: e.target.value });
                            if (errors.thumbnailUrl) {
                              setErrors({ ...errors, thumbnailUrl: '' });
                            }
                          }}
                          placeholder="https://example.com/image.jpg"
                          className="bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                          type="url"
                        />
                      </div>
                    </FormFieldEnhanced>

                    <div className="flex justify-center pt-4">
                      <EnhancedButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={loading}
                        disabled={charCount < 50 || !formData.title || !formData.gameType}
                        className="px-12"
                      >
                        <Lightbulb className="mr-2" size={20} />
                        Submit My Prompt
                      </EnhancedButton>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* Creator Journey Card */}
              <Card className="bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-emerald-900/30 border-purple-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center text-lg">
                    <Coins className="mr-2 text-yellow-500" />
                    Your Creator Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                        <span className="text-gray-300">G-Chips Balance</span>
                        <span className="text-yellow-500 font-bold text-lg">1,250</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress to Creative Badge ✨</span>
                          <span className="text-blue-400 font-semibold">3/5</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500">2 more prompts needed for next badge!</p>
                      </div>
                      
                      <EnhancedButton
                        variant="tertiary"
                        size="sm"
                        className="w-full"
                        onClick={() => navigate('/leaderboard')}
                      >
                        View All Badges & Rewards
                      </EnhancedButton>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="text-4xl mb-3">🚀</div>
                      <p className="text-gray-400 mb-4">Sign in to track your progress and earn rewards!</p>
                      <EnhancedButton
                        variant="primary"
                        size="default"
                        onClick={() => navigate('/auth')}
                        className="w-full"
                      >
                        Sign In
                      </EnhancedButton>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Submissions Card */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Your Recent Prompts</CardTitle>
                </CardHeader>
                <CardContent>
                  {user ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium text-sm">Space Cat Adventure</h4>
                          <Badge className="bg-blue-500/20 text-blue-300 text-xs">
                            In Review
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-xs mb-2">Submitted 2 days ago</p>
                        <p className="text-gray-500 text-xs">A cosmic journey featuring feline astronauts exploring distant galaxies...</p>
                      </div>
                      
                      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium text-sm">Neon Racing League</h4>
                          <Badge className="bg-green-500/20 text-green-300 text-xs">
                            Approved
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-xs mb-2">Submitted 1 week ago</p>
                        <p className="text-gray-500 text-xs">High-speed cyberpunk racing through neon-lit cityscapes...</p>
                      </div>
                      
                      <EnhancedButton
                        variant="secondary"
                        size="sm"
                        className="w-full"
                        onClick={() => navigate('/dashboard')}
                      >
                        View All Submissions
                      </EnhancedButton>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">📝</div>
                      <p className="text-gray-400 text-sm">
                        Sign in to see your submissions
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-800/30">
                <CardContent className="text-center py-6">
                  <div className="text-3xl mb-3">💡</div>
                  <p className="text-gray-300 mb-4 text-sm">
                    Need help writing a great prompt? Check out our comprehensive guides!
                  </p>
                  <EnhancedButton
                    variant="tertiary"
                    size="sm"
                    onClick={() => navigate('/codex')}
                    className="border-orange-500 text-orange-300 hover:bg-orange-500/20"
                  >
                    View Prompt Writing Guide
                  </EnhancedButton>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Prompt Submitted Successfully! 🚀"
        message="Your game idea has been submitted for review. You'll receive updates on its progress and earn G-Chips when it gets approved!"
        actionText="View My Dashboard"
        onAction={() => {
          setShowSuccessModal(false);
          navigate('/dashboard');
        }}
        showShare={true}
        type="success"
      />
    </div>
  );
};

export default Submit;
