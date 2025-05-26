
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Crown, Star, Gift, Zap, Trophy, Users, Calendar } from 'lucide-react';

const WaitlistBenefits = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const tierBenefits = [
    {
      tier: 'Bronze',
      title: 'Early Waitlist',
      description: 'Join after Week 1',
      icon: '🥉',
      gradient: 'from-orange-700 to-red-700',
      rewards: ['500 G-Chips', 'Early Access', 'Creator Badge'],
      progress: 85
    },
    {
      tier: 'Silver',
      title: 'Priority Waitlist',
      description: 'First 1,000 members',
      icon: '🥈',
      gradient: 'from-gray-400 to-gray-600',
      rewards: ['750 G-Chips', 'Priority Support', 'Silver Badge', 'Beta Features'],
      progress: 60
    },
    {
      tier: 'Gold',
      title: 'Founding Members',
      description: 'First 100 members',
      icon: '🥇',
      gradient: 'from-yellow-600 to-orange-600',
      rewards: ['1,000 G-Chips', 'VIP Support', 'Gold Badge', 'Exclusive Events', 'Direct Feedback'],
      progress: 95
    }
  ];

  const rewardVisuals = [
    {
      title: 'Founding Creator Badge',
      description: 'Exclusive digital badge showing you were here from the beginning',
      icon: '🏆',
      gradient: 'from-purple-500 to-pink-500',
      customizable: true,
      socialShare: true
    },
    {
      title: 'G-Chips Bonus',
      description: 'Up to 1,000 bonus chips based on your waitlist tier',
      icon: '💎',
      gradient: 'from-emerald-500 to-cyan-500',
      customizable: false,
      socialShare: false
    },
    {
      title: 'Early Access Pass',
      description: '48-hour early access before public launch',
      icon: '🚀',
      gradient: 'from-blue-500 to-purple-500',
      customizable: false,
      socialShare: true
    },
    {
      title: 'VIP Community Access',
      description: 'Exclusive Discord channels and creator meetups',
      icon: '👑',
      gradient: 'from-amber-500 to-orange-500',
      customizable: false,
      socialShare: false
    }
  ];

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      if (user) {
        toast({
          title: "Already a founding member! 🏆",
          description: "Welcome to the exclusive Gagsty founders circle!",
        });
        navigate('/dashboard');
      } else {
        localStorage.setItem('waitlist_email', email);
        toast({
          title: "Welcome to the founding circle! 🏆",
          description: "Complete your profile to unlock all benefits!",
        });
        navigate('/auth');
      }
      setEmail('');
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Exclusive Waitlist Tiers
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            Join early and unlock exclusive perks based on when you sign up
          </p>
          <Badge className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-4 py-2">
            <Calendar className="mr-2" size={16} />
            Tier benefits locked in at signup
          </Badge>
        </div>

        {/* Tier System */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {tierBenefits.map((tier, index) => (
            <div 
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-purple-600 transition-all duration-300 transform hover:scale-105 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 opacity-50" />
              <div className="relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-r ${tier.gradient} rounded-2xl flex items-center justify-center text-4xl mb-4 mx-auto shadow-lg`}>
                  {tier.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{tier.tier} Tier</h3>
                <h4 className="text-lg font-semibold text-purple-300 mb-2">{tier.title}</h4>
                <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                
                <div className="space-y-2 mb-4">
                  {tier.rewards.map((reward, rewardIndex) => (
                    <div key={rewardIndex} className="flex items-center justify-center">
                      <Badge variant="outline" className="border-purple-600 text-purple-300 text-xs">
                        {reward}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Spots filled</span>
                    <span>{tier.progress}%</span>
                  </div>
                  <Progress value={tier.progress} className="h-2" />
                </div>

                {tier.progress >= 90 && (
                  <Badge className="bg-red-600 text-white">
                    Almost Full!
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Rewards Visualization */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Your Exclusive Rewards</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardVisuals.map((reward, index) => (
              <div key={index} className="bg-gray-900/50 p-6 rounded-2xl border border-purple-700/50 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${reward.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto`}>
                  {reward.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{reward.title}</h4>
                <p className="text-gray-300 text-sm mb-4">{reward.description}</p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {reward.customizable && (
                    <Badge className="bg-blue-600 text-white text-xs">
                      <Star className="mr-1" size={12} />
                      Customizable
                    </Badge>
                  )}
                  {reward.socialShare && (
                    <Badge className="bg-emerald-600 text-white text-xs">
                      <Users className="mr-1" size={12} />
                      Shareable
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 p-8 rounded-2xl border border-purple-700/50 mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Your Waitlist Progress</h3>
            <p className="text-gray-300">Track which benefits are unlocked vs. pending</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="text-white" size={24} />
              </div>
              <h4 className="text-white font-semibold">Unlocked</h4>
              <p className="text-green-300 text-sm">Waitlist position secured</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="text-white" size={24} />
              </div>
              <h4 className="text-white font-semibold">Pending</h4>
              <p className="text-yellow-300 text-sm">G-Chips & early access</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Gift className="text-white" size={24} />
              </div>
              <h4 className="text-white font-semibold">At Launch</h4>
              <p className="text-purple-300 text-sm">Full platform access</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 rounded-2xl border border-purple-700/50 text-center">
          <div className="flex items-center justify-center mb-4">
            <Crown className="text-yellow-500 mr-2" size={32} />
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Claim Your Founding Creator Status
            </h3>
          </div>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Limited spots available in each tier. Join now and secure your place in gaming history.
          </p>
          
          <form onSubmit={handleSignup} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-900/50 border-purple-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              required
            />
            <Button 
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105"
            >
              {user ? 'Go to Dashboard' : 'Claim Status'}
            </Button>
          </form>
          
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-400">
            <span>🏆 Founding badge</span>
            <span>💎 Bonus chips</span>
            <span>🚀 Early access</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistBenefits;
