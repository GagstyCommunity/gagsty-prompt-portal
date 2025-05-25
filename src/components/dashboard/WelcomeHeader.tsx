
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, Coins } from 'lucide-react';

interface WelcomeHeaderProps {
  profile: any;
  waitlistPosition: number;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ profile, waitlistPosition }) => {
  const progressPercentage = Math.max(0, Math.min(100, (10000 - waitlistPosition) / 100));
  
  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome, {profile?.full_name || 'Gamer'}! 👋
        </h1>
        <p className="text-gray-300">Ready to build the future of gaming?</p>
      </div>

      {/* Progress & Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Trophy className="text-yellow-500" size={24} />
              <div>
                <h3 className="text-white font-semibold">Waitlist Rank</h3>
                <p className="text-2xl font-bold text-yellow-500">#{waitlistPosition}</p>
                <p className="text-sm text-gray-400">Top {Math.ceil(progressPercentage)}%</p>
              </div>
            </div>
            <Progress value={progressPercentage} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Coins className="text-yellow-500" size={24} />
              <div>
                <h3 className="text-white font-semibold">G-Chips</h3>
                <p className="text-2xl font-bold text-yellow-500">{profile?.gagsty_chips || 0}</p>
                <p className="text-sm text-gray-400">Earned so far</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="text-blue-500" size={24} />
              <div>
                <h3 className="text-white font-semibold">Referrals</h3>
                <p className="text-2xl font-bold text-blue-500">0</p>
                <p className="text-sm text-gray-400">Friends invited</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Milestone */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-1">Next Milestone</h3>
              <p className="text-gray-300">Invite 3 more friends to unlock Early Access</p>
            </div>
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              🎯 Early Access
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeHeader;
