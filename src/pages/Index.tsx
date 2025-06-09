
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ProfessionalHero from '@/components/enhanced/ProfessionalHero';
import HowItWorks from '@/components/HowItWorks';
import KeyFeatures from '@/components/KeyFeatures';
import FAQ from '@/components/FAQ';
import WaitlistSection from '@/components/WaitlistSection';

const Index = () => {
  return (
    <PageLayout showParticles={false}>
      <ProfessionalHero />
      <HowItWorks />
      <KeyFeatures />
      <WaitlistSection />
      <FAQ />
    </PageLayout>
  );
};

export default Index;
