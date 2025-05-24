
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Gift, Users, Zap, Target } from 'lucide-react';

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Winter Game Jam 2024',
      type: 'Game Jam',
      date: '2024-02-15',
      time: '48 hours',
      reward: '10,000 G-Chips',
      participants: '500+',
      description: 'Create a winter-themed game in 48 hours with our AI tools.',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Prompt Marathon',
      type: 'Marathon',
      date: '2024-02-20',
      time: '24 hours',
      reward: '5,000 G-Chips',
      participants: '200+',
      description: 'Submit as many creative prompts as possible in 24 hours.',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Referral Challenge',
      type: 'Challenge',
      date: '2024-02-25',
      time: '1 week',
      reward: '1,000 G-Chips per referral',
      participants: 'Unlimited',
      description: 'Invite friends and earn chips for each successful referral.',
      status: 'live'
    }
  ];

  const eventTypes = [
    {
      icon: Zap,
      title: 'Live Game Jams',
      description: 'Intensive game creation sessions with community collaboration',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Target,
      title: 'Prompt Marathons',
      description: 'Speed challenges to create the most creative game prompts',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Gift,
      title: 'Referral Challenges',
      description: 'Grow the community and earn rewards for bringing friends',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Game Jam': return 'bg-yellow-600';
      case 'Marathon': return 'bg-blue-600';
      case 'Challenge': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Earn Gagsty Chips via Events
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Participate in exciting community events, challenges, and competitions to earn rewards and build your reputation.
            </p>
          </div>

          {/* Event Types */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {eventTypes.map((eventType, index) => {
              const Icon = eventType.icon;
              return (
                <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-gradient-to-r ${eventType.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-white">{eventType.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{eventType.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Upcoming Events */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-bold text-white">{event.title}</h3>
                          <Badge className={`${getEventTypeColor(event.type)} text-white`}>
                            {event.type}
                          </Badge>
                          {event.status === 'live' && (
                            <Badge className="bg-red-600 text-white animate-pulse">
                              LIVE
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-300 mb-4">{event.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center text-gray-400">
                            <Calendar className="mr-2" size={16} />
                            {event.date}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Clock className="mr-2" size={16} />
                            {event.time}
                          </div>
                          <div className="flex items-center text-green-400">
                            <Gift className="mr-2" size={16} />
                            {event.reward}
                          </div>
                          <div className="flex items-center text-blue-400">
                            <Users className="mr-2" size={16} />
                            {event.participants}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <Button 
                          className={`${
                            event.status === 'live' 
                              ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700' 
                              : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                          }`}
                        >
                          {event.status === 'live' ? 'Join Now' : 'Register'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Links */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-800/20">
              <CardContent className="text-center py-12">
                <h3 className="text-2xl font-bold text-white mb-4">Join Our Discord</h3>
                <p className="text-gray-300 mb-6">
                  Connect with other creators, get real-time event updates, and participate in exclusive Discord-only challenges.
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Join Discord
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-800/20">
              <CardContent className="text-center py-12">
                <h3 className="text-2xl font-bold text-white mb-4">Follow on Telegram</h3>
                <p className="text-gray-300 mb-6">
                  Get instant notifications about new events, rewards, and important announcements from the Gagsty team.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  Join Telegram
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Claim Rewards CTA */}
          <Card className="bg-gradient-to-r from-emerald-900/20 to-green-900/20 border-emerald-800/20">
            <CardContent className="text-center py-12">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Earning?</h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Join your first event today and start building your Gagsty Chips balance. No upfront costs required!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                  View My Rewards
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  Event Calendar
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

export default Events;
