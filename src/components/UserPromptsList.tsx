
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const UserPromptsList = () => {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPrompts();
    }
  }, [user]);

  const fetchPrompts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('game_prompts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrompts(data || []);
    } catch (error) {
      console.error('Error fetching prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500 hover:bg-green-600';
      case 'rejected': return 'bg-red-500 hover:bg-red-600';
      case 'in_review': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-yellow-500 hover:bg-yellow-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return '🟢';
      case 'rejected': return '🔴';
      case 'in_review': return '🔵';
      default: return '🟡';
    }
  };

  const withdrawPrompt = async (promptId: string) => {
    try {
      const { error } = await supabase
        .from('game_prompts')
        .delete()
        .eq('id', promptId);

      if (error) throw error;

      toast({
        title: "Prompt Withdrawn",
        description: "Your prompt has been successfully withdrawn.",
      });

      fetchPrompts();
    } catch (error) {
      console.error('Error withdrawing prompt:', error);
      toast({
        title: "Error",
        description: "Failed to withdraw prompt.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-white">Loading prompts...</div>
      </div>
    );
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">My Submitted Prompts</CardTitle>
      </CardHeader>
      <CardContent>
        {prompts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-400 text-lg mb-2">No prompts submitted yet</p>
            <p className="text-gray-500">Submit your first game prompt to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt) => (
              <Card key={prompt.id} className="bg-gray-800/70 border-gray-700 hover:bg-gray-800/90 transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-white text-lg font-semibold line-clamp-2">
                      {prompt.title}
                    </CardTitle>
                    <Badge className={`${getStatusColor(prompt.status)} text-white ml-2 flex-shrink-0`}>
                      {getStatusIcon(prompt.status)} {prompt.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="bg-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {prompt.game_type}
                    </span>
                    <span>{new Date(prompt.created_at).toLocaleDateString()}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {prompt.description}
                  </p>
                  
                  {prompt.admin_comment && (
                    <div className="mb-4 p-3 bg-gray-700/50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-xs font-semibold text-blue-400 mb-1">Admin Feedback:</p>
                      <p className="text-gray-300 text-sm">{prompt.admin_comment}</p>
                    </div>
                  )}
                  
                  {prompt.chips_reward > 0 && (
                    <div className="mb-4 p-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-600/30">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500 text-lg">🪙</span>
                        <span className="text-yellow-400 font-medium">
                          Earned {prompt.chips_reward} G-Chips
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    {prompt.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            // TODO: Implement edit functionality
                            toast({
                              title: "Coming Soon",
                              description: "Edit functionality will be available soon.",
                            });
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          onClick={() => withdrawPrompt(prompt.id)}
                        >
                          Withdraw
                        </Button>
                      </>
                    )}
                    
                    {prompt.status !== 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                        disabled
                      >
                        {prompt.status === 'approved' ? 'Approved ✓' : 
                         prompt.status === 'rejected' ? 'Rejected ✗' : 
                         'In Review 👀'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserPromptsList;
