
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
  Edit,
  Users,
  Target,
  Bell,
  Share2,
  Wrench,
  Lightbulb,
  Calendar
} from 'lucide-react';
import UserPromptSubmission from '@/components/UserPromptSubmission';
import UserPromptsList from '@/components/UserPromptsList';
import UserBadges from '@/components/UserBadges';
import CompleteProfileModal from '@/components/CompleteProfileModal';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import WaitlistStatus from '@/components/dashboard/WaitlistStatus';
import ChipsOverview from '@/components/dashboard/ChipsOverview';
import LearningHub from '@/components/dashboard/LearningHub';
import GameIdeas from '@/components/dashboard/GameIdeas';
import ToolsOffers from '@/components/dashboard/ToolsOffers';
import Notifications from '@/components/dashboard/Notifications';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
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
    { id: 'overview', label: 'Dashboard Overview', icon: Trophy },
    { id: 'waitlist', label: 'My Waitlist Status', icon: Users },
    { id: 'badges', label: 'My Badges', icon: Trophy },
    { id: 'chips', label: 'My G-Chips', icon: Coins },
    { id: 'prompt-battle', label: 'Prompt Battle Zone', icon: Target },
    { id: 'submit', label: 'Submit Prompt', icon: FileText },
    { id: 'prompts', label: 'My Prompts', icon: User },
    { id: 'game-ideas', label: 'My Game Ideas', icon: Lightbulb },
    { id: 'events', label: 'Events & Rewards', icon: Calendar },
    { id: 'learning', label: 'Learning Hub', icon: BookOpen },
    { id: 'tools', label: 'Tools & Offers', icon: Wrench },
    { id: 'referrals', label: 'Referral System', icon: Share2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const renderMainContent = () => {
    switch(activeTab) {
      case 'overview':
        return <WelcomeHeader profile={profile} waitlistPosition={124} />;
      case 'waitlist':
        return <WaitlistStatus profile={profile} />;
      case 'chips':
        return <ChipsOverview profile={profile} />;
      case 'learning':
        return <LearningHub />;
      case 'game-ideas':
        return <GameIdeas />;
      case 'tools':
        return <ToolsOffers />;
      case 'notifications':
        return <Notifications />;
      case 'prompt-battle':
        return (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Prompt Battle Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Test your creativity against other members!</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Current Battle</h3>
                  <p className="text-gray-400 text-sm mb-3">Theme: "Space Adventure"</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Join Battle</Button>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Your Stats</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Battles Won:</span>
                      <span className="text-green-400">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Win Rate:</span>
                      <span className="text-blue-400">75%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'submit':
        return <UserPromptSubmission onSubmitSuccess={fetchProfile} />;
      case 'prompts':
        return <UserPromptsList />;
      case 'badges':
        return <UserBadges />;
      case 'events':
        return (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Events & Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Participate in exclusive events to earn rewards!</p>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-800/30 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Winter Game Jam 2024</h3>
                  <p className="text-gray-300 text-sm mb-2">Create a winter-themed game in 48 hours</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-medium">Reward: 10,000 G-Chips</span>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Register
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'referrals':
        return <WaitlistStatus profile={profile} />;
      case 'settings':
        return (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => setShowCompleteProfile(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Edit className="mr-2" size={16} />
                Edit Profile
              </Button>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Account Security</h3>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                    Change Password
                  </Button>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Privacy Settings</h3>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                    Manage Privacy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return <WelcomeHeader profile={profile} waitlistPosition={124} />;
    }
  };

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
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
            
            <button
              onClick={() => navigate('/codex')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <BookOpen size={20} />
              <span className="text-sm">Learning Hub</span>
            </button>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
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
                <div className="font-medium text-sm">{profile.full_name || 'Anonymous'}</div>
                <div className="text-xs text-gray-400">{user?.email}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-600/30">
              <Coins className="text-yellow-500" size={16} />
              <span className="text-yellow-400 font-bold text-sm">{profile.gagsty_chips} G-Chips</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {renderMainContent()}
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
