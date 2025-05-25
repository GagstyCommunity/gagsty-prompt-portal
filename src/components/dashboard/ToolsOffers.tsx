
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wrench, 
  Star, 
  Download, 
  ExternalLink, 
  Crown,
  Zap,
  Code,
  Palette,
  Music,
  Image
} from 'lucide-react';

const ToolsOffers: React.FC = () => {
  const tools = [
    {
      id: 1,
      name: 'Unity Pro',
      description: 'Professional game development engine with advanced features',
      category: 'Game Engine',
      originalPrice: '$1800/year',
      discountedPrice: '$900/year',
      discount: '50%',
      rating: 4.9,
      icon: Code,
      unlocked: true,
      popular: true,
      features: ['Advanced Analytics', 'Cloud Build', 'Unity Teams']
    },
    {
      id: 2,
      name: 'Photoshop Creative Suite',
      description: 'Complete design toolkit for game assets and UI creation',
      category: 'Design',
      originalPrice: '$600/year',
      discountedPrice: '$300/year',
      discount: '50%',
      rating: 4.8,
      icon: Palette,
      unlocked: true,
      popular: false,
      features: ['Photoshop', 'Illustrator', 'After Effects']
    },
    {
      id: 3,
      name: 'FMOD Studio',
      description: 'Professional audio middleware for interactive audio',
      category: 'Audio',
      originalPrice: '$500',
      discountedPrice: '$250',
      discount: '50%',
      rating: 4.7,
      icon: Music,
      unlocked: false,
      popular: false,
      features: ['3D Audio', 'Real-time Mixing', 'Cross-platform']
    },
    {
      id: 4,
      name: 'Stable Diffusion Pro',
      description: 'AI-powered image generation for game concept art',
      category: 'AI Tools',
      originalPrice: '$200/month',
      discountedPrice: '$100/month',
      discount: '50%',
      rating: 4.6,
      icon: Image,
      unlocked: false,
      popular: true,
      features: ['Custom Models', 'Batch Generation', 'Commercial License']
    }
  ];

  const affiliateStats = [
    { label: 'Total Commissions', value: '$1,240', color: 'text-green-500' },
    { label: 'Active Referrals', value: '23', color: 'text-blue-500' },
    { label: 'Conversion Rate', value: '12%', color: 'text-purple-500' },
    { label: 'This Month', value: '$340', color: 'text-yellow-500' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Game Engine': return 'bg-blue-600';
      case 'Design': return 'bg-purple-600';
      case 'Audio': return 'bg-green-600';
      case 'AI Tools': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Tools & Offers</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Crown className="mr-2" size={16} />
          Upgrade Tier
        </Button>
      </div>

      {/* Affiliate Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {affiliateStats.map((stat, index) => (
          <Card key={index} className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tool Categories Filter */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Game Engine', 'Design', 'Audio', 'AI Tools'].map((category) => (
          <Button
            key={category}
            variant={category === 'All' ? 'default' : 'outline'}
            className={category === 'All' 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'border-gray-600 text-gray-300 hover:bg-gray-800'
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card key={tool.id} className={`bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all ${!tool.unlocked ? 'opacity-75' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <Icon className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-white">{tool.name}</h3>
                        {tool.popular && (
                          <Badge className="bg-yellow-600 text-white">
                            <Star size={12} className="mr-1" />
                            Popular
                          </Badge>
                        )}
                        {!tool.unlocked && (
                          <Badge className="bg-red-600 text-white">
                            Locked
                          </Badge>
                        )}
                      </div>
                      <Badge className={`${getCategoryColor(tool.category)} text-white mt-1`}>
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center text-yellow-500 mb-1">
                      <Star size={14} className="mr-1" />
                      {tool.rating}
                    </div>
                    <Badge className="bg-green-600 text-white">
                      -{tool.discount}
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{tool.description}</p>

                <div className="space-y-2 mb-4">
                  <h4 className="text-white font-medium">Features:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Zap size={12} className="mr-2 text-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-gray-400 line-through text-sm">{tool.originalPrice}</span>
                    <span className="text-green-400 font-bold text-lg ml-2">{tool.discountedPrice}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {tool.unlocked ? (
                    <>
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        <Download className="mr-2" size={16} />
                        Get Tool
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <ExternalLink size={16} />
                      </Button>
                    </>
                  ) : (
                    <Button 
                      className="flex-1 bg-gray-600 hover:bg-gray-700"
                      disabled
                    >
                      <Crown className="mr-2" size={16} />
                      Unlock at Rank #{tool.id * 50}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Unlock Info */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Crown className="mr-2 text-yellow-500" />
            Unlock More Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-2">How to Unlock:</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Climb the waitlist rankings</li>
                <li>• Earn more G-Chips through activities</li>
                <li>• Complete special challenges</li>
                <li>• Refer friends to move up faster</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Coming Soon:</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Blender Professional Suite</li>
                <li>• GameMaker Studio Premium</li>
                <li>• Substance 3D Collection</li>
                <li>• More AI-powered tools</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolsOffers;
