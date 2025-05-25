
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Check, 
  X, 
  Settings, 
  Mail,
  MessageSquare,
  Trophy,
  Coins,
  Users,
  Lightbulb,
  Gift,
  AlertTriangle
} from 'lucide-react';

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'achievement',
      title: 'New Badge Earned!',
      message: 'Congratulations! You\'ve earned the "Game Innovator" badge for submitting 5 creative prompts.',
      timestamp: '2 minutes ago',
      read: false,
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      id: 2,
      type: 'chips',
      title: 'G-Chips Reward',
      message: 'You received 100 G-Chips for completing your profile! Keep earning more.',
      timestamp: '1 hour ago',
      read: false,
      icon: Coins,
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'referral',
      title: 'Friend Joined!',
      message: 'Your friend Sarah has joined using your referral link. You both earned bonus chips!',
      timestamp: '3 hours ago',
      read: true,
      icon: Users,
      color: 'text-blue-500'
    },
    {
      id: 4,
      type: 'prompt',
      title: 'Prompt Status Update',
      message: 'Your game idea "Quantum Puzzle Adventure" has been approved and is now in development!',
      timestamp: '1 day ago',
      read: true,
      icon: Lightbulb,
      color: 'text-purple-500'
    },
    {
      id: 5,
      type: 'event',
      title: 'New Event Available',
      message: 'Winter Game Jam 2024 is now open for registration. Join now to compete for 10,000 G-Chips!',
      timestamp: '2 days ago',
      read: false,
      icon: Gift,
      color: 'text-orange-500'
    },
    {
      id: 6,
      type: 'system',
      title: 'Maintenance Notice',
      message: 'Scheduled maintenance on January 30th from 2-4 AM UTC. Services may be temporarily unavailable.',
      timestamp: '3 days ago',
      read: true,
      icon: AlertTriangle,
      color: 'text-red-500'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const notificationStats = [
    { label: 'Total', value: notifications.length, color: 'text-blue-500' },
    { label: 'Unread', value: notifications.filter(n => !n.read).length, color: 'text-red-500' },
    { label: 'Today', value: notifications.filter(n => n.timestamp.includes('hour') || n.timestamp.includes('minute')).length, color: 'text-green-500' },
    { label: 'This Week', value: notifications.filter(n => n.timestamp.includes('day')).length, color: 'text-purple-500' }
  ];

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'achievement': return 'Achievement';
      case 'chips': return 'G-Chips';
      case 'referral': return 'Referral';
      case 'prompt': return 'Prompt';
      case 'event': return 'Event';
      case 'system': return 'System';
      default: return 'Other';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'bg-yellow-600';
      case 'chips': return 'bg-green-600';
      case 'referral': return 'bg-blue-600';
      case 'prompt': return 'bg-purple-600';
      case 'event': return 'bg-orange-600';
      case 'system': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Notifications</h1>
        <div className="flex space-x-2">
          <Button 
            onClick={markAllAsRead}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <Check className="mr-2" size={16} />
            Mark All Read
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Settings className="mr-2" size={16} />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {notificationStats.map((stat, index) => (
          <Card key={index} className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: 'Unread' },
          { key: 'achievement', label: 'Achievements' },
          { key: 'chips', label: 'G-Chips' },
          { key: 'referral', label: 'Referrals' },
          { key: 'prompt', label: 'Prompts' },
          { key: 'event', label: 'Events' },
          { key: 'system', label: 'System' }
        ].map((filterOption) => (
          <Button
            key={filterOption.key}
            variant={filter === filterOption.key ? 'default' : 'outline'}
            onClick={() => setFilter(filterOption.key)}
            className={filter === filterOption.key 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'border-gray-600 text-gray-300 hover:bg-gray-800'
            }
          >
            {filterOption.label}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="text-center py-12">
              <Bell className="mx-auto text-gray-500 mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">No Notifications</h3>
              <p className="text-gray-400">
                {filter === 'all' ? 'You\'re all caught up!' : `No ${filter} notifications found.`}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card 
                key={notification.id} 
                className={`bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all ${
                  !notification.read ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                        <Icon className="text-white" size={20} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-white font-semibold">{notification.title}</h3>
                          <Badge className={`${getTypeColor(notification.type)} text-white text-xs`}>
                            {getTypeLabel(notification.type)}
                          </Badge>
                          {!notification.read && (
                            <Badge className="bg-blue-600 text-white text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-300 mb-2">{notification.message}</p>
                        <span className="text-gray-500 text-sm">{notification.timestamp}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsRead(notification.id)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          <Check size={14} />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteNotification(notification.id)}
                        className="border-gray-600 text-gray-300 hover:bg-red-800"
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Notification Preferences */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="mr-2" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-3">Email Notifications</h3>
              <div className="space-y-2">
                {[
                  'Badge achievements',
                  'G-Chip rewards',
                  'Prompt status updates',
                  'New events',
                  'Referral activities'
                ].map((item, index) => (
                  <label key={index} className="flex items-center space-x-2 text-gray-300">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-3">Push Notifications</h3>
              <div className="space-y-2">
                {[
                  'Instant badge notifications',
                  'Daily chip summary',
                  'Weekly progress report',
                  'Friend activities',
                  'System updates'
                ].map((item, index) => (
                  <label key={index} className="flex items-center space-x-2 text-gray-300">
                    <input type="checkbox" defaultChecked={index < 3} className="rounded" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
