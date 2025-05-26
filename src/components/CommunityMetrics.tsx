
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Gamepad2, Coins, Globe, Zap } from 'lucide-react';

const CommunityMetrics = () => {
  const [stats, setStats] = useState({
    totalUsers: 12847,
    gamesCreated: 1289,
    promptsSubmitted: 5643,
    chipsEarned: 458920,
    activeCreators: 892,
    countriesReached: 67
  });

  const [isLive, setIsLive] = useState(true);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setStats(prev => ({
          ...prev,
          totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
          promptsSubmitted: prev.promptsSubmitted + Math.floor(Math.random() * 2),
          chipsEarned: prev.chipsEarned + Math.floor(Math.random() * 50),
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const achievements = [
    { milestone: "10K Users", reached: true, date: "Nov 2024" },
    { milestone: "1K Games Created", reached: true, date: "Dec 2024" },
    { milestone: "100K Chips Distributed", reached: true, date: "Dec 2024" },
    { milestone: "50 Countries", reached: true, date: "Dec 2024" },
    { milestone: "25K Users", reached: false, progress: "48%" },
    { milestone: "5K Games Created", reached: false, progress: "26%" }
  ];

  const recentActivity = [
    { action: "🎮 New game created", user: "Alex K.", time: "2 min ago" },
    { action: "🏆 Badge earned", user: "Sarah M.", time: "4 min ago" },
    { action: "💡 Prompt submitted", user: "Mike R.", time: "6 min ago" },
    { action: "👥 User joined", user: "Emma L.", time: "8 min ago" },
    { action: "💰 Chips earned", user: "David P.", time: "12 min ago" }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Badge className="bg-green-600 text-white flex items-center">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse mr-2"></div>
              LIVE STATS
            </Badge>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Community Growth
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join a thriving community of creators building the future of gaming
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4 text-center">
              <Users className="text-blue-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Users</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4 text-center">
              <Gamepad2 className="text-purple-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-white">{stats.gamesCreated.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Games Created</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4 text-center">
              <Zap className="text-yellow-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-white">{stats.promptsSubmitted.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Prompts</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4 text-center">
              <Coins className="text-green-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-white">{stats.chipsEarned.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Chips Earned</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4 text-center">
              <TrendingUp className="text-orange-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-white">{stats.activeCreators.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Active Creators</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4 text-center">
              <Globe className="text-cyan-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-white">{stats.countriesReached}</div>
              <div className="text-sm text-gray-400">Countries</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="mr-2 text-green-500" />
                Community Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      achievement.reached 
                        ? 'bg-green-900/30 border border-green-800/30' 
                        : 'bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`text-2xl ${achievement.reached ? '🏆' : '🎯'}`}>
                        {achievement.reached ? '🏆' : '🎯'}
                      </span>
                      <div>
                        <div className={`font-medium ${
                          achievement.reached ? 'text-green-400' : 'text-gray-300'
                        }`}>
                          {achievement.milestone}
                        </div>
                        {achievement.reached && (
                          <div className="text-sm text-gray-400">{achievement.date}</div>
                        )}
                      </div>
                    </div>
                    {!achievement.reached && (
                      <Badge className="bg-gray-700 text-gray-300">
                        {achievement.progress}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Activity Feed */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                Live Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg">{activity.action.split(' ')[0]}</div>
                      <div>
                        <div className="text-gray-300 text-sm">
                          {activity.action.substring(2)}
                        </div>
                        <div className="text-gray-500 text-xs">by {activity.user}</div>
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs">{activity.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <div className="text-sm text-gray-400">
                  🔥 <span className="text-green-400 font-medium">24</span> actions in the last hour
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunityMetrics;
