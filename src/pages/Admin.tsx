
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { 
  FileText, 
  Users, 
  Award, 
  BookOpen, 
  Settings, 
  LogOut,
  Shield,
  BarChart,
  Coins,
  Bell,
  UserPlus,
  Calendar,
  Wrench,
  Home,
  Briefcase
} from 'lucide-react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminPrompts from '@/components/admin/AdminPrompts';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminBadges from '@/components/admin/AdminBadges';
import AdminBlog from '@/components/admin/AdminBlog';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import AdminChipsManagement from '@/components/admin/AdminChipsManagement';
import AdminNotifications from '@/components/admin/AdminNotifications';
import AdminReferrals from '@/components/admin/AdminReferrals';
import AdminEvents from '@/components/admin/AdminEvents';
import AdminGigs from '@/components/admin/AdminGigs';

const Admin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    checkAdminRole();
  }, [user, navigate]);

  const checkAdminRole = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin role:', error);
        navigate('/dashboard');
        return;
      }

      if (!data) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Error checking admin role:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: Home },
    { id: 'prompts', label: 'Prompt Submissions', icon: FileText },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'badges', label: 'Badge Control', icon: Award },
    { id: 'chips', label: 'Chips Management', icon: Coins },
    { id: 'events', label: 'Events Management', icon: Calendar },
    { id: 'gigs', label: 'Gigs Management', icon: Briefcase },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'referrals', label: 'Referral System', icon: UserPlus },
    { id: 'tools', label: 'Tools & Partnerships', icon: Wrench },
    { id: 'blog', label: 'Content Hub', icon: BookOpen },
    { id: 'settings', label: 'Admin Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex">
      {/* Enhanced Sidebar */}
      <div className="w-72 bg-gray-900/80 backdrop-blur-sm border-r border-gray-800">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 shadow-lg">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <span className="text-xl font-bold text-white">ADMIN PANEL</span>
              <p className="text-xs text-gray-400">Management Dashboard</p>
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
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg transform scale-105'
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
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-600/20 hover:text-red-300 transition-all duration-200"
              >
                <LogOut size={20} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'prompts' && <AdminPrompts />}
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'badges' && <AdminBadges />}
          {activeTab === 'chips' && <AdminChipsManagement />}
          {activeTab === 'events' && <AdminEvents />}
          {activeTab === 'gigs' && <AdminGigs />}
          {activeTab === 'analytics' && <AdminAnalytics />}
          {activeTab === 'notifications' && <AdminNotifications />}
          {activeTab === 'referrals' && <AdminReferrals />}
          {activeTab === 'blog' && <AdminBlog />}
          {activeTab === 'settings' && <AdminSettings />}
          
          {/* Placeholder for tools */}
          {activeTab === 'tools' && (
            <div className="text-center text-gray-400 mt-20">
              <Wrench size={64} className="mx-auto mb-4 text-gray-600" />
              <h2 className="text-2xl font-bold mb-2 text-white">Tools & Partnerships</h2>
              <p className="text-gray-400">Coming soon - Tool partnerships and affiliate tracking</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
