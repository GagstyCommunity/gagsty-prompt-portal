
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PenTool, Users, Wrench, DollarSign } from 'lucide-react';

const HowPromptToGameWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: PenTool,
      title: "Submit a Game Idea",
      description: "Write your dream game concept in just a few sentences",
      color: "blue"
    },
    {
      icon: Users,
      title: "Community Votes",
      description: "The community votes on the best prompts to build",
      color: "violet"
    },
    {
      icon: Wrench,
      title: "Gagsty Builds It",
      description: "Our AI + expert team brings your game to life",
      color: "orange"
    },
    {
      icon: DollarSign,
      title: "You Earn 60% Revenue",
      description: "Get paid every time someone plays your game",
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'violet': return 'text-violet-400 bg-violet-500/20 border-violet-500/30';
      case 'orange': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'green': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              How Prompt-to-Game Works
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From idea to playable game in 4 simple steps
          </p>
        </div>

        {/* 4-Step Horizontal Process */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-gray-600 to-gray-700 transform translate-x-1/2 -translate-y-1/2 z-0" />
                )}
                
                {/* Step Card */}
                <div className="relative z-10 bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                  {/* Step Number */}
                  <div className="text-center mb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-2 ${getColorClasses(step.color)} mb-4`}>
                      <Icon size={24} />
                    </div>
                    <div className="text-gray-500 text-sm font-semibold">STEP {index + 1}</div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/submit')}
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
            >
              Submit Your Prompt
            </Button>
            <Button 
              onClick={() => navigate('/battle')}
              variant="outline"
              className="border-orange-500 text-orange-300 hover:bg-orange-500/20 px-8 py-3 rounded-xl transition-all duration-300"
            >
              See Past Winners
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowPromptToGameWorks;
