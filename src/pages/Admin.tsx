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
  Home
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
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'referrals', label: 'Referral System', icon: UserPlus },
    { id: 'events', label: 'Events & Rewards', icon: Calendar },
    { id: 'tools', label: 'Tools & Partnerships', icon: Wrench },
    { id: 'blog', label: 'Content Hub', icon: BookOpen },
    { id: 'settings', label: 'Admin Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-600">
              <Shield className="text-white" size={20} />
            </div>
            <span className="text-lg font-bold text-white">ADMIN PANEL</span>
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
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'prompts' && <AdminPrompts />}
        {activeTab === 'users' && <AdminUsers />}
        {activeTab === 'badges' && <AdminBadges />}
        {activeTab === 'chips' && <AdminChipsManagement />}
        {activeTab === 'analytics' && <AdminAnalytics />}
        {activeTab === 'notifications' && <AdminNotifications />}
        {activeTab === 'referrals' && <AdminReferrals />}
        {activeTab === 'blog' && <AdminBlog />}
        {activeTab === 'settings' && <AdminSettings />}
        
        {/* Placeholder components for remaining sections */}
        {activeTab === 'events' && (
          <div className="text-center text-gray-400 mt-20">
            <Calendar size={64} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Events & Rewards Management</h2>
            <p>Coming soon - Event creation and management tools</p>
          </div>
        )}
        
        {activeTab === 'tools' && (
          <div className="text-center text-gray-400 mt-20">
            <Wrench size={64} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Tools & Partnerships</h2>
            <p>Coming soon - Tool partnerships and affiliate tracking</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
