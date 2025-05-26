
import React from 'react';
import Header from '../components/Header';
import StreamlinedHero from '../components/StreamlinedHero';
import SimpleDemo from '../components/SimpleDemo';
import SimplifiedMetrics from '../components/SimplifiedMetrics';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <div className="relative pt-16">
        {/* Enhanced animated background effects with waitlist theme colors */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-emerald-900/20 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />
        
        {/* Streamlined content focused on waitlist conversion */}
        <div className="relative z-10">
          <StreamlinedHero />
          <SimplifiedMetrics />
          <SimpleDemo />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
