
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coins, Sword, Briefcase, BookOpen, ArrowRight, Play } from 'lucide-react';

const EcosystemPreview = () => {
  const ecosystemCards = [
    {
      icon: Coins,
      title: "G-Chips",
      description: "Earn and spend our native currency across the platform",
      features: ["Reward System", "In-Game Currency", "Staking Rewards"],
      color: "from-yellow-500 to-orange-500",
      link: "/chips",
      available: true
    },
    {
      icon: Sword,
      title: "Prompt Battle",
      description: "Compete with game ideas and earn rewards through community voting",
      features: ["Weekly Battles", "Community Voting", "Prize Pools"],
      color: "from-red-500 to-pink-500",
      link: "/prompt-battle",
      available: true
    },
    {
      icon: Briefcase,
      title: "Gigs Marketplace",
      description: "Find freelance opportunities in game development",
      features: ["Remote Work", "Skill Matching", "Secure Payments"],
      color: "from-green-500 to-emerald-500",
      link: "/jobs",
      available: true
    },
    {
      icon: BookOpen,
      title: "Codex",
      description: "Learn game development and AI prompting techniques",
      features: ["Video Tutorials", "Best Practices", "Community Guides"],
      color: "from-blue-500 to-violet-500",
      link: "/codex",
      available: true
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Complete </span>
            <span className="text-gradient-primary">Ecosystem</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to create, build, learn, and earn in the game development space
          </p>
        </div>

        {/* Ecosystem Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystemCards.map((card, index) => (
            <div key={index} className="card-secondary card-interactive group relative overflow-hidden">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${card.color} mb-4`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {card.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {card.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-500 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link to={card.link} className="block">
                  <Button 
                    className={`w-full btn-secondary border-0 bg-gradient-to-r ${card.color} hover:scale-105`}
                    size="sm"
                  >
                    {card.available ? (
                      <>
                        <Play className="mr-2" size={16} />
                        Explore
                      </>
                    ) : (
                      <>
                        <ArrowRight className="mr-2" size={16} />
                        Coming Soon
                      </>
                    )}
                  </Button>
                </Link>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link to="/dashboard">
            <Button className="btn-primary btn-large">
              <ArrowRight className="mr-2" size={20} />
              Explore Full Platform
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EcosystemPreview;
