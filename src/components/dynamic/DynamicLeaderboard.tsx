
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Coins, Trophy, Medal, Award } from 'lucide-react';
import { useLeaderboard } from '@/hooks/useLeaderboard';

const DynamicLeaderboard = () => {
  const { leaderboard, loading, error } = useLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="text-yellow-500" size={24} />;
      case 2: return <Medal className="text-gray-400" size={24} />;
      case 3: return <Award className="text-orange-600" size={24} />;
      default: return <span className="text-2xl font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case 2: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      case 3: return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      default: return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    }
  };

  if (loading) {
    return (
      <Card className="gagsty-card">
        <CardHeader>
          <CardTitle className="text-gagsty-primary">Top Creators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="w-8 h-8 bg-gray-700 rounded"></div>
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="gagsty-card">
        <CardHeader>
          <CardTitle className="text-gagsty-primary">Top Creators</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gagsty-secondary">Unable to load leaderboard</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gagsty-card">
      <CardHeader>
        <CardTitle className="text-gagsty-primary flex items-center space-x-2">
          <Trophy className="text-yellow-500" size={24} />
          <span>Top Creators</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.slice(0, 10).map((entry) => (
            <div key={entry.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
              <div className="flex-shrink-0 w-8 flex justify-center">
                {getRankIcon(entry.rank)}
              </div>
              
              <Avatar className="w-10 h-10">
                <AvatarImage src={entry.avatar_url} alt={entry.full_name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  {entry.full_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <p className="text-gagsty-primary font-medium truncate">
                  {entry.full_name || entry.username || 'Anonymous'}
                </p>
                <div className="flex items-center space-x-2">
                  <Coins className="text-yellow-500" size={14} />
                  <span className="text-gagsty-secondary text-sm">
                    {entry.gagsty_chips.toLocaleString()} Chips
                  </span>
                </div>
              </div>
              
              <Badge className={getRankBadgeColor(entry.rank)}>
                #{entry.rank}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicLeaderboard;
