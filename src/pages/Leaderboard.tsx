
import React from 'react';
import DynamicHeader from '../components/navigation/DynamicHeader';
import Footer from '../components/Footer';
import DynamicLeaderboard from '../components/dynamic/DynamicLeaderboard';
import { Trophy, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Leaderboard = () => {
  const stats = [
    {
      icon: Users,
      title: "Active Creators",
      value: "1,247",
      description: "Members earning chips this month"
    },
    {
      icon: Trophy,
      title: "Total Rewards",
      value: "125,000",
      description: "Chips distributed this month"
    },
    {
      icon: Zap,
      title: "Active Challenges",
      value: "23",
      description: "Events happening right now"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <DynamicHeader />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Creator Leaderboard
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the top creators in our community and see how you rank among fellow game prompt innovators.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <Icon className="text-yellow-500 mr-2" size={24} />
                    <CardTitle className="text-sm font-medium text-gray-300">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Dynamic Leaderboard */}
          <div className="max-w-4xl mx-auto">
            <DynamicLeaderboard />
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-white mb-4">Want to climb the ranks?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Start creating amazing game prompts, participate in events, and engage with the community to earn more chips and boost your ranking!
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
