
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import UserPromptSubmission from '@/components/UserPromptSubmission';
import UserPromptsList from '@/components/UserPromptsList';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';

const Submit = () => {
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Submit Your Game Idea
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Share your creative prompt and help shape the future of AI-generated games
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <UserPromptSubmission />
          </div>
          <div>
            <UserPromptsList />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Submit;
