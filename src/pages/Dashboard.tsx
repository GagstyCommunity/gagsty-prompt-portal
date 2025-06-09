
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import WaitlistStatus from '@/components/dashboard/WaitlistStatus';
import ChipsOverview from '@/components/dashboard/ChipsOverview';
import GameIdeas from '@/components/dashboard/GameIdeas';
import LearningHub from '@/components/dashboard/LearningHub';
import Notifications from '@/components/dashboard/Notifications';
import ToolsOffers from '@/components/dashboard/ToolsOffers';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';
import { useUserData } from '@/hooks/useUserData';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserData();

  if (authLoading || profileLoading) {
    return (
      <PageLayout>
        <DashboardSkeleton />
      </PageLayout>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Generate a mock waitlist position based on user data
  const waitlistPosition = profile?.gagsty_chips ? Math.max(1, 1000 - Math.floor(profile.gagsty_chips / 10)) : 500;

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <WelcomeHeader profile={profile} waitlistPosition={waitlistPosition} />
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <WaitlistStatus profile={profile} />
            <ChipsOverview profile={profile} />
            <GameIdeas />
            <LearningHub />
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <Notifications />
            <ToolsOffers />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
