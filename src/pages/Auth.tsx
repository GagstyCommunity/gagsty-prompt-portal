
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import DynamicHeader from '@/components/navigation/DynamicHeader';
import { GamepadIcon, Gift, Users, Coins, Share2, Trophy } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWaitlistSuccess, setShowWaitlistSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const generateReferralCode = () => {
    // Generate a mock referral code based on email
    const baseCode = email.split('@')[0].toUpperCase().slice(0, 4);
    const randomNum = Math.floor(Math.random() * 1000);
    return `${baseCode}${randomNum}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back! 🎮",
            description: "Successfully signed in.",
          });
          navigate('/welcome');
        }
      } else {
        // For waitlist signup (pre-launch), just show success without actual account creation
        if (!password) {
          // Waitlist mode - just email required
          setReferralCode(generateReferralCode());
          setShowWaitlistSuccess(true);
          toast({
            title: "You earned 500 Chips! 🚀",
            description: "Welcome to Gagsty! Complete your profile to earn 100 more chips.",
          });
        } else {
          // Full signup mode (post-launch)
          const { error } = await signUp(email, password, fullName);
          if (error) {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "You earned 500 Chips! 🚀",
              description: "Welcome to Gagsty! Complete your profile to earn 100 more chips.",
            });
            navigate('/welcome');
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    const referralLink = `https://gagsty.com/join?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard.",
    });
  };

  if (showWaitlistSuccess) {
    return (
      <div className="min-h-screen bg-gagsty-deep text-gagsty-primary">
        <DynamicHeader />
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-lg mx-auto">
            <Card className="gagsty-card-featured">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-r from-[#16FF6F] to-[#FFB800] w-fit">
                  <Trophy className="w-8 h-8 text-[#121212]" />
                </div>
                <CardTitle className="text-gagsty-primary text-2xl">You Earned 500 Chips!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-4 bg-gradient-to-r from-[#FFB800]/20 to-[#16FF6F]/20 rounded-lg border border-[#FFB800]/30">
                  <div className="text-3xl font-bold text-[#FFB800] mb-2">🪙 500 Chips</div>
                  <div className="text-gagsty-secondary">Welcome bonus added to your account!</div>
                  <div className="text-sm text-[#16FF6F] mt-2">+ Complete your profile for 100 more chips</div>
                </div>

                <p className="text-gagsty-secondary text-center">
                  Thanks for joining Gagsty! You're now part of an exclusive community building the future of AI gaming.
                </p>

                {/* Referral Section */}
                <div className="p-4 bg-[#00C6FB]/10 rounded-xl border border-[#00C6FB]/30">
                  <h3 className="text-gagsty-primary font-semibold mb-2 flex items-center">
                    <Share2 className="mr-2 text-[#00C6FB]" size={16} />
                    Earn More Chips by Sharing!
                  </h3>
                  <p className="text-gagsty-secondary text-sm mb-3">
                    Share your unique referral link and earn 100 chips for every friend who joins:
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={`gagsty.com/join?ref=${referralCode}`}
                      readOnly
                      className="bg-[#1A1D24] border-[#262A34] text-gagsty-primary text-sm"
                    />
                    <Button
                      onClick={copyReferralLink}
                      className="btn-gagsty-secondary"
                    >
                      Copy
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      className="btn-gagsty-primary flex-1"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=Just joined @Gagsty and earned 500 chips! Join me in building the future of AI gaming: gagsty.com/join?ref=${referralCode}`, '_blank')}
                    >
                      Share on Twitter
                    </Button>
                    <Button
                      size="sm"
                      className="btn-gagsty-secondary flex-1"
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=https://gagsty.com/join?ref=${referralCode}`, '_blank')}
                    >
                      Share on Facebook
                    </Button>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <h4 className="text-gagsty-primary font-semibold">Your Creator Benefits:</h4>
                  <div className="space-y-2">
                    {[
                      { icon: "🪙", text: "500 Chips in your account", color: "text-[#FFB800]" },
                      { icon: "🎮", text: "Early access to AI game creation", color: "text-[#00C6FB]" },
                      { icon: "🏆", text: "Exclusive 'Early Adopter' badge", color: "text-[#A084FF]" },
                      { icon: "💰", text: "Revenue sharing when we launch", color: "text-[#16FF6F]" }
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center text-gagsty-secondary">
                        <span className="mr-3 text-lg">{benefit.icon}</span>
                        <span className={benefit.color}>{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/dashboard')}
                  className="btn-gagsty-primary w-full"
                >
                  <Trophy className="mr-2" size={16} />
                  Complete Profile & Earn 100 More Chips
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gagsty-deep text-gagsty-primary">
      <DynamicHeader />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-[#A084FF] via-[#00C6FB] to-[#16FF6F] shadow-2xl mb-4">
              <GamepadIcon className="w-8 h-8 text-[#121212]" />
            </div>
            <h1 className="text-3xl font-bold text-gagsty-primary mb-2">
              {isLogin ? 'Welcome Back!' : 'Earn 500 Chips!'}
            </h1>
            <p className="text-gagsty-secondary">
              {isLogin 
                ? 'Sign in to continue building games' 
                : 'Join Gagsty and get 500 chips instantly + 100 more for completing your profile'
              }
            </p>
          </div>

          <Card className="gagsty-card-featured">
            <CardHeader>
              <CardTitle className="text-center text-gagsty-primary">
                {isLogin ? 'Sign In' : 'Join & Earn 500 Chips'}
              </CardTitle>
              {!isLogin && (
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Badge className="gagsty-badge-warning">
                      🪙 500 Chips
                    </Badge>
                    <span className="text-gagsty-secondary">+</span>
                    <Badge className="gagsty-badge-success">
                      + 100 Bonus
                    </Badge>
                  </div>
                  <p className="text-gagsty-secondary text-sm">
                    Instant rewards for new creators joining the future of gaming
                  </p>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gagsty-secondary mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-[#1A1D24] border-[#262A34] text-gagsty-primary"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gagsty-secondary mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#1A1D24] border-[#262A34] text-gagsty-primary"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gagsty-secondary mb-2">
                      Password
                    </label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[#1A1D24] border-[#262A34] text-gagsty-primary"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="btn-gagsty-primary w-full"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Join & Earn 500 Chips'}
                </Button>
              </form>

              {!isLogin && (
                <div className="mt-6 p-4 bg-[#1A1D24] rounded-lg">
                  <h4 className="text-gagsty-primary font-medium mb-3 flex items-center">
                    <Coins className="mr-2 text-[#FFB800]" size={16} />
                    What You'll Get
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gagsty-secondary">
                      <Gift className="mr-2 text-[#FFB800]" size={14} />
                      <span>500 Chips welcome bonus (instantly)</span>
                    </div>
                    <div className="flex items-center text-gagsty-secondary">
                      <Trophy className="mr-2 text-[#16FF6F]" size={14} />
                      <span>100 more chips for completing profile</span>
                    </div>
                    <div className="flex items-center text-gagsty-secondary">
                      <Users className="mr-2 text-[#00C6FB]" size={14} />
                      <span>Early access to AI game creation platform</span>
                    </div>
                    <div className="flex items-center text-gagsty-secondary">
                      <Share2 className="mr-2 text-[#A084FF]" size={14} />
                      <span>Earn 100 chips per friend you refer</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#00C6FB] hover:text-[#16FF6F] text-sm transition-colors"
                >
                  {isLogin ? "New to Gagsty? Join & earn 500 chips" : "Already have an account? Sign in"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
