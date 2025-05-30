
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Heart, Users, Lightbulb, Shield, Zap, Globe } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: "Creativity",
      description: "We believe every person has unique creative potential that deserves to be unleashed and celebrated."
    },
    {
      icon: Users,
      title: "Community",
      description: "Great games are built through collaboration. Our community-driven approach ensures the best ideas rise to the top."
    },
    {
      icon: Shield,
      title: "Ownership", 
      description: "True ownership of your creations and fair revenue sharing. Your ideas, your rewards, your future."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Pushing the boundaries of what's possible by combining AI technology with human creativity."
    },
    {
      icon: Zap,
      title: "Accessibility",
      description: "Making game development accessible to everyone, regardless of technical background or experience."
    },
    {
      icon: Globe,
      title: "Transparency",
      description: "Open processes, clear rules, and transparent reward systems that everyone can understand and trust."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <EnhancedHeader />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Democratizing Game Creation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We believe that every creative mind should have the power to bring their game ideas to life, regardless of technical background. Gagsty is building the future where imagination is the only limit to game creation.
            </p>
          </div>

          {/* Mission */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-blue-900/20 to-violet-900/20 border-blue-500/30">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Target className="text-blue-400 mr-3" size={32} />
                  <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                </div>
                <p className="text-xl text-gray-300 leading-relaxed">
                  To democratize game development by providing AI-powered tools that transform creative ideas into playable experiences, enabling anyone to become a game creator and earn from their creativity in the Web3 era.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Vision */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-violet-900/20 to-orange-900/20 border-violet-500/30">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Eye className="text-violet-400 mr-3" size={32} />
                  <h2 className="text-3xl font-bold text-white">Our Vision</h2>
                </div>
                <p className="text-xl text-gray-300 leading-relaxed">
                  A world where millions of creators build, share, and monetize games through simple text prompts, creating a thriving ecosystem that rewards creativity, community collaboration, and true ownership at every level.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 mr-4">
                          <Icon className="text-blue-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white">{value.title}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* The Journey So Far */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-white mb-12">The Journey So Far</h2>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">The Problem We Saw</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Game development has been locked behind technical barriers for too long. Brilliant ideas never see the light of day because their creators lack coding skills, design experience, or the resources to bring concepts to life. Meanwhile, the gaming industry is hungry for fresh, innovative ideas.
                  </p>
                </div>
                <div className="md:w-1/2 text-center">
                  <div className="text-6xl mb-4">🚧</div>
                  <p className="text-gray-400">Traditional barriers limiting creativity</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-violet-400 mb-4">Our Solution</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Gagsty bridges the gap between imagination and reality. By combining advanced AI technology with community collaboration, we've created a platform where anyone can describe their dream game and see it come to life. No coding required, no design skills needed – just pure creativity.
                  </p>
                </div>
                <div className="md:w-1/2 text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-gray-400">AI-powered creation democratizes development</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-orange-400 mb-4">The Future We're Building</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We envision a gaming ecosystem where creators are truly rewarded for their contributions. Where community collaboration drives innovation. Where ownership is real and revenue sharing is fair. This is just the beginning of a revolution in how games are created, shared, and monetized.
                  </p>
                </div>
                <div className="md:w-1/2 text-center">
                  <div className="text-6xl mb-4">🌟</div>
                  <p className="text-gray-400">A thriving creator economy powered by community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Growing Community</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { number: "2,847+", label: "Creators Building", color: "text-blue-400" },
                { number: "156", label: "Game Concepts", color: "text-violet-400" },
                { number: "15,000+", label: "Community Votes", color: "text-orange-400" },
                { number: "89%", label: "User Satisfaction", color: "text-green-400" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Be Part of the Revolution</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Whether you're a dreamer with a game idea, a skilled developer, a tester, or an investor, there's a place for you in the Gagsty community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold px-8 py-3 rounded-xl"
              >
                Join the Waitlist
              </Button>
              <Button 
                onClick={() => navigate('/jobs')}
                variant="outline"
                className="border-orange-500 text-orange-300 hover:bg-orange-500/20 px-8 py-3 rounded-xl"
              >
                Explore Gigs
              </Button>
              <Button 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 px-8 py-3 rounded-xl"
                onClick={() => window.open('mailto:partnerships@gagsty.com', '_blank')}
              >
                Contact Partnerships
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
