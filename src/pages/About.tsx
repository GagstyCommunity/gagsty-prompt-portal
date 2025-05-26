
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Rocket, Calendar, CheckCircle, Star } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former game developer at Epic Games with 10+ years in AI and gaming.',
      avatar: '👨‍💻'
    },
    {
      name: 'Sarah Kim',
      role: 'CTO & Co-Founder',
      bio: 'AI researcher and former Google engineer specializing in natural language processing.',
      avatar: '👩‍💻'
    },
    {
      name: 'Marcus Rivera',
      role: 'Head of Product',
      bio: 'Product leader with experience at Unity and Roblox, passionate about creator tools.',
      avatar: '👨‍🎨'
    },
    {
      name: 'Emma Thompson',
      role: 'Lead AI Engineer',
      bio: 'PhD in Machine Learning, previously at OpenAI working on creative AI systems.',
      avatar: '👩‍🔬'
    }
  ];

  const roadmap = [
    {
      phase: 'Q3 2024',
      title: 'Foundation',
      status: 'completed',
      items: ['Core AI engine development', 'Initial prompt processing system', 'Basic game templates']
    },
    {
      phase: 'Q4 2024',
      title: 'Beta Development',
      status: 'completed',
      items: ['Advanced AI training', 'Game genre expansion', 'Community features']
    },
    {
      phase: 'Q1 2025',
      title: 'Alpha Testing',
      status: 'in-progress',
      items: ['Closed alpha with select creators', 'Prompt battle system', 'Revenue sharing framework']
    },
    {
      phase: 'Q2 2025',
      title: 'Platform Refinement',
      status: 'upcoming',
      items: ['Public beta launch', 'Mobile optimization', 'Creator monetization tools']
    },
    {
      phase: 'Q3 2025',
      title: 'Full Launch',
      status: 'upcoming',
      items: ['Public platform launch', 'Marketplace opening', 'Advanced creator tools']
    }
  ];

  const mission = {
    vision: "To democratize game development and empower anyone to become a successful game creator",
    mission: "We're building the world's first AI-powered platform where creativity meets technology, allowing anyone to turn their imagination into profitable games",
    values: [
      { title: 'Accessibility', description: 'Game creation should be accessible to everyone, regardless of technical background' },
      { title: 'Innovation', description: 'We push the boundaries of what AI can achieve in creative industries' },
      { title: 'Community', description: 'Success is shared - our creators are partners, not just users' },
      { title: 'Quality', description: 'Every game created on our platform meets professional standards' }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                About Gagsty
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              We're on a mission to democratize game development and create a new generation of game creators who earn from their creativity.
            </p>
            <Badge className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-3 text-lg">
              <Rocket className="mr-2" size={20} />
              Launching August 30, 2025
            </Badge>
          </div>

          {/* Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gray-900/50 border-purple-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="mr-2 text-purple-400" size={24} />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-lg leading-relaxed">{mission.vision}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-purple-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Rocket className="mr-2 text-emerald-400" size={24} />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-lg leading-relaxed">{mission.mission}</p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mission.values.map((value, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-purple-600 transition-all">
                  <CardContent className="p-6 text-center">
                    <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-300 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="bg-gray-900/50 border-purple-700/50 text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{member.avatar}</div>
                    <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-purple-300 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-300 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Development Roadmap</h2>
            <div className="space-y-6">
              {roadmap.map((phase, index) => (
                <Card key={index} className={`border-2 ${
                  phase.status === 'completed' ? 'border-emerald-600 bg-emerald-900/20' :
                  phase.status === 'in-progress' ? 'border-yellow-600 bg-yellow-900/20' :
                  'border-gray-700 bg-gray-900/50'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 mb-2 md:mb-0">
                        <Badge className={`${
                          phase.status === 'completed' ? 'bg-emerald-600' :
                          phase.status === 'in-progress' ? 'bg-yellow-600' :
                          'bg-gray-600'
                        } text-white`}>
                          <Calendar className="mr-1" size={14} />
                          {phase.phase}
                        </Badge>
                        <h3 className="text-xl font-semibold text-white">{phase.title}</h3>
                      </div>
                      <Badge className={`${
                        phase.status === 'completed' ? 'bg-emerald-600' :
                        phase.status === 'in-progress' ? 'bg-yellow-600' :
                        'bg-gray-600'
                      } text-white`}>
                        {phase.status === 'completed' ? 'Completed' :
                         phase.status === 'in-progress' ? 'In Progress' :
                         'Upcoming'}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {phase.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center text-gray-300">
                          <CheckCircle className={`w-4 h-4 mr-2 ${
                            phase.status === 'completed' ? 'text-emerald-400' :
                            phase.status === 'in-progress' ? 'text-yellow-400' :
                            'text-gray-600'
                          }`} />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <Card className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 border-purple-700/50">
            <CardContent className="text-center py-12">
              <h3 className="text-2xl font-bold text-white mb-4">Want to Learn More?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Have questions about our platform, team, or vision? We'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:hello@gagsty.com" className="inline-block">
                  <button className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-all">
                    Contact Us
                  </button>
                </a>
                <a href="#" className="inline-block">
                  <button className="border border-purple-600 text-purple-300 hover:bg-purple-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-all">
                    Join Our Discord
                  </button>
                </a>
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
