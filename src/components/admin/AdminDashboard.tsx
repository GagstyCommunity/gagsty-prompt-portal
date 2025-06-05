import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Briefcase
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrompts: 0,
    totalReferrals: 0,
    totalChips: 0,
    pendingPrompts: 0,
    activeEvents: 0,
    openGigs: 0
  });
  const [topPerformers, setTopPerformers] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats
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

      // Calculate total chips
      const { data: chipsData } = await supabase
        .from('profiles')
        .select('gagsty_chips');
      
      const totalChips = chipsData?.reduce((sum, profile) => sum + (profile.gagsty_chips || 0), 0) || 0;

      // Fetch top performers
      const { data: performers } = await supabase
        .from('profiles')
        .select('id, full_name, username, gagsty_chips')
        .order('gagsty_chips', { ascending: false })
        .limit(5);

      // Fetch recent prompts and then get user data separately
      const { data: recentPrompts } = await supabase
        .from('game_prompts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // Get user profiles for the recent prompts
      const activityData = [];
      if (recentPrompts) {
        for (const prompt of recentPrompts) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, username')
            .eq('id', prompt.user_id)
            .single();
          
          activityData.push({
            action: 'Prompt submitted',
            user: profile?.username || profile?.full_name || 'Anonymous',
            time: new Date(prompt.created_at).toLocaleString(),
            type: 'prompt'
          });
        }
      }

      setStats({
        totalUsers: totalUsers || 0,
        totalPrompts: totalPrompts || 0,
        totalReferrals: totalReferrals || 0,
        totalChips,
        pendingPrompts: pendingPrompts || 0,
        activeEvents: activeEvents || 0,
        openGigs: openGigs || 0
      });

      setTopPerformers(performers || []);
      setRecentActivity(activityData);

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

  const dashboardStats = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      change: "+12%",
      icon: Users,
      color: "text-blue-400"
    },
    {
      title: "Prompt Submissions",
      value: stats.totalPrompts.toLocaleString(),
      change: "+8%",
      icon: FileText,
      color: "text-green-400"
    },
    {
      title: "Pending Prompts",
      value: stats.pendingPrompts.toLocaleString(),
      change: "Review needed",
      icon: CheckCircle,
      color: "text-yellow-400"
    },
    {
      title: "Total Chips Distributed",
      value: stats.totalChips.toLocaleString(),
      change: "+22%",
      icon: Coins,
      color: "text-yellow-400"
    },
    {
      title: "Active Events",
      value: stats.activeEvents.toLocaleString(),
      change: "Live now",
      icon: Calendar,
      color: "text-purple-400"
    },
    {
      title: "Open Gigs",
      value: stats.openGigs.toLocaleString(),
      change: "Available",
      icon: Briefcase,
      color: "text-orange-400"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'signup': return <Users size={16} className="text-blue-400" />;
      case 'prompt': return <FileText size={16} className="text-green-400" />;
      case 'badge': return <Award size={16} className="text-purple-400" />;
      case 'referral': return <UserPlus size={16} className="text-orange-400" />;
      case 'chips': return <Coins size={16} className="text-yellow-400" />;
      default: return <Activity size={16} className="text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <Button 
            onClick={fetchDashboardData}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Activity size={16} className="mr-2" />
            Refresh Data
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Award size={16} className="mr-2" />
            Award Badge
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Bell size={16} className="mr-2" />
            Send Notification
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-green-400 text-sm font-medium">{stat.change}</p>
                  </div>
                  <Icon className={`${stat.color} h-8 w-8`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="mr-2 text-green-400" size={20} />
              Top Performing Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.full_name || user.username || 'Anonymous'}</p>
                      <p className="text-gray-400 text-sm">
                        @{user.username || 'user'}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-600 text-white">
                    {user.gagsty_chips || 0} chips
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="mr-2 text-blue-400" size={20} />
              Recent Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-xs">by {activity.user}</p>
                  </div>
                  <span className="text-gray-500 text-xs">{activity.time}</span>
                </div>
              )) : (
                <p className="text-gray-400 text-center py-4">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
