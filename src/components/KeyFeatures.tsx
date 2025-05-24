
import React from 'react';

const KeyFeatures = () => {
  const features = [
    {
      title: 'Prompt-to-Game System',
      description: 'Transform your wildest game ideas into reality with simple text prompts',
      icon: '🎯',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      title: 'No-Code Builder',
      description: 'AI-powered development with community support - no coding required',
      icon: '🛠️',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Gagsty Chips Rewards',
      description: 'Earn our native currency through gameplay, creation, and community participation',
      icon: '🪙',
      gradient: 'from-emerald-500 to-cyan-500'
    },
    {
      title: 'Player Voting',
      description: 'Community-driven moderation ensures quality and fairness',
      icon: '🗳️',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Weekly Prompt Battles',
      description: 'Compete with other creators in themed challenges and earn rewards',
      icon: '⚔️',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      title: 'Play-to-Own Mechanics',
      description: 'Collect unique skins, upgrades, and badges that you truly own',
      icon: '👑',
      gradient: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Key Features
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to create, play, and earn in the new gaming economy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 transform hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
