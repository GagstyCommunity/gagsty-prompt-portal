import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Eye, CheckCircle, XCircle, Award, Coins } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminPrompts = () => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
  const [adminComment, setAdminComment] = useState('');
  const [chipsReward, setChipsReward] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from('game_prompts')
        .select(`
          *,
          profiles!inner(full_name, username)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrompts(data || []);
    } catch (error) {
      console.error('Error fetching prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePromptStatus = async (promptId: string, status: string, comment: string, chipsReward: number) => {
    try {
      const { error } = await supabase
        .from('game_prompts')
        .update({ 
          status, 
          admin_comment: comment,
          chips_reward: chipsReward
        })
        .eq('id', promptId);

      if (error) throw error;

      // If approved and chips reward > 0, add chips to user
      if (status === 'approved' && chipsReward > 0) {
        const prompt = prompts.find(p => p.id === promptId);
        if (prompt) {
          // Update user's chips directly in profiles table
          const { error: chipsError } = await supabase
            .from('profiles')
            .update({ 
              gagsty_chips: chipsReward 
            })
            .eq('id', prompt.user_id);
          
          if (chipsError) {
            console.error('Error adding chips:', chipsError);
          }
        }
      }

      toast({
        title: "Prompt Updated",
        description: `Prompt has been ${status}`,
      });

      fetchPrompts();
    } catch (error) {
      console.error('Error updating prompt:', error);
      toast({
        title: "Error",
        description: "Failed to update prompt",
        variant: "destructive",
      });
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
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">All Prompt Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Title</TableHead>
                <TableHead className="text-gray-300">Submitted By</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prompts.map((prompt) => (
                <TableRow key={prompt.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">{prompt.title}</TableCell>
                  <TableCell className="text-gray-300">{prompt.profiles?.full_name || 'Anonymous'}</TableCell>
                  <TableCell className="text-gray-300">{prompt.game_type}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(prompt.status)} text-white`}>
                      {prompt.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(prompt.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => setSelectedPrompt(prompt)}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedPrompt && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Review Prompt: {selectedPrompt.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-white font-medium mb-2">Description:</h3>
              <p className="text-gray-300">{selectedPrompt.description}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Comment
              </label>
              <Textarea
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
                placeholder="Add your feedback here..."
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Chips Reward (if approved)
              </label>
              <Input
                type="number"
                value={chipsReward}
                onChange={(e) => setChipsReward(Number(e.target.value))}
                className="bg-gray-800 border-gray-700 text-white"
                min="0"
              />
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => updatePromptStatus(selectedPrompt.id, 'approved', adminComment, chipsReward)}
                className="bg-green-600 hover:bg-green-700"
              >
                Approve
              </Button>
              <Button
                onClick={() => updatePromptStatus(selectedPrompt.id, 'rejected', adminComment, chipsReward)}
                className="bg-red-600 hover:bg-red-700"
              >
                Reject
              </Button>
              <Button
                onClick={() => updatePromptStatus(selectedPrompt.id, 'in_review', adminComment, chipsReward)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Mark In Review
              </Button>
              <Button
                onClick={() => {
                  setSelectedPrompt(null);
                  setAdminComment('');
                  setChipsReward(0);
                }}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminPrompts;
