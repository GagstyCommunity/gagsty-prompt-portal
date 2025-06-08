
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

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageLayout>
        <DashboardSkeleton />
      </PageLayout>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <WelcomeHeader />
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <WaitlistStatus />
            <ChipsOverview />
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
