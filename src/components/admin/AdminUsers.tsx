
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newRole, setNewRole] = useState('user');
  const [chipAdjustment, setChipAdjustment] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles!inner(role)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, role: 'user' | 'moderator' | 'admin') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Role Updated",
        description: `User role updated to ${role}.`,
      });

      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role.",
        variant: "destructive",
      });
    }
  };

  const adjustUserChips = async (userId: string, amount: number) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const newAmount = Math.max(0, user.gagsty_chips + amount);

      const { error } = await supabase
        .from('profiles')
        .update({ gagsty_chips: newAmount })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Chips Updated",
        description: `User chips adjusted by ${amount}.`,
      });

      fetchUsers();
      setChipAdjustment(0);
    } catch (error) {
      console.error('Error adjusting chips:', error);
      toast({
        title: "Error",
        description: "Failed to adjust user chips.",
        variant: "destructive",
      });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'moderator': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div className="text-white">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Users & Moderators</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Username</TableHead>
                <TableHead className="text-gray-300">Role</TableHead>
                <TableHead className="text-gray-300">G-Chips</TableHead>
                <TableHead className="text-gray-300">Joined</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">
                    {user.full_name || 'Anonymous'}
                  </TableCell>
                  <TableCell className="text-gray-300">{user.username || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge className={`${getRoleColor(user.user_roles?.[0]?.role)} text-white`}>
                      {user.user_roles?.[0]?.role?.toUpperCase() || 'USER'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-yellow-500">{user.gagsty_chips}</TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => setSelectedUser(user)}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedUser && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">
              Manage User: {selectedUser.full_name || 'Anonymous'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Update Role
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              >
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
              <Button
                onClick={() => updateUserRole(selectedUser.id, newRole as 'user' | 'moderator' | 'admin')}
                className="mt-2 bg-blue-600 hover:bg-blue-700"
              >
                Update Role
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Adjust Chips (Current: {selectedUser.gagsty_chips})
              </label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={chipAdjustment}
                  onChange={(e) => setChipAdjustment(Number(e.target.value))}
                  placeholder="Amount to add/subtract"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button
                  onClick={() => adjustUserChips(selectedUser.id, chipAdjustment)}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  Adjust
                </Button>
              </div>
            </div>

            <Button
              onClick={() => setSelectedUser(null)}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminUsers;
