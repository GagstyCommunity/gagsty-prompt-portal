
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import DynamicEventsList from '@/components/dynamic/DynamicEventsList';

const Events = () => {
  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Upcoming Events
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join our events and earn exclusive rewards while we prepare for launch
          </p>
        </div>
        
        <DynamicEventsList />
      </div>
    </PageLayout>
  );
};

export default Events;
