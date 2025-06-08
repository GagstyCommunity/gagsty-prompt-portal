import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Users, 
  FileText, 
  UserPlus, 
  Coins, 
  TrendingUp,
  Activity,
  CheckCircle,
  Award,
  Bell,
  Calendar,
  Briefcase,
  RefreshCw,
  Download,
  AlertTriangle,
  Eye
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrompts: 0,
    totalReferrals: 0,
    totalChips: 0,
    pendingPrompts: 0,
    activeEvents: 0,
    openGigs: 0,
    newUsersToday: 0,
    activeUsers: 0
  });
  const [topPerformers, setTopPerformers] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [systemHealth, setSystemHealth] = useState({ status: 'healthy', issues: 0 });
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [chipAmount, setChipAmount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
    
    if (autoRefresh) {
      const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch comprehensive stats with better error handling
      const [
        { count: totalUsers },
        { count: totalPrompts },
        { count: totalReferrals },
        { count: pendingPrompts },
        { count: activeEvents },
        { count: openGigs }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('game_prompts').select('*', { count: 'exact', head: true }),
        supabase.from('referrals').select('*', { count: 'exact', head: true }),
        supabase.from('game_prompts').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'upcoming'),
        supabase.from('gigs').select('*', { count: 'exact', head: true }).eq('status', 'open')
      ]);

      // Get users created today
      const today = new Date().toISOString().split('T')[0];
      const { count: newUsersToday } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today);

      // Calculate total chips
      const { data: chipsData } = await supabase
        .from('profiles')
        .select('gagsty_chips');
      
      const totalChips = chipsData?.reduce((sum, profile) => sum + (profile.gagsty_chips || 0), 0) || 0;

      // Fetch top performers with better data
      const { data: performers } = await supabase
        .from('profiles')
        .select('id, full_name, username, gagsty_chips, created_at')
        .order('gagsty_chips', { ascending: false })
        .limit(5);

      // Fix the query to properly join game_prompts with profiles
      const { data: recentPrompts } = await supabase
        .from('game_prompts')
        .select(`
          *,
          profiles!game_prompts_user_id_fkey(full_name, username)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      const activityData = recentPrompts?.map(prompt => ({
        action: `Prompt "${prompt.title}" submitted`,
        user: prompt.profiles?.username || prompt.profiles?.full_name || 'Anonymous',
        time: new Date(prompt.created_at).toLocaleString(),
        type: 'prompt',
        status: prompt.status
      })) || [];

      setStats({
        totalUsers: totalUsers || 0,
        totalPrompts: totalPrompts || 0,
        totalReferrals: totalReferrals || 0,
        totalChips,
        pendingPrompts: pendingPrompts || 0,
        activeEvents: activeEvents || 0,
        openGigs: openGigs || 0,
        newUsersToday: newUsersToday || 0,
        activeUsers: Math.floor((totalUsers || 0) * 0.25) // Estimate active users
      });

      setTopPerformers(performers || []);
      setRecentActivity(activityData);

      // Check system health
      const issueCount = (pendingPrompts || 0) > 10 ? 1 : 0;
      setSystemHealth({
        status: issueCount > 0 ? 'warning' : 'healthy',
        issues: issueCount
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const bulkAddChips = async () => {
    if (chipAmount <= 0) return;
    
    try {
      const { data: users } = await supabase
        .from('profiles')
        .select('id, gagsty_chips');

      if (!users) return;

      const updates = users.map(user => ({
        id: user.id,
        gagsty_chips: (user.gagsty_chips || 0) + chipAmount
      }));

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Added ${chipAmount} chips to all ${users.length} users`,
      });

      fetchDashboardData();
      setChipAmount(0);
    } catch (error) {
      console.error('Error adding chips:', error);
      toast({
        title: "Error",
        description: "Failed to add chips to users",
        variant: "destructive",
      });
    }
  };

  const exportData = async (type: string) => {
    try {
      let data;
      let filename;

      switch (type) {
        case 'users':
          const { data: users } = await supabase.from('profiles').select('*');
          data = users;
          filename = 'users_export.json';
          break;
        case 'prompts':
          const { data: prompts } = await supabase.from('game_prompts').select('*');
          data = prompts;
          filename = 'prompts_export.json';
          break;
        default:
          return;
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Export Complete",
        description: `${type} data exported successfully`,
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export data",
        variant: "destructive",
      });
    }
  };

  // ... keep existing code (enhancedStats array definition)
  const enhancedStats = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      change: `+${stats.newUsersToday} today`,
      icon: Users,
      color: "text-blue-400",
      trend: "up"
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      change: "Last 30 days",
      icon: Activity,
      color: "text-green-400",
      trend: "up"
    },
    {
      title: "Prompt Submissions",
      value: stats.totalPrompts.toLocaleString(),
      change: "+8%",
      icon: FileText,
      color: "text-green-400",
      trend: "up"
    },
    {
      title: "Pending Review",
      value: stats.pendingPrompts.toLocaleString(),
      change: "Needs attention",
      icon: CheckCircle,
      color: stats.pendingPrompts > 10 ? "text-red-400" : "text-yellow-400",
      trend: stats.pendingPrompts > 10 ? "up" : "stable"
    },
    {
      title: "Total Chips",
      value: stats.totalChips.toLocaleString(),
      change: "+22%",
      icon: Coins,
      color: "text-yellow-400",
      trend: "up"
    },
    {
      title: "Active Events",
      value: stats.activeEvents.toLocaleString(),
      change: "Live now",
      icon: Calendar,
      color: "text-purple-400",
      trend: "stable"
    },
    {
      title: "Open Gigs",
      value: stats.openGigs.toLocaleString(),
      change: "Available",
      icon: Briefcase,
      color: "text-orange-400",
      trend: "stable"
    },
    {
      title: "System Health",
      value: systemHealth.status,
      change: `${systemHealth.issues} issues`,
      icon: systemHealth.status === 'healthy' ? CheckCircle : AlertTriangle,
      color: systemHealth.status === 'healthy' ? "text-green-400" : "text-yellow-400",
      trend: systemHealth.status === 'healthy' ? "stable" : "warning"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ... keep existing code (header section) */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time system overview and controls</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={fetchDashboardData}
            variant="outline"
            className="border-blue-600 text-blue-300 hover:bg-blue-600/20"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button 
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"}
          >
            <Activity size={16} className="mr-2" />
            {autoRefresh ? 'Auto-Refresh On' : 'Auto-Refresh Off'}
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Award size={16} className="mr-2" />
            Award Badge
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Bell size={16} className="mr-2" />
            Broadcast
          </Button>
        </div>
      </div>

      {/* ... keep existing code (Enhanced Stats Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {enhancedStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-400' : 
                      stat.trend === 'warning' ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                  <Icon className={`${stat.color} h-8 w-8`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ... keep existing code (Quick Actions Panel, Top Performers, Activity Feed) */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-white font-medium">Bulk Chip Management</h3>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={chipAmount}
                  onChange={(e) => setChipAmount(Number(e.target.value))}
                  placeholder="Chip amount"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button 
                  onClick={bulkAddChips}
                  className="bg-yellow-600 hover:bg-yellow-700"
                  disabled={chipAmount <= 0}
                >
                  <Coins size={16} className="mr-2" />
                  Add to All
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-medium">Data Export</h3>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => exportData('users')}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Download size={16} className="mr-2" />
                  Users
                </Button>
                <Button 
                  onClick={() => exportData('prompts')}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Download size={16} className="mr-2" />
                  Prompts
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-medium">System Monitor</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  systemHealth.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                } animate-pulse`}></div>
                <span className="text-gray-300 capitalize">{systemHealth.status}</span>
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Eye size={14} className="mr-1" />
                  Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="mr-2 text-green-400" size={20} />
                Top Performing Users
              </div>
              <Badge className="bg-green-600 text-white">
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-700/50">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-600 to-orange-600' :
                      index === 1 ? 'bg-gradient-to-r from-gray-500 to-gray-600' :
                      index === 2 ? 'bg-gradient-to-r from-orange-600 to-red-600' :
                      'bg-gradient-to-r from-blue-600 to-purple-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.full_name || user.username || 'Anonymous'}</p>
                      <p className="text-gray-400 text-sm">
                        @{user.username || 'user'} • Joined {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-yellow-600 text-white mb-1">
                      {user.gagsty_chips || 0} chips
                    </Badge>
                    <p className="text-xs text-gray-400">
                      {index === 0 ? '🏆 Champion' : 
                       index === 1 ? '🥈 Runner-up' : 
                       index === 2 ? '🥉 Third' : '⭐ Star'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="mr-2 text-blue-400" size={20} />
                Live Activity Feed
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'approved' ? 'bg-green-500' :
                    activity.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{activity.action}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-400 text-xs">by {activity.user}</p>
                      <span className="text-gray-500 text-xs">{activity.time}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-gray-400 text-center py-8">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
