
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import UserPromptSubmission from '@/components/UserPromptSubmission';
import UserPromptsList from '@/components/UserPromptsList';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';

const Submit = () => {
  const { user, loading } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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

  const handleSubmitSuccess = () => {
    // Trigger a refresh of the prompts list
    setRefreshTrigger(prev => prev + 1);
  };

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
            <UserPromptSubmission onSubmitSuccess={handleSubmitSuccess} />
          </div>
          <div key={refreshTrigger}>
            <UserPromptsList />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Submit;
