
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();

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

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <PageLayout showParticles={false}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdminDashboard />
      </div>
    </PageLayout>
  );
};

export default Admin;
