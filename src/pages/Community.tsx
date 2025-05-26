
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Trophy, Share2, Calendar, Star, TrendingUp } from 'lucide-react';

const Community = () => {
  const [liveActivity, setLiveActivity] = useState([
    { user: 'GameMaster23', action: 'joined the waitlist', time: '2 minutes ago', badge: 'Gold' },
    { user: 'PixelCreator', action: 'shared a game concept', time: '5 minutes ago', badge: 'Silver' },
    { user: 'AIGameDev', action: 'earned 500 G-Chips', time: '8 minutes ago', badge: 'Bronze' },
    { user: 'RetroBuilder', action: 'joined the waitlist', time: '12 minutes ago', badge: 'Bronze' },
    { user: 'FutureGamer', action: 'reached Gold tier', time: '15 minutes ago', badge: 'Gold' }
  ]);

  const topMembers = [
    { rank: 1, user: 'CreativeGenius', points: 2450, badge: 'Gold', games: 12 },
    { rank: 2, user: 'PromptMaster', points: 2180, badge: 'Gold', games: 8 },
    { rank: 3, user: 'GameVisionary', points: 1920, badge: 'Silver', games: 6 },
    { rank: 4, user: 'DigitalArtist', points: 1750, badge: 'Silver', games: 5 },
    { rank: 5, user: 'InnovativePlay', points: 1580, badge: 'Silver', games: 4 }
  ];

  const communityStats = [
    { label: 'Total Creators', value: '2,847', icon: <Users className="w-6 h-6 text-blue-400" /> },
    { label: 'Game Concepts Created', value: '8,432', icon: <Star className="w-6 h-6 text-yellow-400" /> },
    { label: 'Active This Week', value: '1,234', icon: <TrendingUp className="w-6 h-6 text-emerald-400" /> },
    { label: 'G-Chips Earned', value: '45.2K', icon: <Trophy className="w-6 h-6 text-purple-400" /> }
  ];

  const shareTemplates = [
    {
      platform: 'Twitter',
      template: "Just joined the @Gagsty waitlist! 🎮 Turn text into playable games with AI. Who else is building the future of gaming? #Gagsty #AIGames",
      color: 'bg-blue-600'
    },
    {
      platform: 'LinkedIn',
      template: "Excited to be part of the Gagsty community! The future of game development is here - no coding required, just creativity. Join me on the waitlist!",
      color: 'bg-blue-700'
    },
    {
      platform: 'Discord',
      template: "Found this amazing platform called Gagsty where you can create games just by describing them! Anyone else on the waitlist? 🚀",
      color: 'bg-indigo-600'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live activity updates
      const activities = [
        { user: 'NewCreator' + Math.floor(Math.random() * 100), action: 'joined the waitlist', time: 'just now', badge: 'Bronze' },
        { user: 'GameBuilder' + Math.floor(Math.random() * 100), action: 'shared a concept', time: 'just now', badge: 'Silver' }
      ];
      
      setLiveActivity(prev => [activities[Math.floor(Math.random() * activities.length)], ...prev.slice(0, 4)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Join the Community
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Connect with fellow creators, share your game concepts, and build the future of gaming together.
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {communityStats.map((stat, index) => (
              <Card key={index} className="bg-gray-900/50 border-purple-700/50 text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Live Activity Feed */}
            <Card className="bg-gray-900/50 border-purple-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="mr-2 text-emerald-400" size={24} />
                  Live Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {liveActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {activity.user[0]}
                        </div>
                        <div>
                          <p className="text-white font-medium">{activity.user}</p>
                          <p className="text-gray-400 text-sm">{activity.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${activity.badge === 'Gold' ? 'bg-yellow-600' : activity.badge === 'Silver' ? 'bg-gray-600' : 'bg-orange-600'} text-white text-xs`}>
                          {activity.badge}
                        </Badge>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Members Leaderboard */}
            <Card className="bg-gray-900/50 border-purple-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="mr-2 text-yellow-400" size={24} />
                  Top Waitlist Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          member.rank === 1 ? 'bg-yellow-600' : member.rank === 2 ? 'bg-gray-600' : member.rank === 3 ? 'bg-orange-600' : 'bg-purple-600'
                        }`}>
                          #{member.rank}
                        </div>
                        <div>
                          <p className="text-white font-medium">{member.user}</p>
                          <p className="text-gray-400 text-sm">{member.games} concepts created</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-bold">{member.points} pts</p>
                        <Badge className={`${member.badge === 'Gold' ? 'bg-yellow-600' : 'bg-gray-600'} text-white text-xs`}>
                          {member.badge}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Sharing Section */}
          <Card className="bg-gray-900/50 border-purple-700/50 mb-16">
            <CardHeader>
              <CardTitle className="text-white text-center flex items-center justify-center">
                <Share2 className="mr-2 text-blue-400" size={24} />
                Share with Your Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center mb-6">
                Spread the word about Gagsty and earn bonus G-Chips for each friend who joins!
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {shareTemplates.map((template, index) => (
                  <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 ${template.color} rounded-lg flex items-center justify-center mr-3`}>
                        <Share2 className="text-white" size={20} />
                      </div>
                      <h3 className="text-white font-semibold">{template.platform}</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{template.template}</p>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Share on {template.platform}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Referral Program */}
          <Card className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 border-purple-700/50">
            <CardContent className="text-center py-12">
              <h3 className="text-2xl font-bold text-white mb-4">Referral Program</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Invite friends to join the Gagsty waitlist and earn 100 G-Chips for each successful referral. 
                Plus, your friends get an extra 200 G-Chips bonus!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700">
                  Get Referral Link
                </Button>
                <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-600 hover:text-white">
                  View My Referrals
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Community;
