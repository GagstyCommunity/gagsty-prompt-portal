
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Award } from 'lucide-react';

const AdminBadges = () => {
  const [badges, setBadges] = useState<any[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    chips_reward: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBadges(data || []);
    } catch (error) {
      console.error('Error fetching badges:', error);
      toast({
        title: "Error",
        description: "Failed to fetch badges.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveBadge = async () => {
    try {
      if (selectedBadge) {
        // Update existing badge
        const { error } = await supabase
          .from('badges')
          .update(formData)
          .eq('id', selectedBadge.id);

        if (error) throw error;
        toast({ title: "Success", description: "Badge updated successfully." });
      } else {
        // Create new badge
        const { error } = await supabase
          .from('badges')
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Success", description: "Badge created successfully." });
      }

      resetForm();
      fetchBadges();
    } catch (error) {
      console.error('Error saving badge:', error);
      toast({
        title: "Error",
        description: "Failed to save badge.",
        variant: "destructive",
      });
    }
  };

  const deleteBadge = async (badgeId: string) => {
    try {
      const { error } = await supabase
        .from('badges')
        .delete()
        .eq('id', badgeId);

      if (error) throw error;

      toast({ title: "Success", description: "Badge deleted successfully." });
      fetchBadges();
    } catch (error) {
      console.error('Error deleting badge:', error);
      toast({
        title: "Error",
        description: "Failed to delete badge.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: '',
      chips_reward: 0
    });
    setSelectedBadge(null);
    setIsCreating(false);
  };

  const editBadge = (badge: any) => {
    setSelectedBadge(badge);
    setFormData({
      name: badge.name,
      description: badge.description,
      icon: badge.icon || '',
      chips_reward: badge.chips_reward || 0
    });
    setIsCreating(true);
  };

  if (loading) {
    return <div className="text-white">Loading badges...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Badges System</h2>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus size={16} className="mr-2" />
          Create Badge
        </Button>
      </div>

      {isCreating && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">
              {selectedBadge ? 'Edit Badge' : 'Create New Badge'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Badge Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g., Legend"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Describe what this badge represents..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Icon (emoji or symbol)
              </label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="🏆"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Chips Reward
              </label>
              <Input
                type="number"
                value={formData.chips_reward}
                onChange={(e) => setFormData({ ...formData, chips_reward: Number(e.target.value) })}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="0"
              />
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={saveBadge}
                className="bg-green-600 hover:bg-green-700"
                disabled={!formData.name || !formData.description}
              >
                {selectedBadge ? 'Update' : 'Create'} Badge
              </Button>
              <Button
                variant="outline"
                onClick={resetForm}
                className="text-white border-gray-600 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <Card key={badge.id} className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{badge.icon || '🏆'}</span>
                  <h3 className="font-semibold text-white">{badge.name}</h3>
                </div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => editBadge(badge)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteBadge(badge.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">{badge.description}</p>
              
              {badge.chips_reward > 0 && (
                <div className="flex items-center text-yellow-500 text-sm">
                  <Award size={14} className="mr-1" />
                  {badge.chips_reward} G-Chips
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminBadges;
