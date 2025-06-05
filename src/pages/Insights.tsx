
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, TrendingUp, Users, Lightbulb, Play, Download, Clock, Star } from 'lucide-react';

const Insights = () => {
  const navigate = useNavigate();

  const featuredArticles = [
    {
      id: 1,
      title: "The Ultimate Guide to Writing Viral Game Prompts",
      excerpt: "Learn the psychology behind prompts that capture millions of players and generate massive community engagement.",
      category: "Tutorial",
      readTime: "8 min read",
      views: "12.4K",
      rating: 4.9,
      thumbnail: "📝",
      tags: ["Writing", "Psychology", "Viral"]
    },
    {
      id: 2,
      title: "AI Gaming Market Report: $50B Industry Transformation",
      excerpt: "Deep dive into how AI is revolutionizing game development and creating new opportunities for creators.",
      category: "Analysis",
      readTime: "12 min read",
      views: "8.7K",
      rating: 4.8,
      thumbnail: "📊",
      tags: ["Market", "AI", "Trends"]
    },
    {
      id: 3,
      title: "Case Study: How 'Space Cat Adventure' Went Viral",
      excerpt: "Breaking down the elements that made this prompt generate 50K votes and land a $100K development deal.",
      category: "Case Study",
      readTime: "6 min read",
      views: "15.2K",
      rating: 4.9,
      thumbnail: "🚀",
      tags: ["Success", "Viral", "Revenue"]
    }
  ];

  const toolGuides = [
    {
      title: "Prompt Template Library",
      description: "50+ tested templates for different game genres",
      type: "Download",
      icon: Download
    },
    {
      title: "AI Game Creation Masterclass",
      description: "4-hour video series on maximizing AI tools",
      type: "Video Course",
      icon: Play
    },
    {
      title: "Community Collaboration Guide",
      description: "How to build teams and share revenue effectively",
      type: "Guide",
      icon: Users
    },
    {
      title: "Monetization Strategies",
      description: "From concept to $10K+ monthly revenue streams",
      type: "Strategy",
      icon: TrendingUp
    }
  ];

  const trendingTopics = [
    { name: "AI Game Development", posts: 127 },
    { name: "Viral Prompt Writing", posts: 89 },
    { name: "Revenue Sharing", posts: 64 },
    { name: "Community Building", posts: 52 },
    { name: "Mobile Gaming Trends", posts: 43 }
  ];

  return (
    <div className="min-h-screen bg-gagsty-deep text-gagsty-primary">
      <EnhancedHeader />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-[#A084FF] via-[#00C6FB] to-[#16FF6F] shadow-2xl transform hover:scale-105 transition-transform mb-6 gagsty-glow-hover">
              <BookOpen className="w-8 h-8 text-[#121212]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gagsty-gradient">
                Creator Insights
              </span>
            </h1>
            <p className="text-xl text-gagsty-secondary max-w-3xl mx-auto leading-relaxed">
              Master the art of AI game creation with expert guides, market insights, and proven strategies from top creators.
            </p>
          </div>

          {/* Featured Content */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gagsty-primary mb-6 flex items-center">
              <Star className="mr-2 text-[#FFB800]" />
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="gagsty-card gagsty-lift-hover group cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="gagsty-badge-primary text-xs">
                        {article.category}
                      </Badge>
                      <div className="text-2xl">{article.thumbnail}</div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-[#00C6FB] transition-colors leading-tight">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gagsty-secondary text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-[#262A34] text-gagsty-secondary rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gagsty-muted">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {article.readTime}
                        </span>
                        <span>{article.views} views</span>
                        <span className="flex items-center">
                          <Star size={12} className="mr-1 text-[#FFB800]" />
                          {article.rating}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tools & Resources */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gagsty-primary mb-6 flex items-center">
                <Lightbulb className="mr-2 text-[#A084FF]" />
                Tools & Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {toolGuides.map((tool, index) => (
                  <Card key={index} className="gagsty-card gagsty-lift-hover group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-[#A084FF]/20 rounded-lg">
                          <tool.icon className="w-6 h-6 text-[#A084FF]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gagsty-primary mb-1 group-hover:text-[#00C6FB] transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-sm text-gagsty-secondary mb-2">
                            {tool.description}
                          </p>
                          <Badge className="gagsty-badge-secondary text-xs">
                            {tool.type}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trending Topics Sidebar */}
            <div>
              <h2 className="text-2xl font-bold text-gagsty-primary mb-6 flex items-center">
                <TrendingUp className="mr-2 text-[#16FF6F]" />
                Trending Topics
              </h2>
              <div className="gagsty-card p-6 space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#1A1D24] rounded-lg hover:bg-[#262A34] transition-colors cursor-pointer">
                    <span className="text-gagsty-primary font-medium">{topic.name}</span>
                    <Badge className="gagsty-badge-success text-xs">
                      {topic.posts} posts
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="gagsty-card-featured p-6 mt-6">
                <h3 className="text-lg font-bold text-gagsty-primary mb-3">Weekly Insights</h3>
                <p className="text-sm text-gagsty-secondary mb-4">
                  Get the latest trends, tips, and success stories delivered to your inbox.
                </p>
                <Button className="btn-gagsty-primary w-full text-sm">
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="gagsty-card-featured p-8 max-w-2xl mx-auto">
              <BookOpen className="w-12 h-12 text-[#00C6FB] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gagsty-primary mb-4">Ready to Start Creating?</h3>
              <p className="text-gagsty-secondary mb-6">
                Apply these insights to your next game concept and join thousands of successful creators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/submit')}
                  className="btn-gagsty-primary"
                >
                  Submit Your First Prompt
                </Button>
                <Button 
                  onClick={() => navigate('/community')}
                  className="btn-gagsty-secondary"
                >
                  Join Community
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

export default Insights;
