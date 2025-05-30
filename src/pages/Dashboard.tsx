
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
  Calendar,
  Briefcase,
  Home,
  BarChart
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
    { id: 'overview', label: 'Dashboard Overview', icon: Home },
    { id: 'waitlist', label: 'My Waitlist Status', icon: Users },
    { id: 'badges', label: 'My Badges & Achievements', icon: Trophy },
    { id: 'chips', label: 'My G-Chips Wallet', icon: Coins },
    { id: 'prompt-battle', label: 'Prompt Battle Zone', icon: Target },
    { id: 'submit', label: 'Submit New Prompt', icon: FileText },
    { id: 'prompts', label: 'My Submissions', icon: User },
    { id: 'game-ideas', label: 'My Game Ideas', icon: Lightbulb },
    { id: 'events', label: 'Events & Rewards', icon: Calendar },
    { id: 'gigs', label: 'Available Gigs', icon: Briefcase },
    { id: 'learning', label: 'Learning Hub', icon: BookOpen },
    { id: 'tools', label: 'Tools & Offers', icon: Wrench },
    { id: 'referrals', label: 'Referral Program', icon: Share2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'analytics', label: 'My Analytics', icon: BarChart },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading your dashboard...</div>
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
      case 'gigs':
        return (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Briefcase className="mr-2 text-green-400" />
                Available Gigs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Find freelance opportunities and earn G-Chips!</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-white font-medium mb-2">Game Tester Needed</h3>
                  <p className="text-gray-400 text-sm mb-3">Test upcoming racing game for bugs</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-medium">500 G-Chips</span>
                    <Button className="bg-green-600 hover:bg-green-700" size="sm">Apply Now</Button>
                  </div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-white font-medium mb-2">UI Designer</h3>
                  <p className="text-gray-400 text-sm mb-3">Design interface for puzzle game</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-medium">1200 G-Chips</span>
                    <Button className="bg-green-600 hover:bg-green-700" size="sm">Apply Now</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'prompt-battle':
        return (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="mr-2 text-blue-400" />
                Prompt Battle Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Test your creativity against other members!</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/30 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Current Battle</h3>
                  <p className="text-gray-400 text-sm mb-3">Theme: "Space Adventure"</p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Time Left</span>
                      <span>2d 14h</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Join Battle
                  </Button>
                </div>
                <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-white font-medium mb-4">Your Battle Stats</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Battles Won:</span>
                      <span className="text-green-400 font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Win Rate:</span>
                      <span className="text-blue-400 font-medium">75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Votes:</span>
                      <span className="text-purple-400 font-medium">127</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rank:</span>
                      <span className="text-yellow-400 font-medium">#24</span>
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
              <CardTitle className="text-white flex items-center">
                <Calendar className="mr-2 text-purple-400" />
                Events & Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">Participate in exclusive events to earn rewards!</p>
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-800/30 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">Winter Game Jam 2024</h3>
                      <p className="text-gray-300 text-sm mb-2">Create a winter-themed game in 48 hours</p>
                      <Badge className="bg-purple-600 text-white">Game Jam</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Starts in</p>
                      <p className="text-lg font-bold text-white">5 days</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className="text-green-400 font-medium">🏆 10,000 G-Chips</span>
                      <span className="text-blue-400 text-sm">👥 245 registered</span>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Register Now
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-800/30 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">Prompt Marathon</h3>
                      <p className="text-gray-300 text-sm mb-2">Submit 10 creative prompts in 24 hours</p>
                      <Badge className="bg-orange-600 text-white">Challenge</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Ends in</p>
                      <p className="text-lg font-bold text-white">12 hours</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className="text-green-400 font-medium">🪙 5,000 G-Chips</span>
                      <span className="text-blue-400 text-sm">👥 89 participating</span>
                    </div>
                    <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                      Join Challenge
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'analytics':
        return (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart className="mr-2 text-green-400" />
                My Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-blue-900/30 border border-blue-800/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-400 text-sm">Total Prompts</p>
                      <p className="text-2xl font-bold text-white">12</p>
                    </div>
                    <FileText className="text-blue-400" size={24} />
                  </div>
                </div>
                <div className="p-4 bg-green-900/30 border border-green-800/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-400 text-sm">Approved</p>
                      <p className="text-2xl font-bold text-white">8</p>
                    </div>
                    <Trophy className="text-green-400" size={24} />
                  </div>
                </div>
                <div className="p-4 bg-purple-900/30 border border-purple-800/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-400 text-sm">Total Votes</p>
                      <p className="text-2xl font-bold text-white">234</p>
                    </div>
                    <Target className="text-purple-400" size={24} />
                  </div>
                </div>
                <div className="p-4 bg-yellow-900/30 border border-yellow-800/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-400 text-sm">G-Chips Earned</p>
                      <p className="text-2xl font-bold text-white">2,450</p>
                    </div>
                    <Coins className="text-yellow-400" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-lg">
                <h3 className="text-white font-medium mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded">
                    <span className="text-gray-300">Prompt "Space Cats" approved</span>
                    <span className="text-green-400">+500 G-Chips</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded">
                    <span className="text-gray-300">Voted in Prompt Battle</span>
                    <span className="text-blue-400">+50 G-Chips</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded">
                    <span className="text-gray-300">Completed profile</span>
                    <span className="text-purple-400">Badge earned</span>
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
              <CardTitle className="text-white flex items-center">
                <Settings className="mr-2 text-gray-400" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Profile Information</h3>
                  <p className="text-gray-400 text-sm">Update your profile details and preferences</p>
                </div>
                <Button
                  onClick={() => setShowCompleteProfile(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Edit className="mr-2" size={16} />
                  Edit Profile
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h3 className="text-white font-medium mb-3">Account Security</h3>
                  <p className="text-gray-400 text-sm mb-4">Manage your password and security settings</p>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    Change Password
                  </Button>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h3 className="text-white font-medium mb-3">Privacy Settings</h3>
                  <p className="text-gray-400 text-sm mb-4">Control your privacy and data preferences</p>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    Manage Privacy
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="text-white font-medium mb-3">Notifications</h3>
                <p className="text-gray-400 text-sm mb-4">Choose how you want to be notified</p>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span className="text-gray-300">Email notifications for prompt updates</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span className="text-gray-300">New event announcements</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-gray-300">Weekly progress reports</span>
                  </label>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex">
      {/* Enhanced Sidebar */}
      <div className="w-72 bg-gray-900/80 backdrop-blur-sm border-r border-gray-800">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
              <span className="text-lg font-bold text-white">G</span>
            </div>
            <div>
              <span className="text-xl font-bold text-white">GAGSTY</span>
              <p className="text-xs text-gray-400">Creator Dashboard</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:scale-102'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
            
            <div className="pt-4 border-t border-gray-800">
              <button
                onClick={() => navigate('/codex')}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200"
              >
                <BookOpen size={20} />
                <span className="text-sm font-medium">Learning Hub</span>
              </button>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-600/20 hover:text-red-300 transition-all duration-200"
              >
                <LogOut size={20} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Enhanced User Info */}
        {profile && (
          <div className="p-6 border-t border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User size={24} />
              </div>
              <div>
                <div className="font-medium text-sm text-white">{profile.full_name || 'Anonymous'}</div>
                <div className="text-xs text-gray-400">{user?.email}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-600/30">
              <Coins className="text-yellow-500" size={18} />
              <span className="text-yellow-400 font-bold text-sm">{profile.gagsty_chips || 0} G-Chips</span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {renderMainContent()}
        </div>
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
