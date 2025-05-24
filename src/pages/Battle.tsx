
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Users, ThumbsUp } from 'lucide-react';

const Battle = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 30,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentPrompts = [
    {
      id: 1,
      title: 'Cyberpunk Cat Racing',
      author: 'CyberGamer23',
      votes: 156,
      description: 'High-speed racing with cybernetic cats through neon-lit streets'
    },
    {
      id: 2,
      title: 'Magical Forest Defense',
      author: 'WizardBuilder',
      votes: 143,
      description: 'Defend the enchanted forest from dark creatures using nature magic'
    },
    {
      id: 3,
      title: 'Space Station Tycoon',
      author: 'CosmicCreator',
      votes: 128,
      description: 'Build and manage your own space station in a distant galaxy'
    },
    {
      id: 4,
      title: 'Pixel Art Adventure',
      author: 'RetroDev',
      votes: 95,
      description: 'Classic 8-bit style platformer with modern gameplay mechanics'
    }
  ];

  const previousWinners = [
    {
      battle: 'Battle #12',
      winner: 'Dragon Quest Remake',
      author: 'FantasyMaster',
      prize: '5000 G-Chips',
      status: 'In Development'
    },
    {
      battle: 'Battle #11',
      winner: 'Ninja Puzzle Quest',
      author: 'ShadowCoder',
      prize: '5000 G-Chips',
      status: 'Released'
    },
    {
      battle: 'Battle #10',
      winner: 'Ocean Explorer',
      author: 'DeepSeaDev',
      prize: '5000 G-Chips',
      status: 'Released'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Prompt Battle is ON!
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Weekly competitions where the community votes for the best game prompts. Winners get their games built and earn 60% of the revenue!
            </p>

            {/* Countdown Timer */}
            <Card className="bg-gradient-to-r from-red-900/20 to-pink-900/20 border-red-800/20 max-w-md mx-auto">
              <CardContent className="py-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Clock className="text-red-400" size={24} />
                  <h3 className="text-lg font-semibold text-white">Battle Ends In</h3>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-400">{timeLeft.days}</div>
                    <div className="text-xs text-gray-400">DAYS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-400">{timeLeft.hours}</div>
                    <div className="text-xs text-gray-400">HOURS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-400">{timeLeft.minutes}</div>
                    <div className="text-xs text-gray-400">MINS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-400">{timeLeft.seconds}</div>
                    <div className="text-xs text-gray-400">SECS</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rules & Rewards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="mr-2 text-yellow-400" size={24} />
                  Rules & Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/20">
                  <h4 className="font-semibold text-yellow-400 mb-2">🥇 1st Place</h4>
                  <p className="text-gray-300">Game gets built + 5000 G-Chips + 60% revenue share</p>
                </div>
                <div className="p-4 bg-gray-800/20 rounded-lg border border-gray-700/20">
                  <h4 className="font-semibold text-gray-300 mb-2">🥈 2nd Place</h4>
                  <p className="text-gray-300">3000 G-Chips + Early access to tools</p>
                </div>
                <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-800/20">
                  <h4 className="font-semibold text-orange-400 mb-2">🥉 3rd Place</h4>
                  <p className="text-gray-300">1500 G-Chips + Creator badge</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="mr-2 text-blue-400" size={24} />
                  How to Participate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                  <p>Submit your best game prompt (login required)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                  <p>Community votes for their favorites</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                  <p>Top prompts get selected by our team</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                  <p>Winners announced and development begins!</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Voting Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Current Battle Prompts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {currentPrompts.map((prompt, index) => (
                <Card key={prompt.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-lg">{prompt.title}</CardTitle>
                        <p className="text-gray-400 text-sm">by {prompt.author}</p>
                      </div>
                      <Badge className={`${index === 0 ? 'bg-yellow-600' : index === 1 ? 'bg-gray-600' : index === 2 ? 'bg-orange-600' : 'bg-gray-700'} text-white`}>
                        #{index + 1}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{prompt.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <ThumbsUp size={16} />
                        <span>{prompt.votes} votes</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Vote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-800/20 mb-12">
            <CardContent className="text-center py-12">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Compete?</h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Submit your game prompt and let the community decide if it's worthy of being built!
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Submit Your Prompt
              </Button>
              <p className="text-sm text-gray-400 mt-2">Login required to participate</p>
            </CardContent>
          </Card>

          {/* Previous Winners */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Previous Winners</h2>
            <div className="space-y-4">
              {previousWinners.map((winner, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800">
                  <CardContent className="py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{winner.winner}</h3>
                        <p className="text-gray-400 text-sm">by {winner.author} • {winner.battle}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 md:mt-0">
                        <span className="text-green-400 font-semibold">{winner.prize}</span>
                        <Badge className={winner.status === 'Released' ? 'bg-green-600' : 'bg-blue-600'}>
                          {winner.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Battle;
