
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Lightbulb, Gamepad2, Coins, Code, Users, TrendingUp } from 'lucide-react';

const Codex = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles', icon: BookOpen },
    { id: 'prompt-writing', name: 'Prompt Writing', icon: Lightbulb },
    { id: 'game-design', name: 'Game Design', icon: Gamepad2 },
    { id: 'monetization', name: 'Monetization', icon: Coins },
    { id: 'platform-guide', name: 'Platform Guide', icon: Code },
    { id: 'web3-basics', name: 'Web3 Basics', icon: TrendingUp }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: "The Complete Guide to Writing Winning Game Prompts",
      excerpt: "Master the art of prompt writing with our comprehensive guide. Learn the techniques that make prompts stand out in the Battle Arena.",
      category: "prompt-writing",
      readTime: "8 min read",
      author: "Gagsty Team",
      featured: true,
      thumbnail: "📝"
    },
    {
      id: 2,
      title: "Understanding the Gagsty Ecosystem: From Prompt to Published Game",
      excerpt: "Dive deep into how Gagsty works, from initial prompt submission through community voting to final game publication and revenue sharing.",
      category: "platform-guide",
      readTime: "12 min read",
      author: "Alex Chen",
      featured: true,
      thumbnail: "🔄"
    },
    {
      id: 3,
      title: "Maximizing Your G-Chips: Advanced Earning Strategies",
      excerpt: "Discover advanced strategies for earning G-Chips through prompt submissions, voting, gigs, and community participation.",
      category: "monetization",
      readTime: "6 min read",
      author: "Sarah Kim",
      featured: true,
      thumbnail: "💰"
    }
  ];

  const allArticles = [
    {
      id: 4,
      title: "Game Design Fundamentals: Creating Engaging Core Loops",
      excerpt: "Learn the basics of game design and how to create compelling gameplay that keeps players coming back.",
      category: "game-design",
      readTime: "10 min read",
      author: "Mike Rodriguez",
      thumbnail: "🎯"
    },
    {
      id: 5,
      title: "Web3 Gaming Explained: NFTs, Tokens, and True Ownership",
      excerpt: "A beginner's guide to Web3 gaming concepts and how they're revolutionizing the gaming industry.",
      category: "web3-basics",
      readTime: "7 min read",
      author: "Lisa Wang",
      thumbnail: "🔗"
    },
    {
      id: 6,
      title: "Community Building: How to Get Your Prompt Noticed",
      excerpt: "Strategies for building a following and getting your game prompts the attention they deserve.",
      category: "prompt-writing",
      readTime: "5 min read",
      author: "David Thompson",
      thumbnail: "📢"
    },
    {
      id: 7,
      title: "From Idea to Income: The Creator's Journey on Gagsty",
      excerpt: "Follow a successful creator's journey from their first prompt submission to earning significant revenue.",
      category: "monetization",
      readTime: "9 min read",
      author: "Emma Davis",
      thumbnail: "📈"
    },
    {
      id: 8,
      title: "AI-Assisted Game Development: Tips and Best Practices",
      excerpt: "Learn how to work effectively with AI tools to bring your game ideas to life.",
      category: "game-design",
      readTime: "11 min read",
      author: "James Liu",
      thumbnail: "🤖"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'prompt-writing': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'game-design': return 'bg-violet-500/20 text-violet-300 border-violet-500/30';
      case 'monetization': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'platform-guide': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'web3-basics': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <EnhancedHeader />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-violet-400 bg-clip-text text-transparent">
                Welcome to the Codex
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your ultimate guide to game creation, AI prompts, and the Gagsty ecosystem. Learn, create, and earn.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="bg-gray-800 border-gray-700 text-white pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "border-gray-600 text-gray-300 hover:bg-gray-700"
                    }
                    size="sm"
                  >
                    <Icon size={16} className="mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Featured Articles */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <TrendingUp className="mr-3 text-yellow-500" />
              Featured Guides
            </h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <CardHeader className="pb-3">
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 w-fit mb-3">
                      Featured
                    </Badge>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">{article.thumbnail}</div>
                      <div className="flex-1">
                        <Badge className={getCategoryColor(article.category) + " text-xs"}>
                          {article.category.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-white text-xl leading-tight">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-400 text-xs">
                        <span>{article.readTime}</span>
                        <span className="mx-2">•</span>
                        <span>by {article.author}</span>
                      </div>
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                      >
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Articles */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <BookOpen className="mr-3 text-blue-500" />
              {selectedCategory === 'all' ? 'All Articles' : `${categories.find(c => c.id === selectedCategory)?.name} Articles`}
              {searchTerm && <span className="text-gray-400 ml-2">- Search results for "{searchTerm}"</span>}
            </h2>
            
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{article.thumbnail}</div>
                        <Badge className={getCategoryColor(article.category) + " text-xs"}>
                          {article.category.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg leading-tight">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-400 text-xs">
                          <span>{article.readTime}</span>
                          <span className="mx-2">•</span>
                          <span>by {article.author}</span>
                        </div>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          Read
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 p-8 bg-gradient-to-r from-blue-900/20 to-violet-900/20 rounded-2xl border border-blue-500/30">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-6">
                Get the latest guides, tutorials, and insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white flex-1"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Codex;
