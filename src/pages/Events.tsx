
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicHeader from '../components/navigation/DynamicHeader';
import Footer from '../components/Footer';
import DynamicEventsList from '../components/dynamic/DynamicEventsList';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Gamepad2, Palette, Code, Megaphone } from 'lucide-react';

const Events = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-black text-white">
      <DynamicHeader />
      
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

          {/* Dynamic Events List */}
          <div className="mb-16">
            <DynamicEventsList />
          </div>

          {/* Newsletter Signup */}
          <div className="text-center">
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
