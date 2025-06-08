
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Users, Zap, Crown, Gift, Star, TrendingUp, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { PremiumCard } from '@/components/ui/premium-card';
import { PremiumButton } from '@/components/ui/premium-button';

const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleOptions = [
    { value: 'creator', label: 'Game Creator', description: 'I want to submit game ideas' },
    { value: 'developer', label: 'Developer', description: 'I want to build games' },
    { value: 'designer', label: 'Designer', description: 'I create game assets and UI' },
    { value: 'player', label: 'Player', description: 'I want to play and vote on games' },
    { value: 'investor', label: 'Investor', description: 'I\'m interested in investing' },
    { value: 'other', label: 'Other', description: 'I\'m interested in the platform' },
  ];

  const waitlistTiers = [
    {
      name: 'VIP Early Access',
      spots: 100,
      remaining: 23,
      benefits: ['First 48h access', '1000 bonus chips', 'VIP Discord', 'Direct feedback line'],
      icon: Crown,
      gradient: 'from-yellow-600 to-orange-600'
    },
    {
      name: 'Beta Creator',
      spots: 500,
      remaining: 187,
      benefits: ['Beta access', '500 bonus chips', 'Creator Discord', 'Early features'],
      icon: Star,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      name: 'Launch Member',
      spots: 10000,
      remaining: 7234,
      benefits: ['Day 1 access', '100 bonus chips', 'Community Discord'],
      icon: Sparkles,
      gradient: 'from-blue-600 to-teal-600'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !role) {
      toast({
        title: "Missing Information",
        description: "Please fill in both email and role fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "🎉 Welcome to the Waitlist!",
        description: "You're in! Check your email for exclusive updates and early access details.",
      });
      
      setEmail('');
      setRole('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 mb-6">
            <TrendingUp className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Limited Early Access Available
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Secure Your Spot in Gaming History
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators, developers, and gamers preparing for the future of AI-powered game creation.
          </p>
        </div>

        {/* Waitlist Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {waitlistTiers.map((tier, index) => (
            <PremiumCard key={index} variant="glass" className="p-8 text-center relative overflow-hidden">
              <div className={`w-20 h-20 bg-gradient-to-r ${tier.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                <tier.icon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{tier.name}</h3>
              
              <div className="mb-6">
                <div className="text-sm text-white/60 mb-2">
                  {tier.remaining} of {tier.spots} spots remaining
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${tier.gradient} h-2 rounded-full`}
                    style={{ width: `${((tier.spots - tier.remaining) / tier.spots) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                {tier.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center text-white/80 text-sm">
                    <Sparkles className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
              
              {tier.remaining < 50 && (
                <div className="absolute top-4 right-4">
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    Almost Full!
                  </div>
                </div>
              )}
            </PremiumCard>
          ))}
        </div>

        {/* Main Signup Form */}
        <PremiumCard variant="luxury" className="max-w-2xl mx-auto p-12 text-center">
          <div className="mb-8">
            <Gift className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-3">Join the Revolution</h3>
            <p className="text-white/80 text-lg">
              Get early access, exclusive benefits, and shape the future of game creation
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 text-lg text-center bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger className="h-14 text-lg text-center bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="What's your role in gaming?" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {roleOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="text-white hover:bg-gray-800 focus:bg-gray-800"
                    >
                      <div className="text-left">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-400">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <PremiumButton
              type="submit"
              disabled={isSubmitting}
              variant="luxury"
              size="xl"
              className="w-full"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Securing Your Spot...
                </div>
              ) : (
                <>
                  <Crown className="mr-2" size={20} />
                  Secure My Early Access
                </>
              )}
            </PremiumButton>
          </form>

          <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-white/60">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Free to join
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              50,000+ members
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              Instant confirmation
            </div>
          </div>
        </PremiumCard>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8">
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm px-8 py-4 rounded-2xl border border-purple-500/30">
              <span className="text-purple-400 font-bold text-2xl">50,000+</span>
              <span className="text-white/80 ml-2">Creators Waiting</span>
            </div>
            <div className="bg-gradient-to-r from-blue-900/30 to-teal-900/30 backdrop-blur-sm px-8 py-4 rounded-2xl border border-blue-500/30">
              <span className="text-blue-400 font-bold text-2xl">1,200+</span>
              <span className="text-white/80 ml-2">Joined This Week</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
