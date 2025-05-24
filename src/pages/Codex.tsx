
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Book, Users, DollarSign } from 'lucide-react';

const Codex = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Articles', icon: Book },
    { id: 'prompt-writing', name: 'Prompt Writing', icon: Book },
    { id: 'game-design', name: 'Game Design', icon: Users },
    { id: 'monetization', name: 'Monetization', icon: DollarSign }
  ];

  const articles = [
    {
      id: 1,
      title: 'How to Write a Killer Game Prompt',
      category: 'prompt-writing',
      excerpt: 'Learn the art of crafting prompts that AI can turn into amazing games.',
      readTime: '5 min read',
      featured: true,
      thumbnail: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Earn Gagsty Chips with No Upfront Cost',
      category: 'monetization',
      excerpt: 'Discover all the ways to earn our native currency without spending money.',
      readTime: '7 min read',
      featured: true,
      thumbnail: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Prompt vs Code: The New Creator Economy',
      category: 'game-design',
      excerpt: 'Why natural language is becoming the new programming language.',
      readTime: '10 min read',
      featured: false,
      thumbnail: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Game Mechanics That Players Love',
      category: 'game-design',
      excerpt: 'Essential gameplay elements that keep players coming back.',
      readTime: '8 min read',
      featured: false,
      thumbnail: '/placeholder.svg'
    },
    {
      id: 5,
      title: 'Building a Gaming Community',
      category: 'monetization',
      excerpt: 'How to grow and engage your player base for long-term success.',
      readTime: '6 min read',
      featured: false,
      thumbnail: '/placeholder.svg'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(article => article.featured);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Welcome to the Codex
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Your ultimate guide to game creation, AI prompts, and the Gagsty ecosystem. Learn, create, and earn.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="pl-10 bg-gray-900/50 border-gray-700 text-white"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  <Icon size={20} />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Featured Tutorials */}
          {selectedCategory === 'all' && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Featured Tutorials</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <Card key={article.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all cursor-pointer group">
                    <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-t-lg"></div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-blue-600 text-white">Featured</Badge>
                        <span className="text-sm text-gray-400">{article.readTime}</span>
                      </div>
                      <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{article.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all cursor-pointer group">
                  <div className="aspect-video bg-gradient-to-br from-gray-600/20 to-gray-800/20 rounded-t-lg"></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-gray-400 border-gray-600">
                        {categories.find(c => c.id === article.category)?.name}
                      </Badge>
                      <span className="text-sm text-gray-400">{article.readTime}</span>
                    </div>
                    <CardTitle className="text-white group-hover:text-blue-400 transition-colors text-lg">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm">{article.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No articles found matching your search.</p>
              </div>
            )}
          </div>

          {/* Newsletter CTA */}
          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800/20">
            <CardContent className="text-center py-12">
              <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Get the latest tutorials, tips, and Gagsty updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800/50 border-gray-700 text-white"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Codex;
