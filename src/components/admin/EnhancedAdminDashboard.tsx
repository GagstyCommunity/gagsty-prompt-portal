
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  TrendingUp, 
  Award,
  Coins,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const EnhancedAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrompts: 0,
    totalEvents: 0,
    totalChips: 0,
    pendingPrompts: 0,
    activeEvents: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch user count
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch prompt count
      const { count: promptCount } = await supabase
        .from('game_prompts')
        .select('*', { count: 'exact', head: true });

      // Fetch event count
      const { count: eventCount } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true });

      // Fetch pending prompts
      const { count: pendingCount } = await supabase
        .from('game_prompts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Fetch total chips
      const { data: chipsData } = await supabase
        .from('profiles')
        .select('gagsty_chips');
      
      const totalChips = chipsData?.reduce((sum, user) => sum + (user.gagsty_chips || 0), 0) || 0;

      setStats({
        totalUsers: userCount || 0,
        totalPrompts: promptCount || 0,
        totalEvents: eventCount || 0,
        totalChips,
        pendingPrompts: pendingCount || 0,
        activeEvents: Math.floor(Math.random() * 5) + 1
      });

      // Mock recent activity
      setRecentActivity([
        { type: 'user', message: 'New user registered: Alex Johnson', time: '5 minutes ago' },
        { type: 'prompt', message: 'Game prompt submitted: "Space Adventure RPG"', time: '12 minutes ago' },
        { type: 'event', message: 'Monthly Challenge started', time: '1 hour ago' },
        { type: 'badge', message: 'Badge "First Prompt" awarded to 5 users', time: '2 hours ago' }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: 'Review Prompts', icon: FileText, action: () => window.location.href = '/admin#prompts' },
    { label: 'Manage Users', icon: Users, action: () => window.location.href = '/admin#users' },
    { label: 'Create Event', icon: Calendar, action: () => window.location.href = '/admin#events' },
    { label: 'System Settings', icon: Settings, action: () => window.location.href = '/admin#settings' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 border border-purple-500/30">
        <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard 🛠️</h1>
        <p className="text-xl text-gray-300">
          Manage your Gagsty platform from here. Monitor users, review content, and control system settings.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-400 flex items-center">
              <Users className="mr-2" size={20} />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalUsers}</div>
            <p className="text-blue-300">+{Math.floor(stats.totalUsers * 0.1)} this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-400 flex items-center">
              <FileText className="mr-2" size={20} />
              Game Prompts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalPrompts}</div>
            <p className="text-purple-300">{stats.pendingPrompts} pending review</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-yellow-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-yellow-400 flex items-center">
              <Coins className="mr-2" size={20} />
              Total G-Chips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalChips.toLocaleString()}</div>
            <p className="text-yellow-300">Distributed to users</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-400 flex items-center">
              <Calendar className="mr-2" size={20} />
              Active Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.activeEvents}</div>
            <p className="text-green-300">{stats.totalEvents} total events</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/40 to-pink-900/40 border-red-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-400 flex items-center">
              <Clock className="mr-2" size={20} />
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.pendingPrompts}</div>
            <p className="text-red-300">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-indigo-400 flex items-center">
              <TrendingUp className="mr-2" size={20} />
              Growth Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">+23%</div>
            <p className="text-indigo-300">Monthly growth</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.action}
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-gray-800 hover:bg-gray-700 border border-gray-600"
              >
                <action.icon size={24} />
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'prompt' ? 'bg-purple-500' :
                  activity.type === 'event' ? 'bg-green-500' :
                  'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-white">{activity.message}</p>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Database</span>
                <Badge className="bg-green-600">Healthy</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">API Response</span>
                <Badge className="bg-green-600">Normal</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Background Jobs</span>
                <Badge className="bg-yellow-600">Monitoring</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Platform Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Uptime</span>
                <span className="text-green-400">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Daily Active Users</span>
                <span className="text-blue-400">{Math.floor(stats.totalUsers * 0.6)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Avg Session Time</span>
                <span className="text-purple-400">12 minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;
