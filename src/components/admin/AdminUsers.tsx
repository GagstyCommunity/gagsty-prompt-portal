
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { User, Shield, Edit, Coins } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [chipAmount, setChipAmount] = useState(0);
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
          user_roles(role)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      // First, delete existing role
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Then insert new role
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: newRole
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `User role updated to ${newRole}.`,
      });

      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
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
      const newChipAmount = user.gagsty_chips + amount;

      const { error } = await supabase
        .from('profiles')
        .update({ gagsty_chips: newChipAmount })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${amount > 0 ? 'Added' : 'Removed'} ${Math.abs(amount)} chips.`,
      });

      setChipAmount(0);
      fetchUsers();
    } catch (error) {
      console.error('Error adjusting chips:', error);
      toast({
        title: "Error",
        description: "Failed to adjust chips.",
        variant: "destructive",
      });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'moderator': return 'bg-purple-500';
      default: return 'bg-blue-500';
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
              <TableRow>
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
                <TableRow key={user.id}>
                  <TableCell className="text-white font-medium">
                    {user.full_name || 'No name'}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {user.username || 'No username'}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getRoleColor(user.user_roles?.[0]?.role || 'user')} text-white`}>
                      {user.user_roles?.[0]?.role || 'user'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-yellow-500 font-medium">
                    {user.gagsty_chips}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedUser(user)}
                      className="text-white border-gray-600 hover:bg-gray-800"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Edit Modal */}
      {selectedUser && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">
              Edit User: {selectedUser.full_name || selectedUser.username}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-3">Change Role</h3>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => updateUserRole(selectedUser.id, 'user')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <User size={16} className="mr-1" />
                  User
                </Button>
                <Button
                  size="sm"
                  onClick={() => updateUserRole(selectedUser.id, 'moderator')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Shield size={16} className="mr-1" />
                  Moderator
                </Button>
                <Button
                  size="sm"
                  onClick={() => updateUserRole(selectedUser.id, 'admin')}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Shield size={16} className="mr-1" />
                  Admin
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Adjust G-Chips</h3>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={chipAmount}
                  onChange={(e) => setChipAmount(Number(e.target.value))}
                  className="bg-gray-800 border-gray-700 text-white w-32"
                  placeholder="Amount"
                />
                <Button
                  size="sm"
                  onClick={() => adjustUserChips(selectedUser.id, chipAmount)}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={chipAmount === 0}
                >
                  <Coins size={16} className="mr-1" />
                  Add
                </Button>
                <Button
                  size="sm"
                  onClick={() => adjustUserChips(selectedUser.id, -chipAmount)}
                  className="bg-red-600 hover:bg-red-700"
                  disabled={chipAmount === 0}
                >
                  <Coins size={16} className="mr-1" />
                  Remove
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Current balance: {selectedUser.gagsty_chips} G-Chips
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => setSelectedUser(null)}
              className="text-white border-gray-600 hover:bg-gray-800"
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
