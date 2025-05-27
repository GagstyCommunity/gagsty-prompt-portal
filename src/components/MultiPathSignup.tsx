
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { 
  Gamepad2, 
  DollarSign, 
  Play, 
  Sparkles, 
  Crown, 
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const MultiPathSignup = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState<string[]>([]);

  const signupPaths = [
    {
      id: 'creator',
      title: 'Create Games',
      description: 'Turn your ideas into games with AI',
      icon: Gamepad2,
      benefits: ['AI Game Builder', 'Creator Tools', 'Revenue Share'],
      color: 'from-purple-600 to-blue-600',
      cta: 'Start Creating'
    },
    {
      id: 'investor',
      title: 'Earn from Games',
      description: 'Invest in game concepts and earn',
      icon: DollarSign,
      benefits: ['Early Investment', 'Revenue Tracking', 'Portfolio Dashboard'],
      color: 'from-emerald-600 to-purple-600',
      cta: 'Start Earning'
    },
    {
      id: 'player',
      title: 'Play New Games',
      description: 'First access to community games',
      icon: Play,
      benefits: ['Early Access', 'Beta Testing', 'Community Rewards'],
      color: 'from-blue-600 to-emerald-600',
      cta: 'Start Playing'
    }
  ];

  const gameGenres = [
    'Adventure', 'Puzzle', 'Strategy', 'Action', 'RPG', 'Simulation', 
    'Racing', 'Sports', 'Horror', 'Educational'
  ];

  const handlePathSelect = (pathId: string) => {
    setSelectedPath(pathId);
    setStep(2);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep(3);
      toast({
        title: "Welcome to Gagsty! 🎮",
        description: "Let's personalize your creator journey",
      });
    }
  };

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const completeSignup = () => {
    toast({
      title: "You're all set! 🚀",
      description: "Welcome to the Gagsty creator community!",
    });
    // Navigate to creator workshop or dashboard
  };

  const selectedPathData = signupPaths.find(path => path.id === selectedPath);
  const waitlistPosition = 2847 + Math.floor(Math.random() * 50);

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Step {step} of 3</span>
          <Badge className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white">
            <Users className="mr-1" size={12} />
            {waitlistPosition.toLocaleString()}+ in queue
          </Badge>
        </div>
        <Progress value={step * 33.33} className="h-2" />
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Choose Your Path to Game Creation
            </h2>
            <p className="text-gray-300">Select what interests you most about Gagsty</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {signupPaths.map((path) => {
              const Icon = path.icon;
              return (
                <Card 
                  key={path.id}
                  className="bg-gray-900/50 border-gray-800 hover:border-purple-600 transition-all cursor-pointer transform hover:scale-105"
                  onClick={() => handlePathSelect(path.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${path.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{path.title}</h3>
                    <p className="text-gray-300 mb-4">{path.description}</p>
                    <div className="space-y-2 mb-6">
                      {path.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center justify-center">
                          <CheckCircle className="mr-2 text-emerald-400" size={16} />
                          <span className="text-sm text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button className={`w-full bg-gradient-to-r ${path.color} hover:opacity-90`}>
                      {path.cta}
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {step === 2 && selectedPathData && (
        <Card className="bg-gray-900/50 border-purple-700">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 bg-gradient-to-r ${selectedPathData.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <selectedPathData.icon className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Perfect! You chose: {selectedPathData.title}
              </h2>
              <p className="text-gray-300">Let's get you started with early access</p>
            </div>

            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email for early access + 500 G-Chips bonus"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-purple-600 text-white placeholder-gray-400 py-3"
                  required
                />
                <Button 
                  type="submit"
                  className={`w-full bg-gradient-to-r ${selectedPathData.color} hover:opacity-90 py-3`}
                >
                  <Crown className="mr-2" size={18} />
                  Reserve Creator Spot
                </Button>
              </div>
              <p className="text-sm text-gray-400 text-center mt-3">
                Free access + 500 G-Chips bonus at launch
              </p>
            </form>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="bg-gray-900/50 border-purple-700">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome to the Creator Community!
              </h2>
              <p className="text-gray-300">Customize your experience by selecting your interests</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                What types of games interest you?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {gameGenres.map((genre) => (
                  <Button
                    key={genre}
                    variant={interests.includes(genre) ? "default" : "outline"}
                    className={`${
                      interests.includes(genre)
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'border-gray-600 text-gray-300 hover:bg-purple-600/20'
                    }`}
                    onClick={() => handleInterestToggle(genre)}
                  >
                    {genre}
                  </Button>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 p-6 rounded-lg border border-purple-700/50 mb-6">
                <h4 className="text-white font-semibold mb-2">Your Creator Benefits:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-purple-300">500 G-Chips Bonus</p>
                  </div>
                  <div className="text-center">
                    <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-yellow-300">Founding Creator Badge</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <p className="text-emerald-300">Early Access</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={completeSignup}
                className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 py-3"
                disabled={interests.length === 0}
              >
                <Gamepad2 className="mr-2" size={18} />
                Enter Creator Workshop
              </Button>
              
              <p className="text-sm text-gray-400 text-center mt-3">
                Select at least one interest to continue
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MultiPathSignup;
