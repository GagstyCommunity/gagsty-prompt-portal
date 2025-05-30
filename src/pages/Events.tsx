
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Trophy, Coins, Gamepad2, Palette, Code, Megaphone } from 'lucide-react';

const Events = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  const eventTypes = [
    {
      icon: Gamepad2,
      title: "Live Game Jams",
      description: "Intensive game creation sessions with community collaboration. Build a themed game in a short time!",
      color: "blue"
    },
    {
      icon: Palette,
      title: "Prompt Marathons",
      description: "Speed challenges to create the most creative game prompts within a time limit.",
      color: "violet"
    },
    {
      icon: Code,
      title: "Developer Workshops",
      description: "Learn from industry experts about game development, AI tools, and Web3 integration.",
      color: "orange"
    },
    {
      icon: Megaphone,
      title: "Referral Challenges",
      description: "Grow the community by bringing friends and earn rewards for successful referrals.",
      color: "green"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Winter Game Jam 2024",
      type: "Game Jam",
      date: "Dec 15-17, 2024",
      duration: "48 hours",
      participants: "500+",
      rewardPool: "25,000 G-Chips",
      description: "Create winter-themed games using AI prompts. Teams of up to 4 creators compete for the grand prize.",
      status: "open",
      deadline: "Dec 10, 2024"
    },
    {
      id: 2,
      title: "AI Prompt Mastery Workshop",
      type: "Workshop",
      date: "Dec 8, 2024",
      duration: "2 hours",
      participants: "100",
      rewardPool: "1,000 G-Chips",
      description: "Learn advanced prompt writing techniques from Gagsty's top creators and AI specialists.",
      status: "open",
      deadline: "Dec 6, 2024"
    },
    {
      id: 3,
      title: "Community Growth Challenge",
      type: "Referral Challenge",
      date: "Dec 1-31, 2024",
      duration: "30 days",
      participants: "Unlimited",
      rewardPool: "50,000 G-Chips",
      description: "Invite friends to join Gagsty. Top referrers earn exclusive badges and bonus G-Chips.",
      status: "active",
      deadline: "Dec 31, 2024"
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Halloween Horror Game Jam",
      type: "Game Jam",
      date: "Oct 25-27, 2024",
      participants: "423",
      winner: "@SpookyCreator",
      description: "48-hour horror game creation competition featuring AI-generated assets and community voting.",
      completed: true
    },
    {
      id: 5,
      title: "Retro Game Prompt Marathon",
      type: "Prompt Marathon",
      date: "Oct 15, 2024",
      participants: "187",
      winner: "@PixelMaster",
      description: "1-hour speed challenge to create the most nostalgic retro game prompts.",
      completed: true
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Game Jam': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Workshop': return 'bg-violet-500/20 text-violet-300 border-violet-500/30';
      case 'Referral Challenge': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Prompt Marathon': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'active': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'full': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'closed': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <EnhancedHeader />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Earn Gagsty Chips via Events
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Participate in exciting community events, challenges, and competitions to earn rewards and build your reputation.
            </p>
          </div>

          {/* Event Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Ways to Participate & Earn</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {eventTypes.map((eventType, index) => {
                const Icon = eventType.icon;
                return (
                  <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${eventType.color}-500/10 border border-${eventType.color}-500/30 mb-4`}>
                        <Icon className={`text-${eventType.color}-400`} size={28} />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3">{eventType.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{eventType.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Event Tabs */}
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="flex bg-gray-900/50 rounded-xl p-1 border border-gray-800">
                <Button
                  variant={activeTab === 'upcoming' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('upcoming')}
                  className={activeTab === 'upcoming' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }
                >
                  <Calendar className="mr-2" size={16} />
                  Upcoming Events
                </Button>
                <Button
                  variant={activeTab === 'past' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('past')}
                  className={activeTab === 'past' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }
                >
                  <Trophy className="mr-2" size={16} />
                  Past Events
                </Button>
              </div>
            </div>
          </div>

          {/* Events Content */}
          {activeTab === 'upcoming' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <Calendar className="mr-3 text-blue-500" />
                Upcoming Events Calendar
              </h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-2">
                          <Badge className={getTypeColor(event.type)}>
                            {event.type.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-500 font-semibold text-sm">
                            {event.rewardPool}
                          </div>
                          <div className="text-gray-400 text-xs">Reward Pool</div>
                        </div>
                      </div>
                      <CardTitle className="text-white text-xl">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4 leading-relaxed">{event.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-400">
                          <Calendar size={16} className="mr-2 text-blue-400" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Clock size={16} className="mr-2 text-violet-400" />
                          <span className="text-sm">{event.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Users size={16} className="mr-2 text-orange-400" />
                          <span className="text-sm">{event.participants} expected</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Coins size={16} className="mr-2 text-yellow-400" />
                          <span className="text-sm">Deadline: {event.deadline}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                        onClick={() => navigate('/auth')}
                      >
                        {event.status === 'active' ? 'Join Now' : 'Register'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'past' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <Trophy className="mr-3 text-yellow-500" />
                Past Event Highlights
              </h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-3">
                        <Badge className={getTypeColor(event.type)}>
                          {event.type.toUpperCase()}
                        </Badge>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          COMPLETED
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-xl">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4 leading-relaxed">{event.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-400">
                          <Calendar size={16} className="mr-2 text-blue-400" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Users size={16} className="mr-2 text-orange-400" />
                          <span className="text-sm">{event.participants} participants</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                        <div className="flex items-center">
                          <Trophy className="text-yellow-500 mr-2" size={16} />
                          <span className="text-yellow-400 font-medium">Winner: {event.winner}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Never Miss an Event</h3>
            <p className="text-gray-300 mb-8">
              Get notified about upcoming events, challenges, and competitions.
            </p>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-3 rounded-xl"
            >
              Join Our Community
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
