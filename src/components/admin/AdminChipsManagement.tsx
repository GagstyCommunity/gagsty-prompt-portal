
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Coins, 
  Settings, 
  Download, 
  Lock, 
  Unlock,
  TrendingUp,
  UserPlus,
  FileText,
  Vote
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminChipsManagement = () => {
  const [globalSettings, setGlobalSettings] = useState({
    referralReward: 100,
    promptReward: 50,
    votingReward: 10,
    dailyLimit: 500,
    streakBonus: 25
  });
  const [distributionLog, setDistributionLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDistributionLog();
  }, []);

  const fetchDistributionLog = async () => {
    setLoading(true);
    try {
      // This would fetch from a chips_distribution_log table
      // For now, using mock data
      const mockLog = [
        {
          id: 1,
          user_name: 'John Smith',
          type: 'referral',
          amount: 100,
          reason: 'Successful referral: sarah.johnson@email.com',
          created_at: new Date().toISOString(),
          status: 'completed'
        },
        {
          id: 2,
          user_name: 'Sarah Johnson',
          type: 'prompt',
          amount: 75,
          reason: 'Approved prompt: "Fantasy RPG with AI companions"',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          status: 'completed'
        },
        {
          id: 3,
          user_name: 'Mike Chen',
          type: 'voting',
          amount: 10,
          reason: 'Daily voting participation',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          status: 'completed'
        },
        {
          id: 4,
          user_name: 'Emma Wilson',
          type: 'streak',
          amount: 25,
          reason: '7-day login streak bonus',
          created_at: new Date(Date.now() - 259200000).toISOString(),
          status: 'completed'
        },
        {
          id: 5,
          user_name: 'David Brown',
          type: 'manual',
          amount: 200,
          reason: 'Community contribution bonus',
          created_at: new Date(Date.now() - 345600000).toISOString(),
          status: 'locked'
        }
      ];
      setDistributionLog(mockLog);
    } catch (error) {
      console.error('Error fetching distribution log:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateGlobalSettings = async () => {
    try {
      // This would update global settings in the database
      toast({
        title: "Settings Updated",
        description: "Global chip settings have been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings.",
        variant: "destructive",
      });
    }
  };

  const lockChips = async (logId: number) => {
    try {
      // Update the log entry status to locked
      setDistributionLog(prev => 
        prev.map(entry => 
          entry.id === logId ? { ...entry, status: 'locked' } : entry
        )
      );
      toast({
        title: "Chips Locked",
        description: "Chips have been locked for misuse.",
      });
    } catch (error) {
      console.error('Error locking chips:', error);
    }
  };

  const unlockChips = async (logId: number) => {
    try {
      setDistributionLog(prev => 
        prev.map(entry => 
          entry.id === logId ? { ...entry, status: 'completed' } : entry
        )
      );
      toast({
        title: "Chips Unlocked",
        description: "Chips have been unlocked successfully.",
      });
    } catch (error) {
      console.error('Error unlocking chips:', error);
    }
  };

  const exportLog = () => {
    const csv = [
      ['User', 'Type', 'Amount', 'Reason', 'Date', 'Status'],
      ...distributionLog.map(entry => [
        entry.user_name,
        entry.type,
        entry.amount,
        entry.reason,
        new Date(entry.created_at).toLocaleDateString(),
        entry.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chips_distribution_log.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'referral': return <UserPlus size={16} className="text-blue-500" />;
      case 'prompt': return <FileText size={16} className="text-green-500" />;
      case 'voting': return <Vote size={16} className="text-purple-500" />;
      case 'streak': return <TrendingUp size={16} className="text-orange-500" />;
      case 'manual': return <Settings size={16} className="text-gray-500" />;
      default: return <Coins size={16} className="text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'locked': return 'bg-red-600';
      case 'pending': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Gagsty Chips Management</h1>
        <Button onClick={exportLog} className="bg-green-600 hover:bg-green-700">
          <Download size={16} className="mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Global Settings */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="mr-2 text-blue-500" size={20} />
            Global Chip Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Referral Reward
              </label>
              <Input
                type="number"
                value={globalSettings.referralReward}
                onChange={(e) => setGlobalSettings({
                  ...globalSettings,
                  referralReward: Number(e.target.value)
                })}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prompt Reward
              </label>
              <Input
                type="number"
                value={globalSettings.promptReward}
                onChange={(e) => setGlobalSettings({
                  ...globalSettings,
                  promptReward: Number(e.target.value)
                })}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Voting Reward
              </label>
              <Input
                type="number"
                value={globalSettings.votingReward}
                onChange={(e) => setGlobalSettings({
                  ...globalSettings,
                  votingReward: Number(e.target.value)
                })}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Daily Limit
              </label>
              <Input
                type="number"
                value={globalSettings.dailyLimit}
                onChange={(e) => setGlobalSettings({
                  ...globalSettings,
                  dailyLimit: Number(e.target.value)
                })}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Streak Bonus
              </label>
              <Input
                type="number"
                value={globalSettings.streakBonus}
                onChange={(e) => setGlobalSettings({
                  ...globalSettings,
                  streakBonus: Number(e.target.value)
                })}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <Button onClick={updateGlobalSettings} className="bg-blue-600 hover:bg-blue-700">
            Update Settings
          </Button>
        </CardContent>
      </Card>

      {/* Distribution Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <Coins className="text-yellow-500 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">45,678</p>
            <p className="text-gray-400 text-sm">Total Distributed</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <UserPlus className="text-blue-500 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">12,340</p>
            <p className="text-gray-400 text-sm">Via Referrals</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <FileText className="text-green-500 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">8,567</p>
            <p className="text-gray-400 text-sm">Via Prompts</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <Lock className="text-red-500 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">234</p>
            <p className="text-gray-400 text-sm">Locked/Withdrawn</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Log */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Distribution Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">User</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Amount</TableHead>
                <TableHead className="text-gray-300">Reason</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {distributionLog.map((entry) => (
                <TableRow key={entry.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">{entry.user_name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(entry.type)}
                      <span className="text-gray-300 capitalize">{entry.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-yellow-500 font-bold">+{entry.amount}</TableCell>
                  <TableCell className="text-gray-300 max-w-xs truncate">{entry.reason}</TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(entry.status)} text-white`}>
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {entry.status === 'completed' ? (
                        <Button
                          onClick={() => lockChips(entry.id)}
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Lock size={14} />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => unlockChips(entry.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Unlock size={14} />
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

export default AdminChipsManagement;
