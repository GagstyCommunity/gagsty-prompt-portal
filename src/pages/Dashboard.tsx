
import React from 'react';
import DynamicHeader from '../components/navigation/DynamicHeader';
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
import { useAuth } from '../contexts/AuthContext';
import { useUserData } from '../hooks/useUserData';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { profile, loading: profileLoading } = useUserData();

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    );
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

  // Calculate waitlist position based on chips (temporary logic)
  const waitlistPosition = Math.max(1, 1000 - Math.floor((profile?.gagsty_chips || 0) / 10));

  return (
    <div className="min-h-screen bg-black text-white">
      <DynamicHeader />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <WelcomeHeader profile={profile} waitlistPosition={waitlistPosition} />
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Main Dashboard Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <ChipsOverview profile={profile} />
                <WaitlistStatus profile={profile} />
              </div>
              
              <GameIdeas />
              <LearningHub />
              <ToolsOffers />
              
              {/* Dynamic Events */}
              <DynamicEventsList />
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Chips Display */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Your Balance</h3>
                <DynamicChipsDisplay showLabel={true} className="justify-center" />
              </div>
              
              {/* User Badges */}
              <UserBadges />
              
              {/* Leaderboard */}
              <DynamicLeaderboard />
              
              {/* Notifications */}
              <Notifications />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
