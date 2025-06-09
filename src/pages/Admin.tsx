
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import ProfessionalPageLayout from '@/components/layout/ProfessionalPageLayout';
import EnhancedAdminDashboard from '@/components/admin/EnhancedAdminDashboard';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <ProfessionalPageLayout>
        <DashboardSkeleton />
      </ProfessionalPageLayout>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <ProfessionalPageLayout showParticles={false}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <EnhancedAdminDashboard />
      </div>
    </ProfessionalPageLayout>
  );
};

export default Admin;
