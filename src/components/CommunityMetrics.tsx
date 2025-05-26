
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Gamepad2, Zap, TrendingUp, Globe, Trophy, Crown, Star, Gift } from 'lucide-react';

const CommunityMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 2847,
    gamesCreated: 1234,
    promptsSubmitted: 5678,
    chipsDistributed: 892340,
    activeBattles: 12,
    countriesReached: 45,
    chipsEarnedToday: 15420
  });

  const [isLive, setIsLive] = useState(true);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        promptsSubmitted: prev.promptsSubmitted + Math.floor(Math.random() * 5),
        chipsDistributed: prev.chipsDistributed + Math.floor(Math.random() * 100),
        chipsEarnedToday: prev.chipsEarnedToday + Math.floor(Math.random() * 50),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const topCreators = [
    { name: "Alex Chen", tier: "Gold", rank: 1, games: 23, chips: 15420, country: "🇺🇸", joinDate: "Day 1", badge: "🥇" },
    { name: "Sofia Rodriguez", tier: "Gold", rank: 2, games: 19, chips: 12890, country: "🇪🇸", joinDate: "Day 3", badge: "🥈" },
    { name: "Raj Patel", tier: "Silver", rank: 3, games: 21, chips: 14350, country: "🇮🇳", joinDate: "Day 5", badge: "🥉" },
    { name: "Emma Johnson", tier: "Silver", rank: 4, games: 17, chips: 11200, country: "🇬🇧", joinDate: "Week 1", badge: "⭐" },
  ];

  const recentActivity = [
    { action: "New waitlist member", user: "Mike Chen", detail: "joined from Brazil", time: "2 min ago", type: "join" },
    { action: "Concept saved", user: "Sarah Kim", detail: "Dragon Racing Academy", time: "5 min ago", type: "create" },
    { action: "Prompt shared", user: "David Brown", detail: "shared on Twitter", time: "8 min ago", type: "share" },
    { action: "Tier upgraded", user: "Lisa Wang", detail: "reached Silver tier", time: "12 min ago", type: "upgrade" },
    { action: "Referral bonus", user: "Tom Wilson", detail: "earned 50 chips", time: "15 min ago", type: "reward" },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Gold': return 'from-yellow-600 to-orange-600';
      case 'Silver': return 'from-gray-400 to-gray-600';
      case 'Bronze': return 'from-orange-700 to-red-700';
      default: return 'from-purple-600 to-blue-600';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'join': return '👋';
      case 'create': return '🎮';
      case 'share': return '📤';
      case 'upgrade': return '⬆️';
      case 'reward': return '🎁';
      default: return '📝';
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">LIVE WAITLIST</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Community in Real-Time
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch our global waitlist community grow and engage together
          </p>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/50">
            <CardContent className="p-4 text-center">
              <Users className="mx-auto mb-2 text-blue-400" size={24} />
              <div className="text-2xl font-bold text-white">{metrics.totalUsers.toLocaleString()}</div>
              <div className="text-xs text-blue-300">Waitlist Members</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/50">
            <CardContent className="p-4 text-center">
              <Gamepad2 className="mx-auto mb-2 text-purple-400" size={24} />
              <div className="text-2xl font-bold text-white">{metrics.promptsSubmitted.toLocaleString()}</div>
              <div className="text-xs text-purple-300">Concepts Saved</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 border-emerald-700/50">
            <CardContent className="p-4 text-center">
              <Zap className="mx-auto mb-2 text-emerald-400" size={24} />
              <div className="text-2xl font-bold text-white">{metrics.chipsDistributed.toLocaleString()}</div>
              <div className="text-xs text-emerald-300">Chips Reserved</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border-yellow-700/50">
            <CardContent className="p-4 text-center">
              <Gift className="mx-auto mb-2 text-yellow-400" size={24} />
              <div className="text-2xl font-bold text-white">{metrics.chipsEarnedToday.toLocaleString()}</div>
              <div className="text-xs text-yellow-300">Earned Today</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/50 to-red-800/30 border-red-700/50">
            <CardContent className="p-4 text-center">
              <TrendingUp className="mx-auto mb-2 text-red-400" size={24} />
              <div className="text-2xl font-bold text-white">{metrics.activeBattles}</div>
              <div className="text-xs text-red-300">Practice Battles</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/30 border-cyan-700/50">
            <CardContent className="p-4 text-center">
              <Globe className="mx-auto mb-2 text-cyan-400" size={24} />
              <div className="text-2xl font-bold text-white">{metrics.countriesReached}</div>
              <div className="text-xs text-cyan-300">Countries</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-800/30 border-purple-700/50">
            <CardContent className="p-4 text-center">
              <Crown className="mx-auto mb-2 text-purple-400" size={24} />
              <div className="text-2xl font-bold text-white">847</div>
              <div className="text-xs text-purple-300">Gold Members</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Waitlist Members */}
          <Card className="bg-gray-900/50 border-purple-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="mr-2 text-yellow-500" />
                Top Waitlist Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCreators.map((creator, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-purple-700/30">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${getTierColor(creator.tier)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {creator.rank}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">{creator.name}</span>
                          <span>{creator.country}</span>
                          <span className="text-lg">{creator.badge}</span>
                        </div>
                        <div className="text-gray-400 text-sm flex items-center gap-2">
                          <Badge className={`bg-gradient-to-r ${getTierColor(creator.tier)} text-white text-xs`}>
                            {creator.tier}
                          </Badge>
                          <span>Joined {creator.joinDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-yellow-600 text-white">
                        {creator.chips.toLocaleString()} chips
                      </Badge>
                      <div className="text-gray-400 text-xs mt-1">{creator.games} concepts</div>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 mt-4">
                  Join Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Live Activity Feed */}
          <Card className="bg-gray-900/50 border-purple-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                Live Waitlist Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg border border-purple-700/30">
                    <div className="text-xl">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <div className="text-white text-sm">{activity.action}</div>
                      <div className="text-gray-400 text-xs">
                        by <span className="text-purple-400">{activity.user}</span>
                        {activity.detail && <span> • {activity.detail}</span>}
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs">{activity.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-emerald-900/30 rounded-lg border border-purple-700/50">
                <h4 className="text-white font-semibold mb-2">Want to see your activity here?</h4>
                <p className="text-gray-300 text-sm mb-3">Join the waitlist and start creating concepts!</p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700">
                  Join Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunityMetrics;
