
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import DynamicHeader from '@/components/navigation/DynamicHeader';
import { GamepadIcon, Gift, Users, Coins, Share2 } from 'lucide-react';

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
          navigate('/dashboard');
        }
      } else {
        // For waitlist signup (pre-launch), just show success without actual account creation
        if (!password) {
          // Waitlist mode - just email required
          setReferralCode(generateReferralCode());
          setShowWaitlistSuccess(true);
          toast({
            title: "You're on the List! 🚀",
            description: "Thanks for joining the Gagsty waitlist! Check your email for next steps.",
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
              title: "Welcome to Gagsty! 🚀",
              description: "Account created successfully. You've earned 500 Chips!",
            });
            navigate('/dashboard');
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
      <div className="min-h-screen bg-black text-white">
        <DynamicHeader />
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-lg mx-auto">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 w-fit">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-2xl">You're on the List!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 text-center">
                  Thanks for joining the Gagsty waitlist! We'll notify you as soon as early access opens.
                </p>

                {/* Referral Section */}
                <div className="p-4 bg-blue-900/20 rounded-xl border border-blue-500/30">
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <Share2 className="mr-2 text-blue-400" size={16} />
                    Move up the list and earn extra Chips!
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Share your unique referral link:
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={`gagsty.com/join?ref=${referralCode}`}
                      readOnly
                      className="bg-gray-800 border-gray-700 text-white text-sm"
                    />
                    <Button
                      onClick={copyReferralLink}
                      variant="outline"
                      className="border-blue-500 text-blue-300 hover:bg-blue-500/20"
                    >
                      Copy
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 flex-1"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=Just joined the @Gagsty waitlist for AI-powered game creation! Join me: gagsty.com/join?ref=${referralCode}`, '_blank')}
                    >
                      Share on Twitter
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1"
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=https://gagsty.com/join?ref=${referralCode}`, '_blank')}
                    >
                      Share on Facebook
                    </Button>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Your Early Access Benefits:</h4>
                  <div className="space-y-2">
                    {[
                      { icon: "🎮", text: "First access to the platform" },
                      { icon: "🪙", text: "500 bonus Chips on launch" },
                      { icon: "🏆", text: "Exclusive 'Early Adopter' badge" },
                      { icon: "📧", text: "Platform updates and insider news" }
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <span className="mr-3 text-lg">{benefit.icon}</span>
                        <span>{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DynamicHeader />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-blue-500 via-violet-500 to-orange-500 shadow-2xl mb-4">
              <GamepadIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Gagsty'}
            </h1>
            <p className="text-gray-400">
              {isLogin 
                ? 'Sign in to continue building games' 
                : 'Be first to access AI-powered game creation'
              }
            </p>
          </div>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-center text-white">
                {isLogin ? 'Sign In' : 'Join the Waitlist'}
              </CardTitle>
              {!isLogin && (
                <div className="text-center space-y-2">
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                    🚀 Early Access
                  </Badge>
                  <p className="text-gray-400 text-sm">
                    Get exclusive early access + 500 bonus Chips
                  </p>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Join Waitlist'}
                </Button>
              </form>

              {!isLogin && (
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Coins className="mr-2 text-yellow-500" size={16} />
                    Waitlist Benefits
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Users className="mr-2 text-blue-400" size={14} />
                      <span>Priority access when we launch</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Gift className="mr-2 text-green-400" size={14} />
                      <span>500 Chips bonus for early supporters</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Share2 className="mr-2 text-violet-400" size={14} />
                      <span>Referral rewards to move up the queue</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  {isLogin ? "Don't have an account? Join waitlist" : "Already have an account? Sign in"}
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
