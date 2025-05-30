
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Users, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
        title: "Welcome to the Waitlist!",
        description: "You'll be notified when we launch. Check your email for confirmation.",
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

  const benefits = [
    {
      icon: Sparkles,
      title: "Early Access",
      description: "Be among the first to create and play games"
    },
    {
      icon: Zap,
      title: "Beta Features",
      description: "Test new features before public release"
    },
    {
      icon: Users,
      title: "Founding Member",
      description: "Special status and exclusive rewards"
    }
  ];

  return (
    <section id="waitlist" className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">Join the Revolution</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Be part of the future of game creation. Get early access and exclusive benefits when we launch.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="card-tertiary card-interactive p-6">
              <div className="text-blue-400 mb-4 flex justify-center">
                <benefit.icon size={32} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Waitlist Form */}
        <div className="card-primary max-w-md mx-auto p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input text-center"
                required
              />
            </div>

            <div>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger className="form-select text-center">
                  <SelectValue placeholder="What's your role?" />
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary btn-large"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Joining...
                </div>
              ) : (
                <>
                  <Sparkles className="mr-2" size={20} />
                  Join Waitlist
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            By joining our waitlist, you agree to receive updates about Gagsty. 
            We respect your privacy and won't spam you.
          </p>
        </div>

        {/* Social Proof */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="bg-gray-900/30 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-800">
            <span className="text-blue-400 font-bold text-lg">15,000+</span>
            <span className="text-gray-300 ml-2">On Waitlist</span>
          </div>
          <div className="bg-gray-900/30 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-800">
            <span className="text-violet-400 font-bold text-lg">500+</span>
            <span className="text-gray-300 ml-2">Beta Testers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
