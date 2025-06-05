
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReferralSystem from '../ReferralSystem';
import { Users, TrendingUp } from 'lucide-react';

interface WaitlistStatusProps {
  profile: any;
}

const WaitlistStatus: React.FC<WaitlistStatusProps> = ({ profile }) => {
  return (
    <div className="space-y-6">
      {/* Current Position */}
      <Card className="gagsty-card">
        <CardHeader>
          <CardTitle className="text-gagsty-primary flex items-center">
            <Users className="mr-2" />
            Waitlist Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-[#1A1D24] rounded-lg">
              <div className="text-2xl font-bold text-[#00C6FB] mb-1">#124</div>
              <div className="text-sm text-gagsty-secondary">Current Rank</div>
            </div>
            <div className="text-center p-4 bg-[#1A1D24] rounded-lg">
              <div className="text-2xl font-bold text-[#16FF6F] mb-1">156</div>
              <div className="text-sm text-gagsty-secondary">Spots Remaining</div>
            </div>
          </div>
          
          <div className="bg-[#262A34] rounded-full h-2 mb-4">
            <div className="bg-gradient-to-r from-[#00C6FB] to-[#16FF6F] h-full rounded-full w-3/4"></div>
          </div>
          
          <p className="text-gagsty-secondary text-sm text-center">
            🚀 You're in the top 25%! Refer friends to boost your position.
          </p>
        </CardContent>
      </Card>

      {/* Enhanced Referral System */}
      <ReferralSystem />
      
      {/* Quick Actions */}
      <Card className="gagsty-card">
        <CardHeader>
          <CardTitle className="text-gagsty-primary flex items-center">
            <TrendingUp className="mr-2" />
            Boost Your Position
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-2 bg-[#1A1D24] rounded">
              <span className="text-gagsty-secondary">Refer 1 friend</span>
              <span className="text-[#16FF6F] font-medium">+5 positions</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-[#1A1D24] rounded">
              <span className="text-gagsty-secondary">Submit 1 prompt</span>
              <span className="text-[#A084FF] font-medium">+3 positions</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-[#1A1D24] rounded">
              <span className="text-gagsty-secondary">Join Discord</span>
              <span className="text-[#FFB800] font-medium">+2 positions</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistStatus;
