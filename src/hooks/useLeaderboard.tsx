
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  id: string;
  full_name: string;
  username: string;
  gagsty_chips: number;
  avatar_url: string;
  rank: number;
}

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, username, gagsty_chips, avatar_url')
        .order('gagsty_chips', { ascending: false })
        .limit(50);

      if (error) throw error;

      const leaderboardWithRank = data?.map((entry, index) => ({
        ...entry,
        rank: index + 1
      })) || [];

      setLeaderboard(leaderboardWithRank);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  return {
    leaderboard,
    loading,
    error,
    refetch: fetchLeaderboard
  };
};
