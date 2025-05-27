
import React from 'react';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Target, 
  Users, 
  Trophy, 
  Zap, 
  Globe, 
  Rocket,
  Heart,
  Code,
  Gamepad2
} from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'CEO & Co-Founder',
      background: 'Former Meta AI, Stanford CS',
      avatar: '👨‍💻',
      expertise: 'AI/ML, Product Strategy'
    },
    {
      name: 'Sarah Kim',
      role: 'CTO & Co-Founder',
      background: 'Ex-Google Gaming, MIT',
      avatar: '👩‍💻',
      expertise: 'Backend Architecture, Web3'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of AI',
      background: 'OpenAI Researcher, PhD Berkeley',
      avatar: '🧠',
      expertise: 'Game AI, Natural Language'
    },
    {
      name: 'Zoe Wang',
      role: 'Head of Design',
      background: 'Ex-Discord, RISD',
      avatar: '🎨',
      expertise: 'UX/UI, Creator Tools'
    }
  ];

  const milestones = [
    {
      date: 'Q4 2023',
      title: 'Concept & Research',
      description: 'Initial AI gaming research and market validation',
      status: 'completed'
    },
    {
      date: 'Q1 2024',
      title: 'Prototype Development',
      description: 'First working AI game generation prototype',
      status: 'completed'
    },
    {
      date: 'Q2 2024',
      title: 'Creator Workshop Launch',
      description: 'Beta testing with select game creators',
      status: 'completed'
    },
    {
      date: 'Q3 2024',
      title: 'Waitlist & Community',
      description: 'Public waitlist and creator community building',
      status: 'current'
    },
    {
      date: 'Q4 2024',
      title: 'Alpha Release',
      description: 'Limited alpha access for waitlist members',
      status: 'upcoming'
    },
    {
      date: 'Q1 2025',
      title: 'Public Launch',
      description: 'Full platform launch with marketplace',
      status: 'upcoming'
    }
  ];

  const values = [
    {
      icon: <Sparkles className="w-8 h-8 text-purple-400" />,
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible in AI-powered game creation.'
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-400" />,
      title: 'Creator Empowerment',
      description: 'Every creator deserves the tools and ownership to build their vision.'
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-400" />,
      title: 'Community Driven',
      description: 'Our platform grows stronger through collaborative creation and sharing.'
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      title: 'Accessible to All',
      description: 'Game creation should not require years of coding experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <EnhancedHeader />
      
      <div className="relative pt-16">
        {/* Background effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-emerald-900/20 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />
        
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-4 py-2 mb-6">
                <Rocket className="mr-2" size={16} />
                Our Story
              </Badge>
              
              <h1 className="display-xl mb-6">
                <span className="text-gradient">Democratizing</span> Game Creation
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                We believe that every creative mind should have the power to bring their game ideas to life, 
                regardless of technical background. Gagsty is building the future where imagination is the only 
                limit to game creation.
              </p>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <Card className="card-primary hover-lift">
                  <CardContent className="p-8">
                    <Target className="w-12 h-12 text-purple-400 mb-6" />
                    <h3 className="text-2xl font-display font-bold mb-4">Our Mission</h3>
                    <p className="text-gray-300 leading-relaxed">
                      To democratize game development by providing AI-powered tools that transform 
                      creative ideas into playable experiences, enabling anyone to become a game creator 
                      and earn from their creativity.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-primary hover-lift">
                  <CardContent className="p-8">
                    <Zap className="w-12 h-12 text-emerald-400 mb-6" />
                    <h3 className="text-2xl font-display font-bold mb-4">Our Vision</h3>
                    <p className="text-gray-300 leading-relaxed">
                      A world where millions of creators build, share, and monetize games through 
                      simple text prompts, creating a thriving ecosystem that rewards creativity 
                      and innovation at every level.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Values</h2>
                <p className="text-xl text-gray-300">The principles that guide everything we build</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="card-secondary hover-lift text-center">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        {value.icon}
                      </div>
                      <h4 className="text-lg font-semibold mb-3">{value.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Meet Our Team</h2>
                <p className="text-xl text-gray-300">Passionate builders creating the future of gaming</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="card-secondary hover-lift text-center">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4">{member.avatar}</div>
                      <h4 className="text-lg font-semibold mb-1">{member.name}</h4>
                      <p className="text-purple-400 font-medium mb-2">{member.role}</p>
                      <p className="text-gray-400 text-sm mb-3">{member.background}</p>
                      <Badge variant="outline" className="text-xs">
                        {member.expertise}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Roadmap */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Journey</h2>
                <p className="text-xl text-gray-300">Key milestones in building the future of game creation</p>
              </div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-6">
                    <div className={`flex-shrink-0 w-4 h-4 rounded-full mt-2 ${
                      milestone.status === 'completed' 
                        ? 'bg-emerald-500' 
                        : milestone.status === 'current' 
                        ? 'bg-purple-500 animate-pulse-glow' 
                        : 'bg-gray-600'
                    }`} />
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant={
                          milestone.status === 'completed' 
                            ? 'default' 
                            : milestone.status === 'current' 
                            ? 'secondary' 
                            : 'outline'
                        }>
                          {milestone.date}
                        </Badge>
                        <h4 className="text-lg font-semibold">{milestone.title}</h4>
                      </div>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Investment & Partnership */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Card className="card-primary">
                <CardContent className="p-8">
                  <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-display font-bold mb-4">Backed by Industry Leaders</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Gagsty is supported by leading investors and advisors from the gaming, AI, and Web3 spaces 
                    who share our vision for democratizing game creation.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                    <span>🚀 Techstars Alumni</span>
                    <span>🏆 Gaming Industry Veterans</span>
                    <span>🧠 AI Research Advisors</span>
                    <span>💎 Web3 Pioneers</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Join Us in <span className="text-gradient">Building the Future</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Whether you're a creator, player, or investor, there's a place for you in the Gagsty community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary btn-large">
                  <Users className="mr-2" size={20} />
                  Join Our Community
                </Button>
                <Button variant="outline" className="btn-large border-purple-600 text-purple-300 hover:bg-purple-600/20">
                  <Code className="mr-2" size={20} />
                  We're Hiring
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
