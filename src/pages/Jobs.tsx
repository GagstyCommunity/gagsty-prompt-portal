
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, MapPin, Clock, DollarSign, Star } from 'lucide-react';

const Jobs = () => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('all');

  const roles = [
    { id: 'all', name: 'All Roles' },
    { id: 'designer', name: 'Game Designer' },
    { id: 'tester', name: 'Game Tester' },
    { id: 'writer', name: 'Prompt Writer' },
    { id: 'artist', name: 'Visual Artist' },
    { id: 'developer', name: 'Developer' }
  ];

  const skills = [
    { id: 'all', name: 'All Skills' },
    { id: 'unity', name: 'Unity' },
    { id: 'prompt-writing', name: 'Prompt Writing' },
    { id: 'ui-design', name: 'UI Design' },
    { id: 'testing', name: 'Game Testing' },
    { id: 'pixel-art', name: 'Pixel Art' }
  ];

  const gigs = [
    {
      id: 1,
      title: 'Game Tester for Racing Game',
      role: 'tester',
      skills: ['testing'],
      reward: '500 G-Chips',
      duration: '2 days',
      location: 'Remote',
      poster: 'SpeedDev Studios',
      rating: 4.8,
      description: 'Test our new cyberpunk racing game for bugs and gameplay balance.',
      applicants: 12,
      featured: true
    },
    {
      id: 2,
      title: 'UI Designer for Mobile Game',
      role: 'designer',
      skills: ['ui-design'],
      reward: '1,200 G-Chips',
      duration: '1 week',
      location: 'Remote',
      poster: 'PixelCraft Games',
      rating: 4.9,
      description: 'Design modern UI elements for our upcoming mobile puzzle game.',
      applicants: 8,
      featured: false
    },
    {
      id: 3,
      title: 'Prompt Writer for Fantasy RPG',
      role: 'writer',
      skills: ['prompt-writing'],
      reward: '800 G-Chips',
      duration: '3 days',
      location: 'Remote',
      poster: 'MagicQuest Studio',
      rating: 4.7,
      description: 'Create engaging character and quest prompts for our fantasy RPG.',
      applicants: 15,
      featured: true
    },
    {
      id: 4,
      title: 'Pixel Artist for Platformer',
      role: 'artist',
      skills: ['pixel-art'],
      reward: '1,500 G-Chips',
      duration: '5 days',
      location: 'Remote',
      poster: 'RetroGames Inc',
      rating: 4.6,
      description: 'Create pixel art sprites and animations for retro-style platformer.',
      applicants: 6,
      featured: false
    },
    {
      id: 5,
      title: 'Unity Developer for VR Game',
      role: 'developer',
      skills: ['unity'],
      reward: '2,500 G-Chips',
      duration: '2 weeks',
      location: 'Remote',
      poster: 'VR Innovations',
      rating: 4.9,
      description: 'Develop VR mechanics and interactions for immersive adventure game.',
      applicants: 4,
      featured: true
    }
  ];

  const filteredGigs = gigs.filter(gig => {
    const matchesRole = selectedRole === 'all' || gig.role === selectedRole;
    const matchesSkill = selectedSkill === 'all' || gig.skills.includes(selectedSkill);
    return matchesRole && matchesSkill;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'designer': return 'bg-purple-600';
      case 'tester': return 'bg-green-600';
      case 'writer': return 'bg-blue-600';
      case 'artist': return 'bg-pink-600';
      case 'developer': return 'bg-orange-600';
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
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Get Paid to Work in Web3 Gaming
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find freelance opportunities in game development, testing, design, and more. Earn Gagsty Chips for your skills.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" size={20} />
              <span className="text-gray-400">Filter by:</span>
            </div>
            
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>

            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
            >
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>{skill.name}</option>
              ))}
            </select>
          </div>

          {/* Gig Listings */}
          <div className="space-y-6 mb-12">
            {filteredGigs.map((gig) => (
              <Card key={gig.id} className={`bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all ${gig.featured ? 'ring-2 ring-yellow-600/20' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{gig.title}</h3>
                            {gig.featured && (
                              <Badge className="bg-yellow-600 text-white">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                            <span>{gig.poster}</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              {gig.rating}
                            </div>
                            <span>{gig.applicants} applicants</span>
                          </div>
                        </div>
                        <Badge className={`${getRoleColor(gig.role)} text-white`}>
                          {roles.find(r => r.id === gig.role)?.name}
                        </Badge>
                      </div>

                      <p className="text-gray-300 mb-4">{gig.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-green-400">
                          <DollarSign className="mr-1" size={16} />
                          {gig.reward}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Clock className="mr-1" size={16} />
                          {gig.duration}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <MapPin className="mr-1" size={16} />
                          {gig.location}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {gig.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-gray-400 border-gray-600">
                            {skills.find(s => s.id === skill)?.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredGigs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No gigs found matching your filters.</p>
              </div>
            )}
          </div>

          {/* Post Gig CTA */}
          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800/20">
            <CardContent className="text-center py-12">
              <h3 className="text-2xl font-bold text-white mb-4">Have a Project? Post a Gig</h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Connect with talented creators in the Gagsty community. Post your project and find the perfect collaborator.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Post a Gig
              </Button>
              <p className="text-sm text-gray-400 mt-2">Subject to admin approval</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
