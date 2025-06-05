
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { TrendingUp, Heart, MessageSquare, Crown, Zap, Users, Star, Trophy, Clock } from 'lucide-react';

interface CommunityPrompt {
  id: string;
  title: string;
  description: string;
  game_type: string;
  user_id: string;
  created_at: string;
  votes: number;
  author: string;
  viral_score: number;
  comment_count: number;
}

const Community = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [prompts, setPrompts] = useState<CommunityPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trending');
  const [votedPrompts, setVotedPrompts] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPrompts();
  }, [activeTab]);

  const fetchPrompts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('game_prompts')
        .select('*')
        .eq('status', 'approved');

      // Sort based on active tab
      switch (activeTab) {
        case 'trending':
          query = query.order('created_at', { ascending: false });
          break;
        case 'top':
          query = query.order('chips_reward', { ascending: false });
          break;
        case 'new':
          query = query.order('created_at', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data: promptsData } = await query.limit(12);

      if (promptsData) {
        // Fetch user profiles for each prompt
        const enrichedPrompts = await Promise.all(
          promptsData.map(async (prompt) => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('username, full_name')
              .eq('id', prompt.user_id)
              .single();

            return {
              id: prompt.id,
              title: prompt.title,
              description: prompt.description,
              game_type: prompt.game_type,
              user_id: prompt.user_id,
              created_at: prompt.created_at,
              votes: Math.floor(Math.random() * 200) + 10, // Simulated for demo
              author: profile?.username || profile?.full_name || 'Anonymous',
              viral_score: Math.floor(Math.random() * 100) + 50,
              comment_count: Math.floor(Math.random() * 25) + 1
            };
          })
        );

        setPrompts(enrichedPrompts);
      }
    } catch (error) {
      console.error('Error fetching prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (promptId: string, isUpvote: boolean) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (votedPrompts.has(promptId)) return;

    // Simulate voting (in real implementation, this would update the database)
    setVotedPrompts(prev => new Set([...prev, promptId]));
    setPrompts(prev => prev.map(prompt => 
      prompt.id === promptId 
        ? { ...prompt, votes: prompt.votes + (isUpvote ? 1 : -1) }
        : prompt
    ));
  };

  const getGameTypeColor = (gameType: string) => {
    const colors: Record<string, string> = {
      action: 'bg-red-500/20 text-red-400 border-red-500/30',
      adventure: 'bg-green-500/20 text-green-400 border-green-500/30',
      puzzle: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      strategy: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      rpg: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      other: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[gameType] || colors.other;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gagsty-deep text-gagsty-primary">
        <EnhancedHeader />
        <main className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="gagsty-card p-6 animate-pulse">
                  <div className="h-4 bg-[#262A34] rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-[#262A34] rounded w-full mb-2"></div>
                  <div className="h-3 bg-[#262A34] rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gagsty-deep text-gagsty-primary">
      <EnhancedHeader />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-[#A084FF] via-[#00C6FB] to-[#16FF6F] shadow-2xl transform hover:scale-105 transition-transform mb-6 gagsty-glow-hover">
              <Users className="w-8 h-8 text-[#121212]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gagsty-gradient">
                Community Hub
              </span>
            </h1>
            <p className="text-xl text-gagsty-secondary max-w-3xl mx-auto leading-relaxed">
              Discover, vote on, and collaborate on the most innovative game concepts from our creator community.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="gagsty-card p-4 text-center">
              <div className="text-2xl font-bold text-[#00C6FB] mb-1">{prompts.length}</div>
              <div className="text-sm text-gagsty-secondary">Active Prompts</div>
            </div>
            <div className="gagsty-card p-4 text-center">
              <div className="text-2xl font-bold text-[#16FF6F] mb-1">2,847</div>
              <div className="text-sm text-gagsty-secondary">Total Votes</div>
            </div>
            <div className="gagsty-card p-4 text-center">
              <div className="text-2xl font-bold text-[#A084FF] mb-1">156</div>
              <div className="text-sm text-gagsty-secondary">Collaborations</div>
            </div>
            <div className="gagsty-card p-4 text-center">
              <div className="text-2xl font-bold text-[#FF61F6] mb-1">89%</div>
              <div className="text-sm text-gagsty-secondary">Satisfaction</div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="gagsty-tabs grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="trending" className="flex items-center space-x-2">
                <TrendingUp size={16} />
                <span>Trending</span>
              </TabsTrigger>
              <TabsTrigger value="top" className="flex items-center space-x-2">
                <Crown size={16} />
                <span>Top Rated</span>
              </TabsTrigger>
              <TabsTrigger value="new" className="flex items-center space-x-2">
                <Clock size={16} />
                <span>Latest</span>
              </TabsTrigger>
              <TabsTrigger value="featured" className="flex items-center space-x-2">
                <Star size={16} />
                <span>Featured</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prompts.map((prompt) => (
                  <Card key={prompt.id} className="gagsty-card gagsty-lift-hover group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={`text-xs ${getGameTypeColor(prompt.game_type)}`}>
                          {prompt.game_type}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Zap className="text-[#FFB800]" size={14} />
                          <span className="text-sm font-medium text-[#FFB800]">{prompt.viral_score}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-[#00C6FB] transition-colors">
                        {prompt.title}
                      </CardTitle>
                      <p className="text-sm text-gagsty-muted">by {prompt.author}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gagsty-secondary text-sm mb-4 line-clamp-3">
                        {prompt.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleVote(prompt.id, true)}
                            className={`flex items-center space-x-1 transition-colors ${
                              votedPrompts.has(prompt.id) 
                                ? 'text-[#16FF6F]' 
                                : 'text-gagsty-secondary hover:text-[#16FF6F]'
                            }`}
                          >
                            <Heart size={16} className={votedPrompts.has(prompt.id) ? 'fill-current' : ''} />
                            <span className="text-sm">{prompt.votes}</span>
                          </button>
                          
                          <div className="flex items-center space-x-1 text-gagsty-secondary">
                            <MessageSquare size={16} />
                            <span className="text-sm">{prompt.comment_count}</span>
                          </div>
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="btn-gagsty-tertiary text-xs"
                          onClick={() => navigate(`/prompt/${prompt.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Section */}
          <div className="text-center mt-12">
            <div className="gagsty-card-featured p-8 max-w-2xl mx-auto">
              <Trophy className="w-12 h-12 text-[#FFB800] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gagsty-primary mb-4">Ready to Join the Community?</h3>
              <p className="text-gagsty-secondary mb-6">
                Submit your own game concept and get feedback from thousands of creators worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/submit')}
                  className="btn-gagsty-primary"
                >
                  Submit Your Prompt
                </Button>
                <Button 
                  onClick={() => navigate('/leaderboard')}
                  className="btn-gagsty-secondary"
                >
                  View Leaderboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
