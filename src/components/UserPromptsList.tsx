
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'in_review': return 'bg-blue-500';
      default: return 'bg-yellow-500';
    }
  };

  if (loading) {
    return <div className="text-white">Loading prompts...</div>;
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">My Submitted Prompts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prompts.map((prompt) => (
            <div key={prompt.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{prompt.title}</h3>
                <Badge className={`${getStatusColor(prompt.status)} text-white`}>
                  {prompt.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <p className="text-gray-300 text-sm mb-2">{prompt.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Type: {prompt.game_type}</span>
                <span>Submitted: {new Date(prompt.created_at).toLocaleDateString()}</span>
              </div>
              {prompt.admin_comment && (
                <div className="mt-2 p-2 bg-gray-700 rounded text-sm text-gray-300">
                  <strong>Admin Note:</strong> {prompt.admin_comment}
                </div>
              )}
              {prompt.chips_reward > 0 && (
                <div className="mt-2 text-yellow-500 text-sm">
                  Reward: {prompt.chips_reward} G-Chips
                </div>
              )}
            </div>
          ))}
          
          {prompts.length === 0 && (
            <p className="text-gray-400 text-center py-8">
              No prompts submitted yet. Submit your first game prompt above!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPromptsList;
