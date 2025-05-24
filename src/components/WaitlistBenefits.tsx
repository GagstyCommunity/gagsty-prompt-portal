
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const WaitlistBenefits = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const benefits = [
    {
      title: 'Early Access',
      description: 'Be first to try Prompt Battle & Game Creator tools',
      icon: '🚀',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Bonus Gagsty Chips',
      description: 'Start with extra currency to boost your gaming journey',
      icon: '💎',
      gradient: 'from-emerald-500 to-cyan-500'
    },
    {
      title: 'Founding Creator Badge',
      description: 'Get featured as an original member of the Gagsty community',
      icon: '🏆',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Exclusive Events',
      description: 'Access to VIP creator workshops and community meetups',
      icon: '🎉',
      gradient: 'from-purple-500 to-pink-500'
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
          title: "Join now! 🏆",
          description: "Sign up to claim your founding creator badge!",
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
              Waitlist Benefits
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join early and unlock exclusive perks that regular users won't get
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto`}>
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 rounded-2xl border border-gray-700 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Claim Your Early Creator Badge
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Limited spots available. Join now and be part of gaming history.
          </p>
          
          <form onSubmit={handleSignup} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              required
            />
            <Button 
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105"
            >
              {user ? 'Go to Dashboard' : 'Claim Badge'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WaitlistBenefits;
