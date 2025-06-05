
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Share2, Copy, Users, Trophy, Gift, Crown } from 'lucide-react';

const ReferralSystem = () => {
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState('');
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    pendingRewards: 0,
    totalRewards: 250,
    currentTier: 'Bronze'
  });

  useEffect(() => {
    if (user) {
      // Generate referral code based on user ID
      const code = `GAGSTY${user.id.substring(0, 8).toUpperCase()}`;
      setReferralCode(code);
      
      // Simulate some referral activity for demo
      setReferralStats({
        totalReferrals: Math.floor(Math.random() * 15) + 3,
        pendingRewards: Math.floor(Math.random() * 500) + 100,
        totalRewards: Math.floor(Math.random() * 2000) + 500,
        currentTier: 'Silver'
      });
    }
  }, [user]);

  const shareReferral = (platform: string) => {
    const message = "🎮 Join me on GAGSTY - where your game ideas become reality! Get early access to AI game creation:";
    const url = `https://gagsty.com/ref/${referralCode}`;
    const encodedMessage = encodeURIComponent(`${message} ${url}`);
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${url}&summary=${encodedMessage}`,
      whatsapp: `https://wa.me/?text=${encodedMessage}`,
      telegram: `https://t.me/share/url?url=${url}&text=${encodeURIComponent(message)}`,
      email: `mailto:?subject=Join GAGSTY&body=${encodedMessage}`,
      copy: url
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
      return;
    }
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      Bronze: 'text-orange-400',
      Silver: 'text-gray-400',
      Gold: 'text-yellow-400',
      Platinum: 'text-purple-400'
    };
    return colors[tier] || 'text-gray-400';
  };

  const tierBenefits = [
    { tier: 'Bronze', referrals: '1-5', bonus: '100 chips per referral' },
    { tier: 'Silver', referrals: '6-15', bonus: '150 chips + priority support' },
    { tier: 'Gold', referrals: '16-50', bonus: '200 chips + beta features' },
    { tier: 'Platinum', referrals: '51+', bonus: '300 chips + revenue sharing' }
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Referral Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="gagsty-card text-center p-4">
          <CardContent className="p-0">
            <Users className="w-6 h-6 text-[#00C6FB] mx-auto mb-2" />
            <div className="text-lg font-bold text-gagsty-primary">{referralStats.totalReferrals}</div>
            <div className="text-xs text-gagsty-secondary">Total Referrals</div>
          </CardContent>
        </Card>
        
        <Card className="gagsty-card text-center p-4">
          <CardContent className="p-0">
            <Gift className="w-6 h-6 text-[#FFB800] mx-auto mb-2" />
            <div className="text-lg font-bold text-gagsty-primary">{referralStats.pendingRewards}</div>
            <div className="text-xs text-gagsty-secondary">Pending Chips</div>
          </CardContent>
        </Card>
        
        <Card className="gagsty-card text-center p-4">
          <CardContent className="p-0">
            <Trophy className="w-6 h-6 text-[#16FF6F] mx-auto mb-2" />
            <div className="text-lg font-bold text-gagsty-primary">{referralStats.totalRewards}</div>
            <div className="text-xs text-gagsty-secondary">Total Earned</div>
          </CardContent>
        </Card>
        
        <Card className="gagsty-card text-center p-4">
          <CardContent className="p-0">
            <Crown className={`w-6 h-6 mx-auto mb-2 ${getTierColor(referralStats.currentTier)}`} />
            <div className="text-lg font-bold text-gagsty-primary">{referralStats.currentTier}</div>
            <div className="text-xs text-gagsty-secondary">Current Tier</div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link */}
      <Card className="gagsty-card">
        <CardHeader>
          <CardTitle className="flex items-center text-gagsty-primary">
            <Share2 className="mr-2" size={20} />
            Your Referral Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-[#1A1D24] rounded-lg p-4 mb-4">
            <div className="text-sm text-gagsty-secondary mb-2">Share this link to earn rewards:</div>
            <div className="text-[#00C6FB] font-mono text-sm break-all">
              https://gagsty.com/ref/{referralCode}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <Button 
              onClick={() => shareReferral('copy')}
              className="btn-gagsty-primary text-xs"
            >
              <Copy size={14} className="mr-1" />
              Copy
            </Button>
            <Button 
              onClick={() => shareReferral('twitter')}
              className="btn-gagsty-secondary text-xs"
            >
              Twitter
            </Button>
            <Button 
              onClick={() => shareReferral('linkedin')}
              className="btn-gagsty-secondary text-xs"
            >
              LinkedIn
            </Button>
            <Button 
              onClick={() => shareReferral('whatsapp')}
              className="btn-gagsty-secondary text-xs"
            >
              WhatsApp
            </Button>
            <Button 
              onClick={() => shareReferral('telegram')}
              className="btn-gagsty-secondary text-xs"
            >
              Telegram
            </Button>
            <Button 
              onClick={() => shareReferral('email')}
              className="btn-gagsty-secondary text-xs"
            >
              Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tier Benefits */}
      <Card className="gagsty-card">
        <CardHeader>
          <CardTitle className="flex items-center text-gagsty-primary">
            <Trophy className="mr-2" size={20} />
            Referral Tiers & Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tierBenefits.map((benefit, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                benefit.tier === referralStats.currentTier 
                  ? 'border-[#00C6FB]/50 bg-[#00C6FB]/10' 
                  : 'border-[#262A34] bg-[#1A1D24]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getTierColor(benefit.tier)} bg-transparent border-current text-xs`}>
                      {benefit.tier}
                    </Badge>
                    <span className="text-gagsty-secondary text-sm">{benefit.referrals} referrals</span>
                  </div>
                  <span className="text-gagsty-primary text-sm font-medium">{benefit.bonus}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralSystem;
