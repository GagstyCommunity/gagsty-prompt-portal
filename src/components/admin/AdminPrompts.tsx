
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

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
      toast({
        title: "Error",
        description: "Failed to fetch prompts.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePromptStatus = async (promptId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('game_prompts')
        .update({
          status,
          admin_comment: adminComment,
          chips_reward: status === 'approved' ? chipsReward : 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', promptId);

      if (error) throw error;

      // If approved, add chips to user
      if (status === 'approved' && chipsReward > 0) {
        const prompt = prompts.find(p => p.id === promptId);
        if (prompt) {
          const { error: chipError } = await supabase.rpc('add_chips_to_user', {
            user_id: prompt.user_id,
            chips_amount: chipsReward
          });
          
          if (chipError) console.error('Error adding chips:', chipError);
        }
      }

      toast({
        title: "Success",
        description: `Prompt ${status} successfully.`,
      });

      setSelectedPrompt(null);
      setAdminComment('');
      setChipsReward(0);
      fetchPrompts();
    } catch (error) {
      console.error('Error updating prompt:', error);
      toast({
        title: "Error",
        description: "Failed to update prompt.",
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      case 'in_review': return <Clock size={16} />;
      default: return <Clock size={16} />;
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
              <TableRow>
                <TableHead className="text-gray-300">Title</TableHead>
                <TableHead className="text-gray-300">Submitted By</TableHead>
                <TableHead className="text-gray-300">Game Type</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prompts.map((prompt) => (
                <TableRow key={prompt.id}>
                  <TableCell className="text-white font-medium">{prompt.title}</TableCell>
                  <TableCell className="text-gray-300">
                    {prompt.profiles?.full_name || prompt.profiles?.username || 'Unknown'}
                  </TableCell>
                  <TableCell className="text-gray-300">{prompt.game_type}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(prompt.status)} text-white flex items-center gap-1`}>
                      {getStatusIcon(prompt.status)}
                      {prompt.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(prompt.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedPrompt(prompt)}
                      className="text-white border-gray-600 hover:bg-gray-800"
                    >
                      <Eye size={16} className="mr-1" />
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Prompt Detail Modal */}
      {selectedPrompt && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Review Prompt: {selectedPrompt.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2">Description:</h3>
              <p className="text-gray-300">{selectedPrompt.description}</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-2">Game Type:</h3>
              <p className="text-gray-300">{selectedPrompt.game_type}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Comment
              </label>
              <Textarea
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Add a comment (optional)"
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
                placeholder="0"
              />
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => updatePromptStatus(selectedPrompt.id, 'approved')}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle size={16} className="mr-2" />
                Approve
              </Button>
              <Button
                onClick={() => updatePromptStatus(selectedPrompt.id, 'rejected')}
                className="bg-red-600 hover:bg-red-700"
              >
                <XCircle size={16} className="mr-2" />
                Reject
              </Button>
              <Button
                onClick={() => updatePromptStatus(selectedPrompt.id, 'in_review')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Clock size={16} className="mr-2" />
                Mark In Review
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedPrompt(null)}
                className="text-white border-gray-600 hover:bg-gray-800"
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
