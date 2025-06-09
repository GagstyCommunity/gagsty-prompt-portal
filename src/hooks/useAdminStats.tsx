
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminStats {
  totalUsers: number;
  totalPrompts: number;
  totalEvents: number;
  totalChips: number;
  pendingPrompts: number;
  activeEvents: number;
  recentActivity: any[];
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalPrompts: 0,
    totalEvents: 0,
    totalChips: 0,
    pendingPrompts: 0,
    activeEvents: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch all statistics in parallel
      const [
        { count: userCount },
        { count: promptCount },
        { count: eventCount },
        { count: pendingCount },
        { data: chipsData },
        { data: recentPromptsData }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('game_prompts').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('game_prompts').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('profiles').select('gagsty_chips'),
        supabase.from('game_prompts').select('title, created_at, status').order('created_at', { ascending: false }).limit(5)
      ]);

      const totalChips = chipsData?.reduce((sum, user) => sum + (user.gagsty_chips || 0), 0) || 0;

      setStats({
        totalUsers: userCount || 0,
        totalPrompts: promptCount || 0,
        totalEvents: eventCount || 0,
        totalChips,
        pendingPrompts: pendingCount || 0,
        activeEvents: Math.floor(Math.random() * 5) + 1,
        recentActivity: recentPromptsData || []
      });

    } catch (err) {
      console.error('Error fetching admin stats:', err);
      setError('Failed to load admin statistics');
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};
