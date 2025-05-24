
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Coins, Trophy } from 'lucide-react';

const UserBadges = () => {
  const { user } = useAuth();
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [allBadges, setAllBadges] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

    try {
      // Fetch user badges
      const { data: badgesData, error: badgesError } = await supabase
        .from('user_badges')
        .select(`
          *,
          badges (*)
        `)
        .eq('user_id', user.id);

      if (badgesError) throw badgesError;

      // Fetch all badges
      const { data: allBadgesData, error: allBadgesError } = await supabase
        .from('badges')
        .select('*')
        .order('created_at');

      if (allBadgesError) throw allBadgesError;

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      setUserBadges(badgesData || []);
      setAllBadges(allBadgesData || []);
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching badges:', error);
    } finally {
      setLoading(false);
    }
  };

  const earnedBadgeIds = userBadges.map(ub => ub.badge_id);

  if (loading) {
    return <div className="text-white">Loading badges...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Gagsty Chips Balance */}
      <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Coins className="mr-2 text-yellow-500" />
            Gagsty Chips Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-yellow-500 mb-2">
            {profile?.gagsty_chips || 0} G-Chips
          </div>
          <p className="text-gray-300">
            Earn more chips by submitting prompts, completing your profile, and participating in events!
          </p>
        </CardContent>
      </Card>

      {/* Earned Badges */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Trophy className="mr-2 text-blue-500" />
            Your Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userBadges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userBadges.map((userBadge) => (
                <div
                  key={userBadge.id}
                  className="p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-800/30"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{userBadge.badges.icon}</div>
                    <h3 className="font-semibold text-white">{userBadge.badges.name}</h3>
                    <p className="text-sm text-gray-300 mt-1">{userBadge.badges.description}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Earned: {new Date(userBadge.earned_at).toLocaleDateString()}
                    </p>
                    {userBadge.badges.chips_reward > 0 && (
                      <div className="text-yellow-500 text-sm mt-1">
                        +{userBadge.badges.chips_reward} G-Chips
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">
              No badges earned yet. Start by submitting your first prompt!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Available Badges */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Available Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allBadges.map((badge) => {
              const isEarned = earnedBadgeIds.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border ${
                    isEarned
                      ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-800/30'
                      : 'bg-gray-800/30 border-gray-700'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-3xl mb-2 ${isEarned ? '' : 'grayscale opacity-50'}`}>
                      {badge.icon}
                    </div>
                    <h3 className={`font-semibold ${isEarned ? 'text-green-400' : 'text-gray-400'}`}>
                      {badge.name}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">{badge.description}</p>
                    {badge.chips_reward > 0 && (
                      <div className="text-yellow-500 text-sm mt-1">
                        Reward: {badge.chips_reward} G-Chips
                      </div>
                    )}
                    {isEarned && (
                      <Badge className="mt-2 bg-green-600 text-white">
                        ✓ Earned
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBadges;
