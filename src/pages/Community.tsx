
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import CommunityShoutouts from '@/components/CommunityShoutouts';
import CommunityMetrics from '@/components/CommunityMetrics';

const Community = () => {
  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            🌟 Join Our Community
          </h1>
          <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Connect with amazing creators, share brilliant ideas, and be part of the gaming revolution that's changing everything
          </p>
        </div>
        
        <div className="space-y-12">
          <CommunityMetrics />
          <CommunityShoutouts />
        </div>
      </div>
    </PageLayout>
  );
};

export default Community;
