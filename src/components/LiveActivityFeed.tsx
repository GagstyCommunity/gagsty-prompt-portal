
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Zap, Trophy, Users, Clock, Star, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: string;
  action: string;
  user: string;
  details: string;
  time: string;
  type: 'signup' | 'referral' | 'milestone' | 'countdown';
  avatar: string;
  tier?: string;
}

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalWaitlist, setTotalWaitlist] = useState(50247);

  useEffect(() => {
    fetchRecentActivity();
    
    // Simulate live updates every 8 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance of new activity
        addSimulatedActivity();
        // Increment waitlist count occasionally
        if (Math.random() > 0.8) {
          setTotalWaitlist(prev => prev + Math.floor(Math.random() * 3) + 1);
        }
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const fetchRecentActivity = async () => {
    try {
      // Fetch recent user signups for waitlist activity
      const { data: recentUsers } = await supabase
        .from('profiles')
        .select('id, full_name, username, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      const activityData: Activity[] = [];

      // Add signup activities
      if (recentUsers) {
        recentUsers.forEach((user, index) => {
          const tier = index === 0 ? 'VIP' : index === 1 ? 'Beta' : 'Launch';
          activityData.push({
            id: `signup-${user.id}-${index}`,
            action: 'joined the waitlist',
            user: user.username || user.full_name || 'Anonymous Creator',
            details: `Secured ${tier} Early Access spot`,
            time: new Date(user.created_at).toLocaleTimeString(),
            type: 'signup',
            avatar: '🚀',
            tier
          });
        });
      }

      // Add some simulated waitlist activities for demo purposes
      const simulatedActivities: Activity[] = [
        {
          id: 'referral-1',
          action: 'referred 3 friends',
          user: 'GameMaster_42',
          details: 'Moved up 15 positions in waitlist',
          time: new Date().toLocaleTimeString(),
          type: 'referral',
          avatar: '🎯'
        },
        {
          id: 'milestone-1',
          action: 'milestone reached',
          user: 'System',
          details: '50,000+ creators on waitlist!',
          time: new Date().toLocaleTimeString(),
          type: 'milestone',
          avatar: '🎉'
        },
        {
          id: 'signup-2',
          action: 'joined VIP tier',
          user: 'PixelPioneer',
          details: 'Only 23 VIP spots left',
          time: new Date().toLocaleTimeString(),
          type: 'signup',
          avatar: '👑',
          tier: 'VIP'
        },
        {
          id: 'countdown-1',
          action: 'countdown update',
          user: 'System',
          details: '247 days until launch',
          time: new Date().toLocaleTimeString(),
          type: 'countdown',
          avatar: '⏰'
        }
      ];

      // Combine and sort all activities
      const allActivities = [...activityData, ...simulatedActivities]
        .sort(() => Math.random() - 0.5) // Shuffle for demo
        .slice(0, 8);

      setActivities(allActivities);
    } catch (error) {
      console.error('Error fetching activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSimulatedActivity = () => {
    const activityTypes = [
      {
        action: 'joined the waitlist',
        details: 'Secured Early Access spot',
        type: 'signup' as const,
        avatar: '🌟'
      },
      {
        action: 'referred friends',
        details: 'Boosted waitlist position',
        type: 'referral' as const,
        avatar: '🎯'
      },
      {
        action: 'joined VIP tier',
        details: 'Limited spots remaining',
        type: 'signup' as const,
        avatar: '👑',
        tier: 'VIP'
      }
    ];

    const randomActivity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const newActivity: Activity = {
      id: `live-${Date.now()}`,
      action: randomActivity.action,
      user: `Creator${Math.floor(Math.random() * 1000)}`,
      details: randomActivity.details,
      time: new Date().toLocaleTimeString(),
      type: randomActivity.type,
      avatar: randomActivity.avatar,
      tier: randomActivity.tier
    };

    setActivities(prev => [newActivity, ...prev.slice(0, 7)]);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'signup': return <UserPlus size={16} className="text-[#00C6FB]" />;
      case 'referral': return <Users size={16} className="text-[#16FF6F]" />;
      case 'milestone': return <Trophy size={16} className="text-[#FFB800]" />;
      case 'countdown': return <Clock size={16} className="text-[#A084FF]" />;
      default: return <Star size={16} className="text-gagsty-secondary" />;
    }
  };

  const getActivityColor = (type: string, tier?: string) => {
    if (tier === 'VIP') return 'border-[#FFB800]/30 bg-[#FFB800]/10';
    
    switch (type) {
      case 'signup': return 'border-[#00C6FB]/30 bg-[#00C6FB]/10';
      case 'referral': return 'border-[#16FF6F]/30 bg-[#16FF6F]/10';
      case 'milestone': return 'border-[#FFB800]/30 bg-[#FFB800]/10';
      case 'countdown': return 'border-[#A084FF]/30 bg-[#A084FF]/10';
      default: return 'border-[#262A34] bg-transparent';
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
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
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Waitlist Activity</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-[#16FF6F] rounded-full animate-pulse" />
          <span className="text-[#16FF6F] text-sm font-medium">Live</span>
        </div>
      </div>

      {/* Total waitlist counter */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm p-4 rounded-2xl border border-purple-500/30 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {totalWaitlist.toLocaleString()}
          </div>
          <div className="text-white/70 text-sm">Creators on Waitlist</div>
        </div>
      </div>
      
      {activities.map((activity) => (
        <div key={activity.id} className={`gagsty-card p-4 border ${getActivityColor(activity.type, activity.tier)} gagsty-lift-hover transition-all duration-300 hover:scale-105`}>
          <div className="flex items-start space-x-3">
            <div className="text-lg">{activity.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                {getActivityIcon(activity.type)}
                <p className="text-white text-sm font-medium truncate">
                  {activity.user}
                </p>
                <span className="text-white/60 text-xs">{activity.time}</span>
              </div>
              <p className="text-white/80 text-xs">
                {activity.action} <span className="text-white font-medium">{activity.details}</span>
              </p>
              {activity.tier && (
                <Badge className="mt-2 bg-[#FFB800]/20 text-[#FFB800] text-xs">
                  {activity.tier} Access
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
      
      <div className="text-center pt-4">
        <button className="text-[#00C6FB] text-sm hover:text-[#00C6FB]/80 transition-colors">
          Join the Waitlist →
        </button>
      </div>
    </div>
  );
};

export default LiveActivityFeed;
