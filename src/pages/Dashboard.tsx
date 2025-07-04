
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import ProfessionalPageLayout from '@/components/layout/ProfessionalPageLayout';
import EnhancedDashboard from '@/components/enhanced/EnhancedDashboard';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';
import { useUserData } from '@/hooks/useUserData';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserData();

  if (authLoading || profileLoading) {
    return (
      <ProfessionalPageLayout>
        <DashboardSkeleton />
      </ProfessionalPageLayout>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <ProfessionalPageLayout showParticles={false}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <EnhancedDashboard />
      </div>
    </ProfessionalPageLayout>
  );
};

export default Dashboard;
