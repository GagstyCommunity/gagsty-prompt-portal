
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  UserPlus, 
  Settings, 
  Ban, 
  Shield,
  TrendingUp,
  Link,
  Eye,
  Users
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminReferrals = () => {
  const [referralSettings, setReferralSettings] = useState({
    coinsPerSignup: 100,
    coinsPerReferral: 50,
    maxDailyReferrals: 10,
    abuseDetectionEnabled: true,
    blacklistDomains: 'tempmail.com, guerrillamail.com'
  });

  const [referralData, setReferralData] = useState([
    {
      id: 1,
      userName: 'John Smith',
      referralCode: 'JOHN2024',
      totalReferrals: 45,
      successfulSignups: 42,
      coinsEarned: 4200,
      status: 'active',
      createdAt: '2024-01-10',
      lastActivity: '2024-01-15'
    },
    {
      id: 2,
      userName: 'Sarah Johnson',
      referralCode: 'SARAH123',
      totalReferrals: 38,
      successfulSignups: 35,
      coinsEarned: 3500,
      status: 'active',
      createdAt: '2024-01-08',
      lastActivity: '2024-01-14'
    },
    {
      id: 3,
      userName: 'Mike Chen',
      referralCode: 'MIKE999',
      totalReferrals: 89,
      successfulSignups: 12,
      coinsEarned: 1200,
      status: 'flagged',
      createdAt: '2024-01-05',
      lastActivity: '2024-01-12'
    }
  ]);

  const [customCodeForm, setCustomCodeForm] = useState({
    code: '',
    userId: '',
    expiryDate: ''
  });

  const updateReferralSettings = async () => {
    try {
      // Update referral settings in database
      toast({
        title: "Settings Updated",
        description: "Referral settings have been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update referral settings.",
        variant: "destructive",
      });
    }
  };

  const flagUser = async (userId: number) => {
    try {
      setReferralData(prev => 
        prev.map(user => 
          user.id === userId ? { ...user, status: 'flagged' } : user
        )
      );
      toast({
        title: "User Flagged",
        description: "User has been flagged for suspicious activity.",
      });
    } catch (error) {
      console.error('Error flagging user:', error);
    }
  };

  const unflagUser = async (userId: number) => {
    try {
      setReferralData(prev => 
        prev.map(user => 
          user.id === userId ? { ...user, status: 'active' } : user
        )
      );
      toast({
        title: "User Unflagged",
        description: "User has been restored to active status.",
      });
    } catch (error) {
      console.error('Error unflagging user:', error);
    }
  };

  const blacklistUser = async (userId: number) => {
    try {
      setReferralData(prev => 
        prev.map(user => 
          user.id === userId ? { ...user, status: 'blacklisted' } : user
        )
      );
      toast({
        title: "User Blacklisted",
        description: "User has been blacklisted from the referral program.",
      });
    } catch (error) {
      console.error('Error blacklisting user:', error);
    }
  };

  const createCustomCode = async () => {
    if (!customCodeForm.code || !customCodeForm.userId) {
      toast({
        title: "Error",
        description: "Please fill in code and user ID.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create custom referral code
      toast({
        title: "Custom Code Created",
        description: `Custom referral code "${customCodeForm.code}" has been created.`,
      });
      
      setCustomCodeForm({ code: '', userId: '', expiryDate: '' });
    } catch (error) {
      console.error('Error creating custom code:', error);
      toast({
        title: "Error",
        description: "Failed to create custom referral code.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'flagged': return 'bg-yellow-600';
      case 'blacklisted': return 'bg-red-600';
      case 'suspended': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getConversionRate = (total: number, successful: number) => {
    if (total === 0) return 0;
    return Math.round((successful / total) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Referral & Affiliate Management</h1>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <UserPlus className="text-blue-500 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">856</p>
            <p className="text-gray-400 text-sm">Total Referrals</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <Users className="text-green-500 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">723</p>
            <p className="text-gray-400 text-sm">Successful Signups</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <TrendingUp className="text-purple-500 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">84.5%</p>
            <p className="text-gray-400 text-sm">Conversion Rate</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <Shield className="text-red-500 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-gray-400 text-sm">Flagged Users</p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Settings */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="mr-2 text-blue-500" size={20} />
            Global Referral Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Coins per Signup
              </label>
              <Input
                type="number"
                value={referralSettings.coinsPerSignup}
                onChange={(e) => setReferralSettings({
                  ...referralSettings,
                  coinsPerSignup: Number(e.target.value)
                })}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Coins per Referral
              </label>
              <Input
                type="number"
                value={referralSettings.coinsPerReferral}
                onChange={(e) => setReferralSettings({
                  ...referralSettings,
                  coinsPerReferral: Number(e.target.value)
                })}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Max Daily Referrals
              </label>
              <Input
                type="number"
                value={referralSettings.maxDailyReferrals}
                onChange={(e) => setReferralSettings({
                  ...referralSettings,
                  maxDailyReferrals: Number(e.target.value)
                })}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Blacklisted Domains
            </label>
            <Input
              value={referralSettings.blacklistDomains}
              onChange={(e) => setReferralSettings({
                ...referralSettings,
                blacklistDomains: e.target.value
              })}
              placeholder="domain1.com, domain2.com"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={referralSettings.abuseDetectionEnabled}
              onChange={(e) => setReferralSettings({
                ...referralSettings,
                abuseDetectionEnabled: e.target.checked
              })}
              className="rounded"
            />
            <label className="text-gray-300">Enable abuse detection</label>
          </div>
          <Button onClick={updateReferralSettings} className="bg-blue-600 hover:bg-blue-700">
            Update Settings
          </Button>
        </CardContent>
      </Card>

      {/* Custom Referral Code Creation */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Link className="mr-2 text-green-500" size={20} />
            Create Custom Referral Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Custom Code
              </label>
              <Input
                value={customCodeForm.code}
                onChange={(e) => setCustomCodeForm({...customCodeForm, code: e.target.value})}
                placeholder="PARTNER2024"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                User ID
              </label>
              <Input
                value={customCodeForm.userId}
                onChange={(e) => setCustomCodeForm({...customCodeForm, userId: e.target.value})}
                placeholder="User ID or email"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Expiry Date (Optional)
              </label>
              <Input
                type="date"
                value={customCodeForm.expiryDate}
                onChange={(e) => setCustomCodeForm({...customCodeForm, expiryDate: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <Button onClick={createCustomCode} className="bg-green-600 hover:bg-green-700">
            Create Custom Code
          </Button>
        </CardContent>
      </Card>

      {/* Referral Users Table */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Referral Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">User</TableHead>
                <TableHead className="text-gray-300">Code</TableHead>
                <TableHead className="text-gray-300">Total</TableHead>
                <TableHead className="text-gray-300">Successful</TableHead>
                <TableHead className="text-gray-300">Rate</TableHead>
                <TableHead className="text-gray-300">Coins</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referralData.map((user) => (
                <TableRow key={user.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">{user.userName}</TableCell>
                  <TableCell className="text-gray-300 font-mono">{user.referralCode}</TableCell>
                  <TableCell className="text-gray-300">{user.totalReferrals}</TableCell>
                  <TableCell className="text-gray-300">{user.successfulSignups}</TableCell>
                  <TableCell className="text-gray-300">
                    {getConversionRate(user.totalReferrals, user.successfulSignups)}%
                  </TableCell>
                  <TableCell className="text-yellow-500 font-bold">{user.coinsEarned}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(user.status)} text-white`}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => flagUser(user.id)}
                        size="sm"
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        <Eye size={14} />
                      </Button>
                      {user.status === 'flagged' ? (
                        <Button
                          onClick={() => unflagUser(user.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Shield size={14} />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => blacklistUser(user.id)}
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Ban size={14} />
                        </Button>
                      )}
                    </div>
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

export default AdminReferrals;
