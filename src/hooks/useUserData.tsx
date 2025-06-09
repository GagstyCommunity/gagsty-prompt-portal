
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  full_name: string;
  gagsty_chips: number;
  profile_completed: boolean;
  username: string;
  avatar_url: string;
  bio: string;
  referral_code: string;
  status: string;
  badge_count: number;
  total_referrals: number;
  last_login: string;
}

interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned_at: string;
}

interface UserPrompt {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  chips_reward: number;
}

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [prompts, setPrompts] = useState<UserPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch user profile with all new fields
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      // Transform the data to match our interface with default values
      if (profileData) {
        setProfile({
          id: profileData.id,
          full_name: profileData.full_name || '',
          gagsty_chips: profileData.gagsty_chips || 0,
          profile_completed: profileData.profile_completed || false,
          username: profileData.username || '',
          avatar_url: profileData.avatar_url || '',
          bio: profileData.bio || '',
          referral_code: profileData.referral_code || '',
          status: (profileData as any).status || 'active',
          badge_count: (profileData as any).badge_count || 0,
          total_referrals: (profileData as any).total_referrals || 0,
          last_login: (profileData as any).last_login || ''
        });
      }

      // Fetch user badges
      const { data: badgesData, error: badgesError } = await supabase
        .from('user_badges')
        .select(`
          id,
          earned_at,
          badges (
            name,
            description,
            icon
          )
        `)
        .eq('user_id', user.id);

      if (badgesError) {
        console.error('Error fetching badges:', badgesError);
      } else {
        setBadges(badgesData?.map(item => ({
          id: item.id,
          name: item.badges?.name || '',
          description: item.badges?.description || '',
          icon: item.badges?.icon || '🏆',
          earned_at: item.earned_at
        })) || []);
      }

      // Fetch user prompts
      const { data: promptsData, error: promptsError } = await supabase
        .from('game_prompts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (promptsError) {
        console.error('Error fetching prompts:', promptsError);
      } else {
        setPrompts(promptsData || []);
      }

    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const updateChips = async (amount: number) => {
    if (!user || !profile) return;

    try {
      const newAmount = profile.gagsty_chips + amount;
      const { error } = await supabase
        .from('profiles')
        .update({ gagsty_chips: newAmount })
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, gagsty_chips: newAmount } : null);
    } catch (err) {
      console.error('Error updating chips:', err);
    }
  };

  return {
    profile,
    badges,
    prompts,
    loading,
    error,
    updateChips,
    refetch: fetchUserData
  };
};
