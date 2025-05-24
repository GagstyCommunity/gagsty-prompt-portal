
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Submit a Game Prompt',
      description: 'Describe your dream game in plain English. Example: "Build a pixel battle game with flying cats"',
      icon: '✍️',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'Gagsty AI + Community Builds It',
      description: 'Our AI collaborates with talented developers to bring your vision to life',
      icon: '🤖',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      title: 'Earn 60% Revenue',
      description: 'Own your game economy and earn from every player interaction',
      icon: '💰',
      gradient: 'from-emerald-500 to-green-500'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From idea to earnings in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-gray-600 to-transparent transform translate-x-1/2 -translate-y-1/2 z-0" />
              )}
              
              <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 z-10">
                {/* Step number */}
                <div className={`inline-block bg-gradient-to-r ${step.gradient} text-white text-sm font-bold px-3 py-1 rounded-full mb-4`}>
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="text-4xl mb-4">{step.icon}</div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
