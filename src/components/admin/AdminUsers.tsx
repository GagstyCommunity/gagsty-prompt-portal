
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
import { Users, Edit, Award, Coins, Shield, Ban } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [chipsToAdd, setChipsToAdd] = useState(0);

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
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserChips = async (userId: string, chipAmount: number) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const newChipAmount = (user.gagsty_chips || 0) + chipAmount;

      const { error } = await supabase
        .from('profiles')
        .update({ gagsty_chips: newChipAmount })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${chipAmount > 0 ? 'Added' : 'Removed'} ${Math.abs(chipAmount)} chips`,
      });

      fetchUsers();
      setChipsToAdd(0);
    } catch (error) {
      console.error('Error updating chips:', error);
      toast({
        title: "Error",
        description: "Failed to update chips",
        variant: "destructive",
      });
    }
  };

  const promoteToAdmin = async (userId: string) => {
    try {
      // Check if user already has admin role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();

      if (existingRole) {
        toast({
          title: "Info",
          description: "User is already an admin",
        });
        return;
      }

      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: 'admin' });

      if (error) throw error;

      toast({
        title: "Success",
        description: "User promoted to admin",
      });

      fetchUsers();
    } catch (error) {
      console.error('Error promoting user:', error);
      toast({
        title: "Error",
        description: "Failed to promote user",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <div className="flex space-x-2">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-gray-800 border-gray-700 text-white"
          />
          <Button onClick={fetchUsers} className="bg-blue-600 hover:bg-blue-700">
            Refresh
          </Button>
        </div>
      </div>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="mr-2" size={20} />
            All Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Username</TableHead>
                <TableHead className="text-gray-300">Chips</TableHead>
                <TableHead className="text-gray-300">Role</TableHead>
                <TableHead className="text-gray-300">Joined</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">
                    {user.full_name || 'No name'}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    @{user.username || 'No username'}
                  </TableCell>
                  <TableCell className="text-yellow-400 font-medium">
                    {(user.gagsty_chips || 0).toLocaleString()} chips
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      user.user_roles?.some((r: any) => r.role === 'admin') 
                        ? 'bg-red-600' 
                        : 'bg-blue-600'
                    }>
                      {user.user_roles?.some((r: any) => r.role === 'admin') ? 'Admin' : 'User'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedUser(user)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Edit size={14} />
                      </Button>
                      {!user.user_roles?.some((r: any) => r.role === 'admin') && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => promoteToAdmin(user.id)}
                          className="text-gray-400 hover:text-orange-400"
                        >
                          <Shield size={14} />
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

      {selectedUser && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">
              Manage User: {selectedUser.full_name || selectedUser.username || 'Anonymous'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-white font-medium mb-2">User Details</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong>ID:</strong> {selectedUser.id}</p>
                  <p><strong>Name:</strong> {selectedUser.full_name || 'Not set'}</p>
                  <p><strong>Username:</strong> @{selectedUser.username || 'Not set'}</p>
                  <p><strong>Current Chips:</strong> {(selectedUser.gagsty_chips || 0).toLocaleString()}</p>
                  <p><strong>Profile Completed:</strong> {selectedUser.profile_completed ? 'Yes' : 'No'}</p>
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Chip Management</h3>
                <div className="space-y-3">
                  <Input
                    type="number"
                    value={chipsToAdd}
                    onChange={(e) => setChipsToAdd(Number(e.target.value))}
                    placeholder="Amount to add/remove"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => updateUserChips(selectedUser.id, chipsToAdd)}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={chipsToAdd === 0}
                    >
                      <Coins className="mr-2" size={16} />
                      Add Chips
                    </Button>
                    <Button
                      onClick={() => updateUserChips(selectedUser.id, -chipsToAdd)}
                      className="bg-red-600 hover:bg-red-700"
                      disabled={chipsToAdd === 0}
                    >
                      <Coins className="mr-2" size={16} />
                      Remove Chips
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-700">
              <Button
                onClick={() => setSelectedUser(null)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminUsers;
