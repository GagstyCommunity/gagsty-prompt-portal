
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Crown, Star, Users } from 'lucide-react';

const WaitlistSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to join the waitlist.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      toast({
        title: "Welcome to Gagsty! 🎮",
        description: "You're now on our exclusive waitlist. Get ready to build the future!",
      });
    }, 1000);
  };

  if (submitted) {
    return (
      <section className="py-20 px-4 bg-gradient-to-r from-violet-900/20 to-orange-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-orange-500 rounded-full mb-6">
              <Crown className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">Welcome to the Creator Community!</h3>
            <p className="text-xl text-gray-300 mb-6">
              You're creator #{Math.floor(Math.random() * 50) + 2847} in our exclusive waitlist
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center bg-violet-500/20 px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-violet-400 mr-2" />
                <span className="text-violet-300">Early Beta Access</span>
              </div>
              <div className="flex items-center bg-orange-500/20 px-4 py-2 rounded-full">
                <Users className="w-4 h-4 text-orange-400 mr-2" />
                <span className="text-orange-300">Bonus G-Chips</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-violet-900/20 to-orange-900/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">
              Join Gagsty & Get Early Access
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Top 500 waitlisters get early beta access & bonus Chips
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500/20 h-12"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500/20 h-12"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                What's your role?
              </label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white h-12">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="player">Player/Gamer</SelectItem>
                  <SelectItem value="developer">Game Developer</SelectItem>
                  <SelectItem value="designer">Game Designer</SelectItem>
                  <SelectItem value="artist">Artist/Creator</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-500 to-orange-500 hover:from-violet-600 hover:to-orange-600 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              {loading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Joining Waitlist...
                </>
              ) : (
                <>
                  <Crown className="mr-2" size={20} />
                  Join Exclusive Waitlist
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>✨ Free access + Bonus G-Chips + Founding Member Badge</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
