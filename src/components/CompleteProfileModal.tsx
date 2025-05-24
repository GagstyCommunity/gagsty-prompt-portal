
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { X } from 'lucide-react';

interface CompleteProfileModalProps {
  profile: any;
  onClose: () => void;
  onComplete: () => void;
}

const CompleteProfileModal: React.FC<CompleteProfileModalProps> = ({
  profile,
  onClose,
  onComplete,
}) => {
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    bio: profile?.bio || '',
    avatar_url: profile?.avatar_url || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          bio: formData.bio,
          avatar_url: formData.avatar_url,
          profile_completed: true,
          gagsty_chips: (profile?.gagsty_chips || 0) + 100, // Add 100 chips for completing profile
        })
        .eq('id', profile.id);

      if (profileError) throw profileError;

      // Award the Profile Master badge
      const { data: profileMasterBadge } = await supabase
        .from('badges')
        .select('id')
        .eq('name', 'Profile Master')
        .single();

      if (profileMasterBadge) {
        await supabase
          .from('user_badges')
          .insert({
            user_id: profile.id,
            badge_id: profileMasterBadge.id,
          });
      }

      toast({
        title: "Profile Completed! 🎉",
        description: "You've earned 100 G-Chips and the Profile Master badge!",
      });

      onComplete();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-900 border-gray-800 max-w-md w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Complete Your Profile</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </Button>
          </div>
          <p className="text-gray-300 text-sm">
            Complete your profile to earn 100 G-Chips and unlock the Profile Master badge!
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username *
              </label>
              <Input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Choose a unique username"
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                className="bg-gray-800 border-gray-700 text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Avatar URL
              </label>
              <Input
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
                className="bg-gray-800 border-gray-700 text-white"
                type="url"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Complete Profile & Earn 100 G-Chips!'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteProfileModal;
