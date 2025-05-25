
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  User, 
  Trophy, 
  Coins, 
  FileText, 
  Settings, 
  BookOpen,
  LogOut,
  Edit
} from 'lucide-react';
import UserPromptSubmission from '@/components/UserPromptSubmission';
import UserPromptsList from '@/components/UserPromptsList';
import UserBadges from '@/components/UserBadges';
import CompleteProfileModal from '@/components/CompleteProfileModal';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('submit');
  const [profile, setProfile] = useState<any>(null);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      setProfile(data);
      
      // Show complete profile modal if profile is not completed
      if (!data.profile_completed) {
        setShowCompleteProfile(true);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const sidebarItems = [
    { id: 'submit', label: 'Submit Prompt', icon: FileText },
    { id: 'prompts', label: 'My Prompts', icon: User },
    { id: 'badges', label: 'Badges & Chips', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <span className="text-lg font-bold text-white">GAGSTY</span>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            <button
              onClick={() => navigate('/codex')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <BookOpen size={20} />
              <span>Codex</span>
            </button>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* User Info */}
        {profile && (
          <div className="p-6 border-t border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <div className="font-medium">{profile.full_name || 'Anonymous'}</div>
                <div className="text-sm text-gray-400">{user?.email}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-600/30">
              <Coins className="text-yellow-500" size={20} />
              <span className="text-yellow-400 font-bold text-lg">{profile.gagsty_chips} G-Chips</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {activeTab === 'submit' && <UserPromptSubmission onSubmitSuccess={fetchProfile} />}
        {activeTab === 'prompts' && <UserPromptsList />}
        {activeTab === 'badges' && <UserBadges />}
        {activeTab === 'settings' && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setShowCompleteProfile(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Edit className="mr-2" size={16} />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Complete Profile Modal */}
      {showCompleteProfile && (
        <CompleteProfileModal
          profile={profile}
          onClose={() => setShowCompleteProfile(false)}
          onComplete={() => {
            setShowCompleteProfile(false);
            fetchProfile();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
