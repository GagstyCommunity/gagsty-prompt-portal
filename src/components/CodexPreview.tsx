
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Wrench, Trophy } from 'lucide-react';

const CodexPreview = () => {
  const navigate = useNavigate();

  const articles = [
    {
      icon: BookOpen,
      title: "Learn to Build Games with AI",
      description: "Complete guide to AI-powered game development from prompt to publish",
      category: "Tutorial",
      readTime: "8 min read",
      color: "blue"
    },
    {
      icon: Wrench,
      title: "Top Free Tools to Create Games",
      description: "Essential free software and resources every game creator should know",
      category: "Resources",
      readTime: "5 min read",
      color: "violet"
    },
    {
      icon: Trophy,
      title: "How to Win the Prompt Battle",
      description: "Insider tips from successful creators who've won multiple competitions",
      category: "Strategy",
      readTime: "6 min read",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-400 bg-blue-500/10';
      case 'violet': return 'text-violet-400 bg-violet-500/10';
      case 'orange': return 'text-orange-400 bg-orange-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tutorial': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Resources': return 'bg-violet-500/20 text-violet-300 border-violet-500/30';
      case 'Strategy': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <section className="py-20 px-4 bg-gray-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-violet-400 bg-clip-text text-transparent">
              Codex: Learn & Create
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master game creation with our comprehensive guides and resources
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${getColorClasses(article.color)} mb-4`}>
                  <Icon size={20} />
                </div>
                
                <div className="mb-4">
                  <Badge className={`mb-3 ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-white mb-2">{article.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{article.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => navigate('/codex')}
                  >
                    Read
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={() => navigate('/codex')}
            className="bg-gradient-to-r from-green-500 to-violet-500 hover:from-green-600 hover:to-violet-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
          >
            Explore Full Codex
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CodexPreview;
