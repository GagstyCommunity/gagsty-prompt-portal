
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const DemoLogin = () => {
  const handleDemoLogin = async (type: 'admin' | 'user') => {
    try {
      let email = '';
      let password = 'demo123456';

      if (type === 'admin') {
        email = 'admin@gagsty.com';
      } else {
        email = 'user@gagsty.com';
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Demo Login Failed",
          description: `Demo ${type} account not found. Please create accounts with emails: admin@gagsty.com and user@gagsty.com`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Demo Login Successful",
          description: `Logged in as demo ${type}`,
        });
      }
    } catch (error) {
      console.error('Demo login error:', error);
      toast({
        title: "Demo Login Error",
        description: "An error occurred during demo login",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Demo Accounts</h3>
        <p className="text-sm text-white/70">Quick access for testing</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          onClick={() => handleDemoLogin('admin')}
          className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl py-3 flex items-center justify-center space-x-2"
        >
          <Shield size={18} />
          <span>Demo Admin</span>
        </Button>
        
        <Button
          onClick={() => handleDemoLogin('user')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-3 flex items-center justify-center space-x-2"
        >
          <User size={18} />
          <span>Demo User</span>
        </Button>
      </div>
      
      <div className="text-xs text-white/50 text-center mt-4">
        Demo accounts use predefined credentials for testing purposes
      </div>
    </div>
  );
};

export default DemoLogin;
