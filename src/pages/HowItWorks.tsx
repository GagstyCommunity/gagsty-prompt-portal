
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Users, Code, DollarSign, Zap, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Write Your Game Prompt',
      description: 'Describe your dream game in plain English. No coding knowledge required.',
      example: '"Create a pixel battle game with flying cats and power-ups"',
      icon: <Sparkles className="w-8 h-8 text-purple-400" />,
      features: ['Natural language input', 'Genre flexibility', 'Creative freedom']
    },
    {
      number: '02',
      title: 'AI Builds Your Game',
      description: 'Our advanced AI system transforms your prompt into a playable game.',
      example: 'AI generates mechanics, visuals, and gameplay systems automatically',
      icon: <Code className="w-8 h-8 text-blue-400" />,
      features: ['Automated development', 'Professional quality', 'Fast turnaround']
    },
    {
      number: '03',
      title: 'Publish & Earn',
      description: 'Launch your game and earn 60% of all revenue generated.',
      example: 'Your game goes live and starts earning from day one',
      icon: <DollarSign className="w-8 h-8 text-emerald-400" />,
      features: ['60% revenue share', 'True ownership', 'Ongoing earnings']
    }
  ];

  const features = [
    {
      title: 'No-Code Builder',
      description: 'Create complex games without writing a single line of code',
      icon: <Zap className="w-6 h-6 text-yellow-400" />
    },
    {
      title: 'AI-Powered Development',
      description: 'Advanced AI understands your vision and brings it to life',
      icon: <Sparkles className="w-6 h-6 text-purple-400" />
    },
    {
      title: 'Community Collaboration',
      description: 'Get feedback and collaborate with other creators',
      icon: <Users className="w-6 h-6 text-blue-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              From idea to earnings in three simple steps. No coding experience required.
            </p>
            <Badge className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-3 text-lg">
              <CheckCircle className="mr-2" size={20} />
              Launching August 30, 2025
            </Badge>
          </div>

          {/* Main Process Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-transparent transform translate-x-1/2 -translate-y-1/2 z-0" />
                )}
                
                <Card className="relative bg-gray-900/50 border-purple-700/50 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 z-10">
                  <CardHeader className="text-center">
                    <div className="inline-block bg-gradient-to-r from-purple-600 to-emerald-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                      {step.number}
                    </div>
                    <div className="flex justify-center mb-4">
                      {step.icon}
                    </div>
                    <CardTitle className="text-white text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{step.description}</p>
                    <div className="bg-gray-800/50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-400 italic">"{step.example}"</p>
                    </div>
                    <div className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Powerful Features for Every Creator
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-purple-600 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-900/30 rounded-2xl p-8 border border-purple-700/50">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Do I need coding experience?</h3>
                <p className="text-gray-300">No! Our AI handles all the technical development. You just describe your game idea.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">How long does it take to build a game?</h3>
                <p className="text-gray-300">Most games are completed within 24-48 hours after prompt submission.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What types of games can I create?</h3>
                <p className="text-gray-300">Any genre! From puzzle games to RPGs, our AI adapts to your creative vision.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">How do I earn money?</h3>
                <p className="text-gray-300">You receive 60% of all revenue from your published games, including ads and in-game purchases.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
