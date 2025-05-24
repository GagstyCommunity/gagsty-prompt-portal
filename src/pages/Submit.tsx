
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const Submit = () => {
  const [formData, setFormData] = useState({
    title: '',
    gameType: '',
    description: '',
    thumbnail: null as File | null
  });

  const [submittedPrompts] = useState([
    { id: 1, title: 'Space Cat Adventure', status: 'Pending', date: '2024-01-15' },
    { id: 2, title: 'Pixel Warriors', status: 'Approved', date: 'Date  4-01-10' },
    { id: 3, title: 'Magic Forest Quest', status: 'Rejected', date: '2024-01-05' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.gameType && formData.description) {
      toast({
        title: "Prompt Submitted! 🚀",
        description: "Your game idea has been submitted for review. Check back soon for updates!",
      });
      setFormData({ title: '', gameType: '', description: '', thumbnail: null });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-500';
      case 'Rejected': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Submit Your Game Prompt
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Turn your wildest game ideas into reality. Submit a prompt and let our AI + community bring it to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Submission Form */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">New Game Prompt</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Game Title *
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Space Cat Adventure"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Game Type *
                    </label>
                    <select
                      value={formData.gameType}
                      onChange={(e) => setFormData({ ...formData, gameType: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                      required
                    >
                      <option value="">Select game type</option>
                      <option value="action">Action</option>
                      <option value="adventure">Adventure</option>
                      <option value="puzzle">Puzzle</option>
                      <option value="strategy">Strategy</option>
                      <option value="simulation">Simulation</option>
                      <option value="rpg">RPG</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Prompt Description * (Max 150 words)
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your game idea in detail. What makes it unique? What's the gameplay like?"
                      className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                      maxLength={750}
                      required
                    />
                    <p className="text-sm text-gray-400 mt-1">
                      {formData.description.length}/750 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Thumbnail (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files?.[0] || null })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Submit Prompt
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Previous Submissions */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Your Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submittedPrompts.map((prompt) => (
                    <div key={prompt.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-white">{prompt.title}</h3>
                        <Badge className={`${getStatusColor(prompt.status)} text-white`}>
                          {prompt.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">Submitted: {prompt.date}</p>
                    </div>
                  ))}
                  
                  {submittedPrompts.length === 0 && (
                    <p className="text-gray-400 text-center py-8">
                      No submissions yet. Submit your first game prompt above!
                    </p>
                  )}
                </div>

                {/* Badge Progress */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-800/20">
                  <h4 className="font-semibold text-white mb-2">Progress to Next Badge</h4>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">3/5 prompts submitted - Next: Creative Badge 🎨</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Submit;
