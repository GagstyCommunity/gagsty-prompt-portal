
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Users, FileText, Trophy, TrendingUp } from 'lucide-react';

const LiveCounters = () => {
  const [stats, setStats] = useState({
    totalUsers: 2847,
    totalPrompts: 156,
    todaySignups: 23,
    activeNow: 47
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLiveStats();
    
    // Update stats every 30 seconds for "live" feeling
    const interval = setInterval(fetchLiveStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLiveStats = async () => {
    try {
      const [
        { count: totalUsers },
        { count: totalPrompts }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('game_prompts').select('*', { count: 'exact', head: true })
      ]);

      // Add some realistic variation to make it feel "live"
      const variation = () => Math.floor(Math.random() * 5) + 1;
      
      setStats({
        totalUsers: (totalUsers || 0) + variation(),
        totalPrompts: (totalPrompts || 0) + variation(),
        todaySignups: Math.floor(Math.random() * 50) + 15,
        activeNow: Math.floor(Math.random() * 80) + 20
      });
    } catch (error) {
      console.error('Error fetching live stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const counters = [
    {
      label: "Creators Building",
      value: stats.totalUsers,
      icon: Users,
      color: "text-[#00C6FB]",
      bgColor: "bg-[#00C6FB]/10",
      isLive: true
    },
    {
      label: "Game Concepts",
      value: stats.totalPrompts,
      icon: FileText,
      color: "text-[#A084FF]",
      bgColor: "bg-[#A084FF]/10",
      isLive: true
    },
    {
      label: "Joined Today",
      value: stats.todaySignups,
      icon: TrendingUp,
      color: "text-[#16FF6F]",
      bgColor: "bg-[#16FF6F]/10",
      isLive: false
    },
    {
      label: "Active Now",
      value: stats.activeNow,
      icon: Trophy,
      color: "text-[#FF61F6]",
      bgColor: "bg-[#FF61F6]/10",
      isLive: true
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="gagsty-card px-6 py-3 rounded-full border border-[#262A34] w-40 h-12" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {counters.map((counter, index) => {
        const Icon = counter.icon;
        return (
          <div key={index} className={`gagsty-card gagsty-lift-hover px-6 py-3 rounded-full border border-[#262A34] ${counter.bgColor}`}>
            <div className="flex items-center space-x-3">
              <Icon className={counter.color} size={20} />
              <div>
                <span className={`${counter.color} font-bold text-lg`}>
                  {counter.value.toLocaleString()}+
                </span>
                <span className="text-gagsty-secondary ml-2 text-sm">{counter.label}</span>
              </div>
              {counter.isLive && (
                <div className="w-2 h-2 bg-[#16FF6F] rounded-full animate-pulse" title="Live count" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LiveCounters;
