
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Calendar, TrendingUp, MapPin, Award } from 'lucide-react';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');

  const signupData = [
    { name: 'Mon', signups: 24 },
    { name: 'Tue', signups: 31 },
    { name: 'Wed', signups: 42 },
    { name: 'Thu', signups: 38 },
    { name: 'Fri', signups: 55 },
    { name: 'Sat', signups: 49 },
    { name: 'Sun', signups: 34 }
  ];

  const socialShareData = [
    { name: 'Twitter', value: 35, color: '#1DA1F2' },
    { name: 'Telegram', value: 28, color: '#0088CC' },
    { name: 'WhatsApp', value: 22, color: '#25D366' },
    { name: 'Email', value: 15, color: '#EA4335' }
  ];

  const badgeStats = [
    { name: 'Beginner', earned: 1247, color: 'bg-green-600' },
    { name: 'Fighter', earned: 856, color: 'bg-blue-600' },
    { name: 'Hero', earned: 423, color: 'bg-purple-600' },
    { name: 'Affiliate', earned: 189, color: 'bg-orange-600' },
    { name: 'Moderator', earned: 45, color: 'bg-red-600' },
    { name: 'Tester', earned: 23, color: 'bg-yellow-600' }
  ];

  const topReferrers = [
    { name: 'John Smith', referrals: 45, region: 'US' },
    { name: 'Sarah Johnson', referrals: 38, region: 'UK' },
    { name: 'Mike Chen', referrals: 34, region: 'CA' },
    { name: 'Emma Wilson', referrals: 29, region: 'AU' },
    { name: 'David Brown', referrals: 26, region: 'DE' }
  ];

  const regionData = [
    { region: 'North America', users: 1247, percentage: 34 },
    { region: 'Europe', users: 965, percentage: 26 },
    { region: 'Asia', users: 823, percentage: 22 },
    { region: 'South America', users: 421, percentage: 11 },
    { region: 'Others', users: 287, percentage: 7 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Analytics & Reporting</h1>
        <div className="flex space-x-2">
          <Button
            variant={timeRange === 'day' ? 'default' : 'outline'}
            onClick={() => setTimeRange('day')}
            className="text-white border-gray-600"
          >
            Day
          </Button>
          <Button
            variant={timeRange === 'week' ? 'default' : 'outline'}
            onClick={() => setTimeRange('week')}
            className="text-white border-gray-600"
          >
            Week
          </Button>
          <Button
            variant={timeRange === 'month' ? 'default' : 'outline'}
            onClick={() => setTimeRange('month')}
            className="text-white border-gray-600"
          >
            Month
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Signup Trends */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="mr-2 text-blue-500" size={20} />
            Signup Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={signupData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="signups" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Social Share Channels */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Most Used Share Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={socialShareData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {socialShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Referrers */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Top Referring Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topReferrers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {user.region}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-orange-600 text-white">
                    {user.referrals} referrals
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Distribution */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MapPin className="mr-2 text-green-500" size={20} />
            Regional User Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {regionData.map((region, index) => (
              <div key={index} className="text-center p-4 bg-gray-800/50 rounded-lg">
                <h3 className="text-white font-medium text-sm mb-2">{region.region}</h3>
                <p className="text-2xl font-bold text-blue-500">{region.users}</p>
                <p className="text-gray-400 text-sm">{region.percentage}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badge Statistics */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Award className="mr-2 text-yellow-500" size={20} />
            Badge Earned Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badgeStats.map((badge, index) => (
              <div key={index} className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className={`w-12 h-12 ${badge.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                  <Award className="text-white" size={20} />
                </div>
                <h3 className="text-white font-medium text-sm mb-1">{badge.name}</h3>
                <p className="text-lg font-bold text-white">{badge.earned}</p>
                <p className="text-gray-400 text-xs">earned</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
