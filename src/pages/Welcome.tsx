
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Users, Zap, Share2, Gift, Crown } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    if (user) {
      // Generate referral code based on user ID
      const code = `GAGSTY${user.id.substring(0, 8).toUpperCase()}`;
      setReferralCode(code);
    }
  }, [user]);

  const nextSteps = [
    {
      icon: Trophy,
      title: "Submit Your First Prompt",
      description: "Share your game idea and start earning G-Chips",
      action: "Create Prompt",
      route: "/submit",
      color: "text-[#FFB800]"
    },
    {
      icon: Users,
      title: "Join Our Community",
      description: "Connect with 4,847+ creators building the future",
      action: "Explore Community",
      route: "/community",
      color: "text-[#00C6FB]"
    },
    {
      icon: Zap,
      title: "Learn Viral Techniques",
      description: "Master the art of writing prompts that go viral",
      action: "Read Guides",
      route: "/insights",
      color: "text-[#A084FF]"
    }
  ];

  const shareReferral = (platform: string) => {
    const message = "🎮 Just joined GAGSTY - the future of AI gaming! Join me and let's build amazing games together:";
    const url = `https://gagsty.com/ref/${referralCode}`;
    const encodedMessage = encodeURIComponent(`${message} ${url}`);
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${url}&summary=${encodedMessage}`,
      whatsapp: `https://wa.me/?text=${encodedMessage}`,
      copy: url
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      return;
    }
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gagsty-deep text-gagsty-primary flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-12">
          <div className="inline-block p-6 rounded-full bg-gradient-to-r from-[#16FF6F] via-[#00C6FB] to-[#A084FF] shadow-2xl mb-6 animate-scale-in">
            <Crown className="w-12 h-12 text-[#121212]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            <span className="text-gagsty-gradient">
              Welcome to the Future!
            </span>
          </h1>
          <p className="text-xl text-gagsty-secondary max-w-2xl mx-auto leading-relaxed animate-fade-in">
            🎉 You're now part of an exclusive community of <span className="text-[#16FF6F] font-semibold">4,847 creators</span> building 
            the next generation of AI-powered games. Your journey starts now!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="gagsty-card-featured text-center p-6">
            <CardContent className="p-0">
              <Gift className="w-8 h-8 text-[#FFB800] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#FFB800] mb-1">500</div>
              <div className="text-sm text-gagsty-secondary">Welcome G-Chips</div>
            </CardContent>
          </Card>
          
          <Card className="gagsty-card-featured text-center p-6">
            <CardContent className="p-0">
              <Crown className="w-8 h-8 text-[#A084FF] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#A084FF] mb-1">#4,848</div>
              <div className="text-sm text-gagsty-secondary">Your Position</div>
            </CardContent>
          </Card>
          
          <Card className="gagsty-card-featured text-center p-6">
            <CardContent className="p-0">
              <Users className="w-8 h-8 text-[#00C6FB] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#00C6FB] mb-1">156</div>
              <div className="text-sm text-gagsty-secondary">Beta Spots Left</div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gagsty-primary text-center mb-8">
            Your Next Steps to Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nextSteps.map((step, index) => (
              <Card key={index} className="gagsty-card gagsty-lift-hover group cursor-pointer" onClick={() => navigate(step.route)}>
                <CardContent className="p-6 text-center">
                  <div className={`inline-block p-4 rounded-2xl bg-gradient-to-r from-current to-current/80 mb-4 ${step.color}/20`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gagsty-primary mb-2 group-hover:text-[#00C6FB] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gagsty-secondary mb-4">
                    {step.description}
                  </p>
                  <Button className="btn-gagsty-tertiary w-full">
                    {step.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Referral Section */}
        <Card className="gagsty-card-featured p-8 text-center">
          <Share2 className="w-12 h-12 text-[#16FF6F] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gagsty-primary mb-4">
            Earn Rewards by Sharing
          </h2>
          <p className="text-gagsty-secondary mb-6 max-w-2xl mx-auto">
            Share your unique referral link and earn <span className="text-[#FFB800] font-semibold">100 G-Chips</span> for 
            every friend who joins, plus <span className="text-[#16FF6F] font-semibold">bonus beta access</span> for active referrers!
          </p>
          
          <div className="bg-[#1A1D24] rounded-lg p-4 mb-6 max-w-md mx-auto">
            <div className="text-sm text-gagsty-secondary mb-2">Your Referral Link</div>
            <div className="text-[#00C6FB] font-mono text-sm">
              gagsty.com/ref/{referralCode}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button 
              onClick={() => shareReferral('twitter')}
              className="btn-gagsty-secondary text-sm"
            >
              Share on Twitter
            </Button>
            <Button 
              onClick={() => shareReferral('linkedin')}
              className="btn-gagsty-secondary text-sm"
            >
              Share on LinkedIn
            </Button>
            <Button 
              onClick={() => shareReferral('whatsapp')}
              className="btn-gagsty-secondary text-sm"
            >
              Share on WhatsApp
            </Button>
            <Button 
              onClick={() => shareReferral('copy')}
              className="btn-gagsty-tertiary text-sm"
            >
              Copy Link
            </Button>
          </div>
        </Card>

        {/* Final CTA */}
        <div className="text-center mt-12">
          <Button 
            onClick={() => navigate('/submit')}
            className="btn-gagsty-primary text-lg px-8 py-4"
          >
            <Trophy className="mr-2" size={20} />
            Submit Your First Game Prompt
          </Button>
          <p className="text-sm text-gagsty-muted mt-4">
            Join Discord • Follow on Twitter • Read the Creator Guide
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
