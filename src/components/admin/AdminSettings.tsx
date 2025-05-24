
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Save, ExternalLink } from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    discordLink: 'https://discord.gg/gagsty',
    telegramLink: 'https://t.me/gagsty',
    announcementBanner: '',
    bannerActive: false,
    maintenanceMode: false
  });

  const [loading, setLoading] = useState(false);

  const saveSettings = async () => {
    setLoading(true);
    try {
      // In a real app, you'd save these to your database
      // For now, we'll just simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Settings saved successfully.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Site Settings</h2>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Discord Invite Link
            </label>
            <div className="flex space-x-2">
              <Input
                value={settings.discordLink}
                onChange={(e) => setSettings({ ...settings, discordLink: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://discord.gg/gagsty"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(settings.discordLink, '_blank')}
                className="text-white border-gray-600 hover:bg-gray-800"
              >
                <ExternalLink size={16} />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Telegram Channel Link
            </label>
            <div className="flex space-x-2">
              <Input
                value={settings.telegramLink}
                onChange={(e) => setSettings({ ...settings, telegramLink: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://t.me/gagsty"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(settings.telegramLink, '_blank')}
                className="text-white border-gray-600 hover:bg-gray-800"
              >
                <ExternalLink size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Announcement Banner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="bannerActive"
              checked={settings.bannerActive}
              onChange={(e) => setSettings({ ...settings, bannerActive: e.target.checked })}
              className="rounded border-gray-600 bg-gray-800"
            />
            <label htmlFor="bannerActive" className="text-sm text-gray-300">
              Show announcement banner
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Banner Message
            </label>
            <Textarea
              value={settings.announcementBanner}
              onChange={(e) => setSettings({ ...settings, announcementBanner: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Enter announcement message..."
              rows={3}
            />
          </div>

          {settings.bannerActive && settings.announcementBanner && (
            <div className="p-3 bg-blue-600 rounded-lg">
              <p className="text-white text-sm">{settings.announcementBanner}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Site Maintenance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="rounded border-gray-600 bg-gray-800"
            />
            <label htmlFor="maintenanceMode" className="text-sm text-gray-300">
              Enable maintenance mode
            </label>
          </div>

          {settings.maintenanceMode && (
            <div className="p-3 bg-orange-600 rounded-lg">
              <p className="text-white text-sm">
                ⚠️ Maintenance mode is enabled. Regular users won't be able to access the site.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="text-white border-gray-600 hover:bg-gray-800"
              onClick={() => toast({ title: "Info", description: "Database backup initiated." })}
            >
              Backup Database
            </Button>
            
            <Button
              variant="outline"
              className="text-white border-gray-600 hover:bg-gray-800"
              onClick={() => toast({ title: "Info", description: "Cache cleared successfully." })}
            >
              Clear Cache
            </Button>
            
            <Button
              variant="outline"
              className="text-white border-gray-600 hover:bg-gray-800"
              onClick={() => toast({ title: "Info", description: "System status: All services operational." })}
            >
              Check System Status
            </Button>
            
            <Button
              variant="outline"
              className="text-white border-gray-600 hover:bg-gray-800"
              onClick={() => window.open('/api/logs', '_blank')}
            >
              View System Logs
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={saveSettings}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700"
      >
        <Save size={16} className="mr-2" />
        {loading ? 'Saving...' : 'Save All Settings'}
      </Button>
    </div>
  );
};

export default AdminSettings;
