
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Briefcase, Clock, MapPin, DollarSign } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const AdminGigs = () => {
  const [gigs, setGigs] = useState<any[]>([]);
  const [selectedGig, setSelectedGig] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    role_type: '',
    skills_required: [],
    reward_amount: 0,
    duration_days: null,
    status: 'open',
    location: 'Remote'
  });
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const { data, error } = await supabase
        .from('gigs')
        .select(`
          *,
          profiles:creator_id (full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGigs(data || []);
    } catch (error) {
      console.error('Error fetching gigs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch gigs.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const gigData = {
        ...formData,
        creator_id: user.id,
        skills_required: formData.skills_required
      };

      if (selectedGig) {
        const { error } = await supabase
          .from('gigs')
          .update(gigData)
          .eq('id', selectedGig.id);

        if (error) throw error;
        toast({ title: "Success", description: "Gig updated successfully!" });
      } else {
        const { error } = await supabase
          .from('gigs')
          .insert(gigData);

        if (error) throw error;
        toast({ title: "Success", description: "Gig created successfully!" });
      }

      setShowDialog(false);
      setSelectedGig(null);
      resetForm();
      fetchGigs();
    } catch (error) {
      console.error('Error saving gig:', error);
      toast({
        title: "Error",
        description: "Failed to save gig.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      role_type: '',
      skills_required: [],
      reward_amount: 0,
      duration_days: null,
      status: 'open',
      location: 'Remote'
    });
    setSkillInput('');
  };

  const handleEdit = (gig: any) => {
    setSelectedGig(gig);
    setFormData({
      title: gig.title,
      description: gig.description,
      role_type: gig.role_type,
      skills_required: gig.skills_required || [],
      reward_amount: gig.reward_amount,
      duration_days: gig.duration_days,
      status: gig.status,
      location: gig.location
    });
    setShowDialog(true);
  };

  const handleDelete = async (gigId: string) => {
    if (!confirm('Are you sure you want to delete this gig?')) return;

    try {
      const { error } = await supabase
        .from('gigs')
        .delete()
        .eq('id', gigId);

      if (error) throw error;
      toast({ title: "Success", description: "Gig deleted successfully!" });
      fetchGigs();
    } catch (error) {
      console.error('Error deleting gig:', error);
      toast({
        title: "Error",
        description: "Failed to delete gig.",
        variant: "destructive",
      });
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills_required.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills_required: [...formData.skills_required, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills_required: formData.skills_required.filter(s => s !== skill)
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div className="text-white">Loading gigs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Gigs Management</h1>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              onClick={() => {
                setSelectedGig(null);
                resetForm();
              }}
            >
              <Plus className="mr-2" size={16} />
              Create Gig
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                {selectedGig ? 'Edit Gig' : 'Create New Gig'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Job Title *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role Type *
                  </label>
                  <select
                    value={formData.role_type}
                    onChange={(e) => setFormData({ ...formData, role_type: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Game Designer">Game Designer</option>
                    <option value="Developer">Developer</option>
                    <option value="Artist">Artist</option>
                    <option value="Tester">Tester</option>
                    <option value="Writer">Writer</option>
                    <option value="Audio Designer">Audio Designer</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Description *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Required Skills
                </label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Enter a skill"
                    className="bg-gray-800 border-gray-700 text-white flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} className="bg-blue-600 hover:bg-blue-700">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills_required.map((skill, index) => (
                    <Badge key={index} className="bg-blue-600 text-white">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-red-300"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Reward (G-Chips) *
                  </label>
                  <Input
                    type="number"
                    value={formData.reward_amount}
                    onChange={(e) => setFormData({ ...formData, reward_amount: parseInt(e.target.value) || 0 })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration (Days)
                  </label>
                  <Input
                    type="number"
                    value={formData.duration_days || ''}
                    onChange={(e) => setFormData({ ...formData, duration_days: e.target.value ? parseInt(e.target.value) : null })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Remote, New York, etc."
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDialog(false)}
                  className="border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {selectedGig ? 'Update Gig' : 'Create Gig'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {gigs.map((gig) => (
          <Card key={gig.id} className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white text-xl">{gig.title}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={`${getStatusColor(gig.status)} text-white`}>
                      {gig.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {gig.role_type}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(gig)}
                    className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(gig.id)}
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{gig.description}</p>
              
              {gig.skills_required && gig.skills_required.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {gig.skills_required.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="border-blue-600 text-blue-400">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <DollarSign className="text-green-400" size={16} />
                  <div>
                    <p className="text-gray-400">Reward</p>
                    <p className="text-green-400">{gig.reward_amount} G-Chips</p>
                  </div>
                </div>
                
                {gig.duration_days && (
                  <div className="flex items-center space-x-2">
                    <Clock className="text-blue-400" size={16} />
                    <div>
                      <p className="text-gray-400">Duration</p>
                      <p className="text-white">{gig.duration_days} days</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <MapPin className="text-purple-400" size={16} />
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-white">{gig.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Briefcase className="text-orange-400" size={16} />
                  <div>
                    <p className="text-gray-400">Creator</p>
                    <p className="text-white">{gig.profiles?.full_name || 'Unknown'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {gigs.length === 0 && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="text-center py-12">
              <Briefcase className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400 text-lg">No gigs found</p>
              <p className="text-gray-500">Create your first gig to get started!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminGigs;
