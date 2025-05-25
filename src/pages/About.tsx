
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Zap, Globe } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      bio: 'Former game dev at major studios, passionate about democratizing game creation.',
      avatar: '/placeholder.svg'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of AI',
      bio: 'ML researcher specializing in creative AI and natural language processing.',
      avatar: '/placeholder.svg'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Community',
      bio: 'Community builder with 10+ years in gaming and Web3 ecosystems.',
      avatar: '/placeholder.svg'
    },
    {
      name: 'Elena Petrov',
      role: 'Lead Designer',
      bio: 'UI/UX designer focused on making complex technology accessible to everyone.',
      avatar: '/placeholder.svg'
    }
  ];

  const partners = [
    { name: 'OpenAI', type: 'AI Partner' },
    { name: 'Unity Technologies', type: 'Development Partner' },
    { name: 'Polygon', type: 'Blockchain Partner' },
    { name: 'Y Combinator', type: 'Accelerator' }
  ];

  const milestones = [
    { year: '2023', event: 'Gagsty founded with vision to democratize game creation' },
    { year: '2024 Q1', event: 'First AI-generated game prototype completed' },
    { year: '2024 Q2', event: 'Community beta with 1,000+ creators' },
    { year: '2024 Q3', event: 'Waitlist launch and first Prompt Battle' },
    { year: '2024 Q4', event: 'Platform launch with full features' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                What is Gagsty?
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're building the future of game creation—a world where anyone can turn their wildest ideas into playable games using nothing but natural language prompts.
            </p>
          </div>

          {/* Vision Statement */}
          <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-800/20 mb-16">
            <CardContent className="py-12 text-center">
              <Target className="mx-auto mb-6 text-purple-400" size={48} />
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                To democratize game development by combining AI technology with human creativity, 
                creating an ecosystem where anyone can be a game creator regardless of their technical background.
              </p>
            </CardContent>
          </Card>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-900/50 border-gray-800 text-center">
              <CardHeader>
                <Zap className="mx-auto mb-4 text-yellow-400" size={40} />
                <CardTitle className="text-white">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Pushing the boundaries of what's possible with AI-powered creativity and Web3 technology.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 text-center">
              <CardHeader>
                <Users className="mx-auto mb-4 text-blue-400" size={40} />
                <CardTitle className="text-white">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Building a supportive ecosystem where creators collaborate, learn, and succeed together.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 text-center">
              <CardHeader>
                <Globe className="mx-auto mb-4 text-green-400" size={40} />
                <CardTitle className="text-white">Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Making game development accessible to everyone, regardless of coding experience or background.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Founding Story */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Gagsty was born from a simple observation: millions of people have incredible game ideas, 
                  but only a tiny fraction have the technical skills to bring them to life.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Our founders, seasoned game developers and AI researchers, realized that breakthrough advances 
                  in artificial intelligence could finally bridge this gap. What if creating a game could be as 
                  simple as describing your vision in plain English?
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Today, Gagsty combines cutting-edge AI with a passionate community of creators to make this 
                  vision a reality. We're not just building tools—we're creating a new creative economy where 
                  imagination is the only limit.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-800/20">
                <h3 className="text-xl font-bold text-white mb-4">By the Numbers</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">10K+</div>
                    <div className="text-sm text-gray-400">Waitlist Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">500+</div>
                    <div className="text-sm text-gray-400">Games Created</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">$2M+</div>
                    <div className="text-sm text-gray-400">Creator Earnings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">50+</div>
                    <div className="text-sm text-gray-400">Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Meet the Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800 text-center">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4"></div>
                    <CardTitle className="text-white text-lg">{member.name}</CardTitle>
                    <Badge className="bg-gray-700 text-gray-300">{member.role}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Journey</h2>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-20 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex-1">
                    <p className="text-gray-300">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Partners & Supporters</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partners.map((partner, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800 text-center">
                  <CardContent className="py-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg mx-auto mb-4"></div>
                    <h3 className="font-semibold text-white">{partner.name}</h3>
                    <p className="text-sm text-gray-400">{partner.type}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Press Mentions */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-6">Press & Recognition</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold text-emerald-400 mb-2">TechCrunch</h3>
                  <p className="text-gray-300 text-sm">"Gagsty is revolutionizing how games are made"</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400 mb-2">VentureBeat</h3>
                  <p className="text-gray-300 text-sm">"The future of collaborative game development"</p>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-400 mb-2">Game Developer</h3>
                  <p className="text-gray-300 text-sm">"AI-powered creativity at its finest"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
