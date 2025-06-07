
import React from 'react';
import UserDashboardHeader from '../components/navigation/UserDashboardHeader';
import Footer from '../components/Footer';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import ChipsOverview from '../components/dashboard/ChipsOverview';
import GameIdeas from '../components/dashboard/GameIdeas';
import WaitlistStatus from '../components/dashboard/WaitlistStatus';
import LearningHub from '../components/dashboard/LearningHub';
import ToolsOffers from '../components/dashboard/ToolsOffers';
import Notifications from '../components/dashboard/Notifications';
import DynamicChipsDisplay from '../components/dynamic/DynamicChipsDisplay';
import DynamicLeaderboard from '../components/dynamic/DynamicLeaderboard';
import DynamicEventsList from '../components/dynamic/DynamicEventsList';
import UserBadges from '../components/UserBadges';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton';
import ErrorBoundary from '../components/ErrorBoundary';
import { useAuth } from '../contexts/AuthContext';
import { useUserData } from '../hooks/useUserData';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus, Calendar, Trophy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { profile, loading: profileLoading, refetch } = useUserData();

  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Dashboard Refreshed",
        description: "All data has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Unable to refresh dashboard data.",
        variant: "destructive",
      });
    }
  };

  if (loading || profileLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to access your dashboard</h1>
          <p className="text-gray-400">You need to be authenticated to view this page.</p>
        </div>
      </div>
    );
  }

  const waitlistPosition = Math.max(1, 1000 - Math.floor((profile?.gagsty_chips || 0) / 10));

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white">
        <UserDashboardHeader />
        
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4">
            {/* Enhanced Header with Quick Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
              <WelcomeHeader profile={profile} waitlistPosition={waitlistPosition} />
              
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Refresh
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus size={16} className="mr-2" />
                  Submit Prompt
                </Button>
                <Button variant="outline" className="border-yellow-600 text-yellow-300 hover:bg-yellow-600/20">
                  <Calendar size={16} className="mr-2" />
                  Events
                </Button>
                <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-600/20">
                  <Trophy size={16} className="mr-2" />
                  Leaderboard
                </Button>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-8 mb-12">
              {/* Left Column - Main Dashboard Content */}
              <div className="lg:col-span-3 space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <ErrorBoundary fallback={<div className="p-4 bg-gray-900/50 rounded-lg">Error loading chips overview</div>}>
                    <ChipsOverview profile={profile} />
                  </ErrorBoundary>
                  <ErrorBoundary fallback={<div className="p-4 bg-gray-900/50 rounded-lg">Error loading waitlist status</div>}>
                    <WaitlistStatus profile={profile} />
                  </ErrorBoundary>
                </div>
                
                <ErrorBoundary fallback={<div className="p-4 bg-gray-900/50 rounded-lg">Error loading game ideas</div>}>
                  <GameIdeas />
                </ErrorBoundary>
                
                <ErrorBoundary fallback={<div className="p-4 bg-gray-900/50 rounded-lg">Error loading learning hub</div>}>
                  <LearningHub />
                </ErrorBoundary>
                
                <ErrorBoundary fallback={<div className="p-4 bg-gray-900/50 rounded-lg">Error loading tools offers</div>}>
                  <ToolsOffers />
                </ErrorBoundary>
                
                <ErrorBoundary fallback={<div className="p-4 bg-gray-900/50 rounded-lg">Error loading events</div>}>
                  <DynamicEventsList />
                </ErrorBoundary>
              </div>
              
              {/* Right Column - Enhanced Sidebar */}
              <div className="space-y-6">
                {/* Enhanced Chips Display */}
                <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                    Live Balance
                  </h3>
                  <ErrorBoundary fallback={<div className="text-red-400">Error loading balance</div>}>
                    <DynamicChipsDisplay showLabel={true} className="justify-center" />
                  </ErrorBoundary>
                </div>
                
                {/* User Badges */}
                <ErrorBoundary fallback={<div className="p-4 bg-gray-900/50 rounded-lg">Error loading badges</div>}>
                  <UserBadges />
                </ErrorBoundary>
                
                {/* Enhanced Leaderboard */}
                <ErrorBoundary fallback={<div className="p-4 bg-gray-900/50 rounded-lg">Error loading leaderboard</div>}>
                  <DynamicLeaderboard />
                </ErrorBoundary>
                
                {/* Enhanced Notifications */}
                <ErrorBoundary fallback={<div className="p-4 bg-gray-900/50 rounded-lg">Error loading notifications</div>}>
                  <Notifications />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
