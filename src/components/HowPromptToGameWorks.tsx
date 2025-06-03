
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, Bot, Users, Rocket, ArrowRight } from 'lucide-react';

const HowPromptToGameWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: MessageSquare,
      title: "Describe Your Vision",
      subtitle: "Submit Prompt",
      description: "Start by writing a detailed prompt describing your game idea. What's the genre? Who are the characters? What makes it unique? The more detail, the better our AI can understand your vision.",
      link: "/submit",
      linkText: "Submit Your First Prompt",
      color: "blue"
    },
    {
      icon: Bot,
      title: "AI Builds Your Foundation",
      subtitle: "Community Votes",
      description: "Gagsty's AI analyzes your prompt, generating initial concepts, artwork styles, and core mechanics. Your prompt then enters the Prompt Battle, where the community votes for the most promising ideas.",
      link: "/prompt-battle",
      linkText: "See Prompts in Battle Arena",
      color: "violet"
    },
    {
      icon: Users,
      title: "Play, Iterate & Refine",
      subtitle: "Community Feedback",
      description: "Prompts selected by the community get developed into playable prototypes. Creators, testers, and the community provide feedback. Iterate on gameplay, art, and story based on input and AI assistance.",
      link: "/codex",
      linkText: "Learn About the Process",
      color: "orange"
    },
    {
      icon: Rocket,
      title: "Publish, Earn & Own",
      subtitle: "60% Revenue Share",
      description: "Polished games are published on the Gagsty platform and potentially other marketplaces. As the original prompt creator, you earn a significant share of the game's revenue and G-Chips.",
      link: "/events",
      linkText: "Learn About Earning Potential",
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'violet': return 'text-violet-400 bg-violet-500/10 border-violet-500/30';
      case 'orange': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'green': return 'text-green-400 bg-green-500/10 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gagsty-gradient">
              From Idea to Game in Minutes
            </span>
          </h2>
          <p className="text-xl text-gagsty-secondary max-w-3xl mx-auto mb-8">
            Our AI-powered platform transforms your creative ideas into fully playable games. No coding, no complex tools – just your imagination and our technology.
          </p>
          <Button 
            onClick={() => navigate('/submit')}
            className="btn-gagsty-primary text-lg px-8 py-4"
          >
            Start Creating Now
          </Button>
        </div>

        {/* Process Steps */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center text-gagsty-primary mb-12">
            The Gagsty Creation Cycle: Your Journey from Concept to Published Game
          </h3>
          
          <div className="grid gap-8 md:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-8 top-24 w-0.5 h-16 bg-gradient-to-b from-[#8B8FA3] to-[#262A34]" />
                  )}
                  
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Step Icon & Number */}
                    <div className="flex flex-col items-center">
                      <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl border-2 ${getColorClasses(step.color)} mb-2`}>
                        <Icon size={28} />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gagsty-primary text-[#121212] rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <ArrowRight className="md:hidden text-[#8B8FA3] mt-4" size={20} />
                      )}
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="text-2xl font-bold text-gagsty-primary mb-2">{step.title}</h4>
                      <p className="text-lg text-gagsty-secondary mb-4 font-medium">({step.subtitle})</p>
                      <p className="text-gagsty-secondary leading-relaxed mb-6 max-w-3xl">
                        {step.description}
                      </p>
                      <Button 
                        onClick={() => navigate(step.link)}
                        className="btn-gagsty-secondary"
                      >
                        {step.linkText}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ecosystem Section */}
        <div className="mt-20 pt-16 border-t border-gagsty-subtle">
          <h3 className="text-3xl font-bold text-center text-gagsty-primary mb-12">
            More Than Just Creation: An Entire Ecosystem
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "G-Chips - The Platform Currency",
                description: "Earn G-Chips by submitting winning prompts, voting, testing games, completing freelance gigs, and participating in events.",
                icon: "🪙"
              },
              {
                title: "Prompt Battle - Where Ideas Compete",
                description: "Submit your best ideas and vote on others. The community decides which games get made, ensuring democratic development.",
                icon: "⚔️"
              },
              {
                title: "Gigs Marketplace - Get Paid for Your Skills",
                description: "Offer your skills in game design, art, development, testing, or prompt writing. Find freelance opportunities in the community.",
                icon: "💼"
              },
              {
                title: "Codex - Learn and Improve",
                description: "Our knowledge base is packed with guides on writing effective prompts, game design fundamentals, and Web3 gaming.",
                icon: "📚"
              }
            ].map((component, index) => (
              <div key={index} className="gagsty-card gagsty-lift-hover">
                <div className="text-4xl mb-4 text-center">{component.icon}</div>
                <h4 className="text-lg font-semibold text-gagsty-primary mb-3">{component.title}</h4>
                <p className="text-gagsty-secondary text-sm leading-relaxed">{component.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gagsty-primary mb-4">Your Game Idea Awaits</h3>
          <p className="text-gagsty-secondary mb-8">
            Join thousands of creators building the next generation of games. Submit your prompt today and see where your imagination takes you.
          </p>
          <Button 
            onClick={() => navigate('/submit')}
            className="btn-gagsty-primary text-lg px-8 py-4"
          >
            Submit Your Game Prompt
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowPromptToGameWorks;
