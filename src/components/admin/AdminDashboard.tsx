
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  UserPlus, 
  Coins, 
  TrendingUp,
  Activity,
  CheckCircle,
  Award,
  Bell
} from 'lucide-react';

const AdminDashboard = () => {
  const dashboardStats = [
    {
      title: "Total Waitlist Signups",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Prompt Submissions",
      value: "1,234",
      change: "+8%",
      icon: FileText,
      color: "text-green-500"
    },
    {
      title: "Referrals Generated",
      value: "856",
      change: "+15%",
      icon: UserPlus,
      color: "text-purple-500"
    },
    {
      title: "Gagsty Chips Distributed",
      value: "45,678",
      change: "+22%",
      icon: Coins,
      color: "text-yellow-500"
    }
  ];

  const topPerformers = [
    { name: "John Smith", referrals: 24, prompts: 8, chips: 2400 },
    { name: "Sarah Johnson", referrals: 19, prompts: 12, chips: 2100 },
    { name: "Mike Chen", referrals: 22, prompts: 6, chips: 1980 },
    { name: "Emma Wilson", referrals: 18, prompts: 9, chips: 1850 },
    { name: "David Brown", referrals: 16, prompts: 11, chips: 1750 }
  ];

  const recentActivity = [
    { action: "New user signup", user: "alex.dev@email.com", time: "2 minutes ago", type: "signup" },
    { action: "Prompt submitted", user: "sarah.j", time: "5 minutes ago", type: "prompt" },
    { action: "Badge earned", user: "mike.chen", time: "12 minutes ago", type: "badge" },
    { action: "Referral completed", user: "emma.w", time: "18 minutes ago", type: "referral" },
    { action: "Chips claimed", user: "david.b", time: "25 minutes ago", type: "chips" }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'signup': return <Users size={16} className="text-blue-500" />;
      case 'prompt': return <FileText size={16} className="text-green-500" />;
      case 'badge': return <Award size={16} className="text-purple-500" />;
      case 'referral': return <UserPlus size={16} className="text-orange-500" />;
      case 'chips': return <Coins size={16} className="text-yellow-500" />;
      default: return <Activity size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <CheckCircle size={16} className="mr-2" />
            Approve Pending
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-green-500 text-sm font-medium">{stat.change}</p>
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
              <TrendingUp className="mr-2 text-green-500" size={20} />
              Top Performing Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">
                        {user.referrals} referrals • {user.prompts} prompts
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-600 text-white">
                    {user.chips} chips
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
              <Activity className="mr-2 text-blue-500" size={20} />
              Recent Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-xs">by {activity.user}</p>
                  </div>
                  <span className="text-gray-500 text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
