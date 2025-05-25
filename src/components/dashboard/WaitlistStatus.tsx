
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Share2, Copy, Users, TrendingUp } from 'lucide-react';

interface WaitlistStatusProps {
  profile: any;
}

const WaitlistStatus: React.FC<WaitlistStatusProps> = ({ profile }) => {
  const [referralLink] = useState(`https://gagsty.com/ref/${profile?.username || profile?.id?.substring(0, 8)}`);
  const totalReferrals = 0;
  const pendingInvites = 0;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const shareOnPlatform = (platform: string) => {
    const message = "Join me on GAGSTY - the future of gaming! Get early access with my referral link:";
    const encodedMessage = encodeURIComponent(`${message} ${referralLink}`);
    
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedMessage}`,
      telegram: `https://t.me/share/url?url=${referralLink}&text=${encodeURIComponent(message)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
      email: `mailto:?subject=Join GAGSTY&body=${encodedMessage}`,
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Users className="mr-2" />
          My Waitlist Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-500">#124</div>
            <div className="text-sm text-gray-400">Current Rank</div>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-500">{totalReferrals}</div>
            <div className="text-sm text-gray-400">Total Referrals</div>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-500">{pendingInvites}</div>
            <div className="text-sm text-gray-400">Pending Invites</div>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-500">+10%</div>
            <div className="text-sm text-gray-400">Chips per Referral</div>
          </div>
        </div>

        {/* Referral Link */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Referral Link
          </label>
          <div className="flex space-x-2">
            <Input
              value={referralLink}
              readOnly
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Button onClick={copyReferralLink} className="bg-blue-600 hover:bg-blue-700">
              <Copy size={16} />
            </Button>
          </div>
        </div>

        {/* Share Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Invite Friends via:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button 
              onClick={() => shareOnPlatform('whatsapp')}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              WhatsApp
            </Button>
            <Button 
              onClick={() => shareOnPlatform('telegram')}
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              Telegram
            </Button>
            <Button 
              onClick={() => shareOnPlatform('twitter')}
              className="bg-sky-600 hover:bg-sky-700"
              size="sm"
            >
              Twitter
            </Button>
            <Button 
              onClick={() => shareOnPlatform('email')}
              className="bg-gray-600 hover:bg-gray-700"
              size="sm"
            >
              Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaitlistStatus;
