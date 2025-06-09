
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import ProfessionalPageLayout from '@/components/layout/ProfessionalPageLayout';
import UserPromptSubmission from '@/components/UserPromptSubmission';
import UserPromptsList from '@/components/UserPromptsList';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';

const Submit = () => {
  const { user, loading } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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

  const handleSubmitSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <ProfessionalPageLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            💡 Submit Your Game Idea
          </h1>
          <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Transform your wildest imagination into playable reality and help shape the future of AI-generated gaming
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
    </ProfessionalPageLayout>
  );
};

export default Submit;
