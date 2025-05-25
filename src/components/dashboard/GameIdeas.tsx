
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Lightbulb, 
  Plus, 
  Eye, 
  MessageCircle, 
  ThumbsUp, 
  DollarSign,
  Clock,
  TrendingUp,
  Search
} from 'lucide-react';

const GameIdeas: React.FC = () => {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const gameIdeas = [
    {
      id: 1,
      title: 'Quantum Puzzle Adventure',
      description: 'A mind-bending puzzle game where players manipulate quantum states to solve challenges.',
      category: 'Puzzle',
      status: 'Under Review',
      submittedDate: '2024-01-15',
      votes: 142,
      comments: 23,
      views: 1250,
      revenueShare: '15%',
      estimatedRevenue: '$2,400'
    },
    {
      id: 2,
      title: 'AI Companion RPG',
      description: 'An RPG where AI companions learn and evolve based on player choices and behavior.',
      category: 'RPG',
      status: 'Selected',
      submittedDate: '2024-01-10',
      votes: 89,
      comments: 31,
      views: 890,
      revenueShare: '20%',
      estimatedRevenue: '$5,600'
    },
    {
      id: 3,
      title: 'Space Station Manager',
      description: 'Manage resources and crew on a space station while dealing with cosmic events.',
      category: 'Strategy',
      status: 'Pending',
      submittedDate: '2024-01-20',
      votes: 67,
      comments: 12,
      views: 543,
      revenueShare: 'TBD',
      estimatedRevenue: 'TBD'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selected': return 'bg-green-600';
      case 'Under Review': return 'bg-yellow-600';
      case 'Pending': return 'bg-blue-600';
      case 'Rejected': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Puzzle': return 'bg-purple-600';
      case 'RPG': return 'bg-red-600';
      case 'Strategy': return 'bg-blue-600';
      case 'Action': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const filteredIdeas = gameIdeas.filter(idea =>
    idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">My Game Ideas</h1>
        <Button 
          onClick={() => setShowSubmitForm(!showSubmitForm)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          <Plus className="mr-2" size={16} />
          Submit New Idea
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Lightbulb className="text-yellow-500" size={24} />
              <div>
                <h3 className="text-white font-semibold">Total Ideas</h3>
                <p className="text-2xl font-bold text-yellow-500">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="text-green-500" size={24} />
              <div>
                <h3 className="text-white font-semibold">Selected</h3>
                <p className="text-2xl font-bold text-green-500">1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="text-green-500" size={24} />
              <div>
                <h3 className="text-white font-semibold">Est. Revenue</h3>
                <p className="text-2xl font-bold text-green-500">$5,600</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <ThumbsUp className="text-blue-500" size={24} />
              <div>
                <h3 className="text-white font-semibold">Total Votes</h3>
                <p className="text-2xl font-bold text-blue-500">298</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          placeholder="Search your game ideas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-900/50 border-gray-800 text-white"
        />
      </div>

      {/* Submit Form */}
      {showSubmitForm && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Submit New Game Idea</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="Game Title"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Textarea 
              placeholder="Describe your game idea in detail..."
              className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
            />
            <div className="flex space-x-4">
              <Button className="bg-green-600 hover:bg-green-700">
                Submit Idea
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowSubmitForm(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Game Ideas List */}
      <div className="space-y-6">
        {filteredIdeas.map((idea) => (
          <Card key={idea.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold text-white">{idea.title}</h3>
                    <Badge className={`${getCategoryColor(idea.category)} text-white`}>
                      {idea.category}
                    </Badge>
                    <Badge className={`${getStatusColor(idea.status)} text-white`}>
                      {idea.status}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{idea.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Clock className="mr-2" size={16} />
                      {idea.submittedDate}
                    </div>
                    <div className="flex items-center text-blue-400">
                      <Eye className="mr-2" size={16} />
                      {idea.views} views
                    </div>
                    <div className="flex items-center text-green-400">
                      <ThumbsUp className="mr-2" size={16} />
                      {idea.votes} votes
                    </div>
                    <div className="flex items-center text-purple-400">
                      <MessageCircle className="mr-2" size={16} />
                      {idea.comments} comments
                    </div>
                    <div className="flex items-center text-yellow-400">
                      <DollarSign className="mr-2" size={16} />
                      {idea.revenueShare} share
                    </div>
                  </div>

                  {idea.status === 'Selected' && (
                    <div className="mt-4 p-3 bg-green-900/30 border border-green-800/30 rounded-lg">
                      <div className="flex items-center text-green-400">
                        <DollarSign className="mr-2" size={16} />
                        <span className="font-medium">Estimated Revenue: {idea.estimatedRevenue}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-2">
                  <Button 
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    View Details
                  </Button>
                  {idea.status === 'Pending' && (
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIdeas.length === 0 && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="text-center py-12">
            <Lightbulb className="mx-auto text-gray-500 mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">No Game Ideas Found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? 'No ideas match your search criteria.' : 'Start by submitting your first game idea!'}
            </p>
            <Button 
              onClick={() => setShowSubmitForm(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Plus className="mr-2" size={16} />
              Submit Game Idea
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GameIdeas;
