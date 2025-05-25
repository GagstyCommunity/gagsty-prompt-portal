
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Bell, 
  Send, 
  Calendar, 
  Mail, 
  Users, 
  User,
  Eye,
  Clock,
  CheckCircle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminNotifications = () => {
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    recipient: 'all',
    badgeFilter: '',
    deliveryMethod: 'platform',
    scheduleDate: '',
    scheduleTime: ''
  });

  const [notificationLog, setNotificationLog] = useState([
    {
      id: 1,
      title: 'Welcome to Beta Phase!',
      recipients: 'All Users',
      delivered: 2847,
      opened: 1923,
      deliveryMethod: 'Email + Platform',
      sentAt: '2024-01-15 14:30',
      status: 'delivered'
    },
    {
      id: 2,
      title: 'New Prompt Contest Started',
      recipients: 'Fighter Badge',
      delivered: 856,
      opened: 623,
      deliveryMethod: 'Platform',
      sentAt: '2024-01-14 10:15',
      status: 'delivered'
    },
    {
      id: 3,
      title: 'Event Reminder: AI Gaming Summit',
      recipients: 'All Users',
      delivered: 0,
      opened: 0,
      deliveryMethod: 'Email',
      sentAt: '2024-01-16 09:00',
      status: 'scheduled'
    }
  ]);

  const handleSendNotification = async () => {
    if (!notificationForm.title || !notificationForm.message) {
      toast({
        title: "Error",
        description: "Please fill in title and message.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Here you would integrate with your notification system
      const newNotification = {
        id: Date.now(),
        title: notificationForm.title,
        recipients: notificationForm.recipient === 'all' ? 'All Users' : notificationForm.badgeFilter || 'Individual',
        delivered: notificationForm.recipient === 'all' ? 2847 : 856,
        opened: 0,
        deliveryMethod: notificationForm.deliveryMethod === 'platform' ? 'Platform' : 
                       notificationForm.deliveryMethod === 'email' ? 'Email' : 'Email + Platform',
        sentAt: notificationForm.scheduleDate ? 
                `${notificationForm.scheduleDate} ${notificationForm.scheduleTime}` : 
                new Date().toLocaleString(),
        status: notificationForm.scheduleDate ? 'scheduled' : 'delivered'
      };

      setNotificationLog(prev => [newNotification, ...prev]);
      
      setNotificationForm({
        title: '',
        message: '',
        recipient: 'all',
        badgeFilter: '',
        deliveryMethod: 'platform',
        scheduleDate: '',
        scheduleTime: ''
      });

      toast({
        title: "Notification Sent",
        description: notificationForm.scheduleDate ? 
                    "Notification scheduled successfully." : 
                    "Notification sent successfully.",
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      toast({
        title: "Error",
        description: "Failed to send notification.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-600';
      case 'scheduled': return 'bg-blue-600';
      case 'failed': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getOpenRate = (delivered: number, opened: number) => {
    if (delivered === 0) return 0;
    return Math.round((opened / delivered) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Notifications & Announcements</h1>
      </div>

      {/* Send Notification Form */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Send className="mr-2 text-blue-500" size={20} />
            Send Notification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <Input
                value={notificationForm.title}
                onChange={(e) => setNotificationForm({...notificationForm, title: e.target.value})}
                placeholder="Notification title..."
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Recipients
              </label>
              <select
                value={notificationForm.recipient}
                onChange={(e) => setNotificationForm({...notificationForm, recipient: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              >
                <option value="all">All Users</option>
                <option value="badge">By Badge</option>
                <option value="individual">Individual User</option>
              </select>
            </div>
          </div>

          {notificationForm.recipient === 'badge' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Badge Filter
              </label>
              <select
                value={notificationForm.badgeFilter}
                onChange={(e) => setNotificationForm({...notificationForm, badgeFilter: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              >
                <option value="">Select Badge</option>
                <option value="Beginner">Beginner Badge</option>
                <option value="Fighter">Fighter Badge</option>
                <option value="Hero">Hero Badge</option>
                <option value="Affiliate">Affiliate Badge</option>
                <option value="Moderator">Moderator Badge</option>
                <option value="Tester">Tester Badge</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <Textarea
              value={notificationForm.message}
              onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
              placeholder="Your notification message..."
              className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Delivery Method
              </label>
              <select
                value={notificationForm.deliveryMethod}
                onChange={(e) => setNotificationForm({...notificationForm, deliveryMethod: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              >
                <option value="platform">Platform Only</option>
                <option value="email">Email Only</option>
                <option value="both">Email + Platform</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Schedule Date (Optional)
              </label>
              <Input
                type="date"
                value={notificationForm.scheduleDate}
                onChange={(e) => setNotificationForm({...notificationForm, scheduleDate: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Schedule Time (Optional)
              </label>
              <Input
                type="time"
                value={notificationForm.scheduleTime}
                onChange={(e) => setNotificationForm({...notificationForm, scheduleTime: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <Button onClick={handleSendNotification} className="bg-blue-600 hover:bg-blue-700">
            {notificationForm.scheduleDate ? (
              <>
                <Calendar size={16} className="mr-2" />
                Schedule Notification
              </>
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Send Now
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Notification Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <Bell className="text-blue-500 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">47</p>
            <p className="text-gray-400 text-sm">Total Sent</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <CheckCircle className="text-green-500 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">98.5%</p>
            <p className="text-gray-400 text-sm">Delivery Rate</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <Eye className="text-purple-500 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">67.8%</p>
            <p className="text-gray-400 text-sm">Open Rate</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <Clock className="text-orange-500 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-gray-400 text-sm">Scheduled</p>
          </CardContent>
        </Card>
      </div>

      {/* Notification Log */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Notification History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Title</TableHead>
                <TableHead className="text-gray-300">Recipients</TableHead>
                <TableHead className="text-gray-300">Delivered</TableHead>
                <TableHead className="text-gray-300">Opened</TableHead>
                <TableHead className="text-gray-300">Open Rate</TableHead>
                <TableHead className="text-gray-300">Method</TableHead>
                <TableHead className="text-gray-300">Sent At</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notificationLog.map((notification) => (
                <TableRow key={notification.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">{notification.title}</TableCell>
                  <TableCell className="text-gray-300">{notification.recipients}</TableCell>
                  <TableCell className="text-gray-300">{notification.delivered}</TableCell>
                  <TableCell className="text-gray-300">{notification.opened}</TableCell>
                  <TableCell className="text-gray-300">
                    {getOpenRate(notification.delivered, notification.opened)}%
                  </TableCell>
                  <TableCell className="text-gray-300">{notification.deliveryMethod}</TableCell>
                  <TableCell className="text-gray-300">{notification.sentAt}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(notification.status)} text-white`}>
                      {notification.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNotifications;
