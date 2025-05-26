
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Gamepad2, Zap, TrendingUp, Globe, Trophy } from 'lucide-react';

const CommunityMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 2847,
    gamesCreated: 1234,
    promptsSubmitted: 5678,
    chipsDistributed: 892340,
    activeBattles: 12,
    countriesReached: 45
  });

  const [isLive, setIsLive] = useState(true);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        gamesCreated: prev.gamesCreated + Math.floor(Math.random() * 2),
        promptsSubmitted: prev.promptsSubmitted + Math.floor(Math.random() * 5),
        chipsDistributed: prev.chipsDistributed + Math.floor(Math.random() * 100),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const topCreators = [
    { name: "Alex Chen", games: 23, chips: 15420, country: "🇺🇸" },
    { name: "Sofia Rodriguez", games: 19, chips: 12890, country: "🇪🇸" },
    { name: "Raj Patel", games: 21, chips: 14350, country: "🇮🇳" },
    { name: "Emma Johnson", games: 17, chips: 11200, country: "🇬🇧" },
  ];

  const recentActivity = [
    { action: "New game created", user: "Mike Chen", game: "Space Cats Adventure", time: "2 min ago" },
    { action: "Prompt battle won", user: "Sarah Kim", reward: "500 chips", time: "5 min ago" },
    { action: "User joined waitlist", user: "David Brown", location: "Brazil", time: "8 min ago" },
    { action: "Badge earned", user: "Lisa Wang", badge: "Game Master", time: "12 min ago" },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">LIVE</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Community in Real-Time
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch our global community create, play, and earn together
          </p>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/50">
            <CardContent className="p-4 text-center">
              <Users className="mx-auto mb-2 text-blue-400" size={24} />
              <div className="text-2xl font-bold text-white">{metrics.totalUsers.toLocaleString()}</div>
              <div className="text-xs text-blue-300">Total Creators</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/50">
            <CardContent className="p-4 text-center">
              <Gamepad2 className="mx-auto mb-2 text-purple-400" size={24} />
              <div className="text-2xl font-bold text-white">{metrics.gamesCreated.toLocaleString()}</div>
              <div className="text-xs text-purple-300">Games Created</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 border-emerald-700/50">
            <CardContent className="p-4 text-center">
              <Zap className="mx-auto mb-2 text-emerald-400" size={24} />
              <div className="text-2xl font-bold text-white">{metrics.promptsSubmitted.toLocaleString()}</div>
              <div className="text-xs text-emerald-300">Prompts Submitted</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border-yellow-700/50">
            <CardContent className="p-4 text-center">
              <Trophy className="mx-auto mb-2 text-yellow-400" size={24} />
              <div className="text-2xl font-bold text-white">{metrics.chipsDistributed.toLocaleString()}</div>
              <div className="text-xs text-yellow-300">Chips Distributed</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/50 to-red-800/30 border-red-700/50">
            <CardContent className="p-4 text-center">
              <TrendingUp className="mx-auto mb-2 text-red-400" size={24} />
              <div className="text-2xl font-bold text-white">{metrics.activeBattles}</div>
              <div className="text-xs text-red-300">Active Battles</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/30 border-cyan-700/50">
            <CardContent className="p-4 text-center">
              <Globe className="mx-auto mb-2 text-cyan-400" size={24} />
              <div className="text-2xl font-bold text-white">{metrics.countriesReached}</div>
              <div className="text-xs text-cyan-300">Countries</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Creators */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="mr-2 text-yellow-500" />
                Top Creators This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCreators.map((creator, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">{creator.name}</span>
                          <span>{creator.country}</span>
                        </div>
                        <div className="text-gray-400 text-sm">{creator.games} games created</div>
                      </div>
                    </div>
                    <Badge className="bg-yellow-600 text-white">
                      {creator.chips.toLocaleString()} chips
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Activity Feed */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                Live Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-white text-sm">{activity.action}</div>
                      <div className="text-gray-400 text-xs">
                        by <span className="text-blue-400">{activity.user}</span>
                        {activity.game && <span> • {activity.game}</span>}
                        {activity.reward && <span> • {activity.reward}</span>}
                        {activity.location && <span> • {activity.location}</span>}
                        {activity.badge && <span> • {activity.badge}</span>}
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunityMetrics;
