
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import DynamicLeaderboard from '@/components/dynamic/DynamicLeaderboard';

const Leaderboard = () => {
  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            🏆 Leaderboard
          </h1>
          <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            See who's dominating the charts and leading our incredible creator community
          </p>
        </div>
        
        <DynamicLeaderboard />
      </div>
    </PageLayout>
  );
};

export default Leaderboard;
