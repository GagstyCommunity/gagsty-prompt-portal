
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Zap, Trophy, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: string;
  action: string;
  user: string;
  details: string;
  time: string;
  type: 'signup' | 'prompt' | 'vote' | 'badge';
  avatar: string;
}

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentActivity();
    
    // Simulate live updates every 10 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new activity
        addSimulatedActivity();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchRecentActivity = async () => {
    try {
      // Fetch recent prompts
      const { data: recentPrompts } = await supabase
        .from('game_prompts')
        .select('id, title, user_id, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      // Fetch recent user signups
      const { data: recentUsers } = await supabase
        .from('profiles')
        .select('id, full_name, username, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      const activityData: Activity[] = [];

      // Add prompt activities
      if (recentPrompts) {
        for (const prompt of recentPrompts) {
          // Fetch user profile for each prompt
          const { data: userProfile } = await supabase
            .from('profiles')
            .select('username, full_name')
            .eq('id', prompt.user_id)
            .single();

          activityData.push({
            id: `prompt-${prompt.id}`,
            action: 'submitted a game prompt',
            user: userProfile?.username || userProfile?.full_name || 'Anonymous',
            details: prompt.title,
            time: new Date(prompt.created_at).toLocaleTimeString(),
            type: 'prompt',
            avatar: '🎮'
          });
        }
      }

      // Add signup activities
      if (recentUsers) {
        recentUsers.forEach((user, index) => {
          activityData.push({
            id: `signup-${user.id}-${index}`,
            action: 'joined the waitlist',
            user: user.username || user.full_name || 'Anonymous',
            details: 'Ready to create amazing games!',
            time: new Date(user.created_at).toLocaleTimeString(),
            type: 'signup',
            avatar: '🚀'
          });
        });
      }

      // Add some simulated activities for demo purposes
      const simulatedActivities: Activity[] = [
        {
          id: 'vote-1',
          action: 'voted on',
          user: 'GameMaster_42',
          details: 'Space Pirates vs Alien Cats',
          time: new Date().toLocaleTimeString(),
          type: 'vote',
          avatar: '⭐'
        },
        {
          id: 'badge-1',
          action: 'earned the',
          user: 'PixelPioneer',
          details: 'Creative Genius badge',
          time: new Date().toLocaleTimeString(),
          type: 'badge',
          avatar: '🏆'
        }
      ];

      // Combine and sort all activities
      const allActivities = [...activityData, ...simulatedActivities]
        .sort(() => Math.random() - 0.5) // Shuffle for demo
        .slice(0, 6);

      setActivities(allActivities);
    } catch (error) {
      console.error('Error fetching activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSimulatedActivity = () => {
    const newActivities = [
      {
        id: `live-${Date.now()}`,
        action: 'just joined',
        user: `Creator${Math.floor(Math.random() * 1000)}`,
        details: 'Welcome to the community!',
        time: new Date().toLocaleTimeString(),
        type: 'signup' as const,
        avatar: '🌟'
      }
    ];

    setActivities(prev => [newActivities[0], ...prev.slice(0, 5)]);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'signup': return <User size={16} className="text-[#00C6FB]" />;
      case 'prompt': return <Zap size={16} className="text-[#A084FF]" />;
      case 'vote': return <Trophy size={16} className="text-[#16FF6F]" />;
      case 'badge': return <Trophy size={16} className="text-[#FFB800]" />;
      default: return <Users size={16} className="text-gagsty-secondary" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'signup': return 'border-[#00C6FB]/30 bg-[#00C6FB]/10';
      case 'prompt': return 'border-[#A084FF]/30 bg-[#A084FF]/10';
      case 'vote': return 'border-[#16FF6F]/30 bg-[#16FF6F]/10';
      case 'badge': return 'border-[#FFB800]/30 bg-[#FFB800]/10';
      default: return 'border-[#262A34] bg-transparent';
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="gagsty-card p-4 animate-pulse">
            <div className="h-4 bg-[#262A34] rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-[#262A34] rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gagsty-primary">Live Activity</h3>
        <div className="w-2 h-2 bg-[#16FF6F] rounded-full animate-pulse" />
      </div>
      
      {activities.map((activity) => (
        <div key={activity.id} className={`gagsty-card p-4 border ${getActivityColor(activity.type)} gagsty-lift-hover`}>
          <div className="flex items-start space-x-3">
            <div className="text-lg">{activity.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                {getActivityIcon(activity.type)}
                <p className="text-gagsty-primary text-sm font-medium truncate">
                  {activity.user}
                </p>
                <span className="text-gagsty-muted text-xs">{activity.time}</span>
              </div>
              <p className="text-gagsty-secondary text-xs">
                {activity.action} <span className="text-gagsty-primary font-medium">{activity.details}</span>
              </p>
              {activity.type === 'badge' && (
                <Badge className="mt-2 bg-[#FFB800]/20 text-[#FFB800] text-xs">
                  New Achievement
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
      
      <div className="text-center pt-2">
        <button className="text-[#00C6FB] text-sm hover:text-[#00C6FB]/80 transition-colors">
          View All Activity →
        </button>
      </div>
    </div>
  );
};

export default LiveActivityFeed;
