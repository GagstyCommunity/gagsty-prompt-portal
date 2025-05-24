
import React from 'react';
import { Button } from '@/components/ui/button';

const CodexTeaser = () => {
  const articles = [
    {
      title: 'How to Write a Killer Game Prompt',
      description: 'Master the art of prompt engineering for game creation',
      readTime: '5 min read',
      category: 'Guide',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Earn Gagsty Chips with No Upfront Cost',
      description: 'Discover all the ways to earn in the Gagsty ecosystem',
      readTime: '7 min read',
      category: 'Economics',
      gradient: 'from-emerald-500 to-cyan-500'
    },
    {
      title: 'Prompt vs Code: The New Creator Economy',
      description: 'Why natural language is the future of game development',
      readTime: '10 min read',
      category: 'Insights',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              The Gagsty Codex
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your guide to mastering the future of game creation and earning
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <div 
              key={index}
              className="group bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div className={`inline-block bg-gradient-to-r ${article.gradient} text-white text-xs font-bold px-3 py-1 rounded-full mb-4`}>
                {article.category}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {article.title}
              </h3>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {article.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{article.readTime}</span>
                <span className="group-hover:text-blue-400 transition-colors">
                  Read more →
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            disabled
            className="bg-gray-700 text-gray-400 cursor-not-allowed px-8 py-3 text-lg"
          >
            Explore the Codex (Coming Soon)
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Available to waitlist members first
          </p>
        </div>
      </div>
    </section>
  );
};

export default CodexTeaser;
