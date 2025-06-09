
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, Trophy, Users, TrendingUp, Star, Clock } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';

const EnhancedDashboard = () => {
  const { profile } = useUserData();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 border border-purple-500/30">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome back, {profile?.full_name || 'Creator'}! 🚀
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Your creative journey continues. Ready to build something amazing today?
        </p>
        <div className="flex flex-wrap gap-4">
          <Badge className="bg-purple-600 text-white px-4 py-2 text-lg">
            Level {Math.floor((profile?.gagsty_chips || 0) / 1000) + 1}
          </Badge>
          <Badge className="bg-blue-600 text-white px-4 py-2 text-lg">
            {profile?.status || 'Active'} Member
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-yellow-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-yellow-400 flex items-center text-lg">
              <Coins className="mr-2" size={24} />
              G-Chips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{profile?.gagsty_chips || 0}</div>
            <p className="text-yellow-300">+{Math.floor(Math.random() * 100 + 50)} this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-400 flex items-center text-lg">
              <Trophy className="mr-2" size={24} />
              Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{profile?.badge_count || 0}</div>
            <p className="text-purple-300">2 unlocked recently</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-400 flex items-center text-lg">
              <Users className="mr-2" size={24} />
              Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{profile?.total_referrals || 0}</div>
            <p className="text-blue-300">Earn 200 chips per referral</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-400 flex items-center text-lg">
              <TrendingUp className="mr-2" size={24} />
              Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">#{Math.max(1, 1000 - Math.floor((profile?.gagsty_chips || 0) / 10))}</div>
            <p className="text-green-300">Moving up! 📈</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white">Game prompt "Epic Space Adventure" was approved!</p>
                <p className="text-gray-400 text-sm">2 hours ago • +150 chips earned</p>
              </div>
              <Star className="text-yellow-500" size={20} />
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white">New badge unlocked: "Active Creator"</p>
                <p className="text-gray-400 text-sm">1 day ago • Badge earned</p>
              </div>
              <Trophy className="text-purple-500" size={20} />
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white">Referred friend Alex joined Gagsty</p>
                <p className="text-gray-400 text-sm">3 days ago • +200 chips earned</p>
              </div>
              <Users className="text-blue-500" size={20} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDashboard;
