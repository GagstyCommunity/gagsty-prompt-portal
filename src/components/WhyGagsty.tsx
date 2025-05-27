
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot, Users, Coins, Shield } from 'lucide-react';

const WhyGagsty = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Game Builder",
      description: "Advanced AI transforms your text prompts into fully playable games with stunning visuals and engaging gameplay.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Community-Driven Rewards",
      description: "The community votes on the best ideas. Democracy meets creativity in the ultimate game development platform.",
      color: "violet"
    },
    {
      icon: Coins,
      title: "Gagsty Chips Economy",
      description: "Earn our native token by creating, voting, and playing. Real value for real contribution to the ecosystem.",
      color: "orange"
    },
    {
      icon: Shield,
      title: "Play-to-Own Not Play-to-Earn",
      description: "True ownership of your creations and achievements. Your games, your rules, your revenue forever.",
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-400 bg-blue-500/10';
      case 'violet': return 'text-violet-400 bg-violet-500/10';
      case 'orange': return 'text-orange-400 bg-orange-500/10';
      case 'green': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">
              Why Gagsty?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The future of game development is collaborative, rewarding, and accessible to everyone.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${getColorClasses(feature.color)} mb-6`}>
                  <Icon size={28} />
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={() => navigate('/about')}
            className="bg-gradient-to-r from-violet-500 to-orange-500 hover:from-violet-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
          >
            What are Gagsty Chips?
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyGagsty;
