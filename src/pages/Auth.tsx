
import React from 'react';
import ProfessionalPageLayout from '@/components/layout/ProfessionalPageLayout';
import MultiPathSignup from '@/components/MultiPathSignup';
import DemoLogin from '@/components/auth/DemoLogin';

const Auth = () => {
  return (
    <ProfessionalPageLayout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Join the Revolution
            </h2>
            <p className="text-lg text-white/80">
              Start creating the future of gaming today
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            <MultiPathSignup />
          </div>
          
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 shadow-2xl">
            <DemoLogin />
          </div>
        </div>
      </div>
    </ProfessionalPageLayout>
  );
};

export default Auth;
