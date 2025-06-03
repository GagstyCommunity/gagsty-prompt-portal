
import React, { useState } from 'react';
import EnhancedHeader from '../components/navigation/EnhancedHeader';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Wand2, 
  Gamepad2, 
  DollarSign,
  Play,
  Code,
  Palette,
  Share2,
  Trophy,
  Users,
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Describe Your Game',
      description: 'Simply type what kind of game you want to create. Be as detailed or as simple as you like.',
      example: '"Create a puzzle platformer where the player controls gravity to navigate floating islands"',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: 'AI Builds Your Game',
      description: 'Our AI understands your concept and generates all the game mechanics, art, and code needed.',
      example: 'AI creates game physics, character controller, level design, and visual assets',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Play & Iterate',
      description: 'Test your game immediately and refine it with additional prompts until it\'s perfect.',
      example: 'Request changes like "Add power-ups" or "Make the character jump higher"',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Publish & Earn',
      description: 'Launch your game on our marketplace and earn 60% of all revenue it generates.',
      example: 'Players discover and play your game, you earn G-Chips for every play session',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'No Coding Required',
      description: 'Create complex games using natural language - no programming knowledge needed.'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'AI-Generated Art',
      description: 'Get beautiful game assets created automatically to match your game\'s style.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Iteration',
      description: 'Make changes to your game in real-time with simple text commands.'
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: 'Built-in Distribution',
      description: 'Your games are automatically published to our growing player community.'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Ownership Rights',
      description: 'You retain full ownership and intellectual property rights to your creations.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Feedback',
      description: 'Get instant feedback from players and other creators to improve your games.'
    }
  ];

  const gameTypes = [
    {
      category: 'Puzzle Games',
      examples: ['Match-3', 'Block Puzzles', 'Word Games', 'Logic Puzzles'],
      difficulty: 'Beginner Friendly',
      earnings: '$50-500/month'
    },
    {
      category: 'Action Games',
      examples: ['Platformers', 'Shooters', 'Fighting', 'Racing'],
      difficulty: 'Intermediate',
      earnings: '$200-2000/month'
    },
    {
      category: 'Strategy Games',
      examples: ['Tower Defense', 'City Builders', 'Turn-based', 'Real-time Strategy'],
      difficulty: 'Advanced',
      earnings: '$500-5000/month'
    },
    {
      category: 'Simulation Games',
      examples: ['Life Sim', 'Business Sim', 'Farming', 'Management'],
      difficulty: 'Intermediate',
      earnings: '$300-3000/month'
    }
  ];

  return (
    <div className="min-h-screen bg-gagsty-deep text-gagsty-primary">
      <EnhancedHeader />
      
      <div className="relative pt-16">
        {/* Background effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-emerald-900/20 pointer-events-none" />
        
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="gagsty-badge-primary px-4 py-2 mb-6">
                <Play className="mr-2" size={16} />
                How It Works
              </Badge>
              
              <h1 className="display-xl mb-6">
                From <span className="text-gagsty-gradient">Idea to Game</span> in Minutes
              </h1>
              
              <p className="text-xl text-gagsty-secondary max-w-3xl mx-auto leading-relaxed mb-8">
                Our AI-powered platform transforms your creative ideas into fully playable games. 
                No coding, no complex tools - just your imagination and our technology.
              </p>
              
              <Button className="btn-gagsty-primary text-lg px-8 py-4">
                <MessageSquare className="mr-2" size={20} />
                Start Creating Now
              </Button>
            </div>
          </section>

          {/* Step-by-Step Process */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">The Creation Process</h2>
                <p className="text-xl text-gagsty-secondary">Four simple steps from concept to published game</p>
              </div>

              {/* Interactive Steps */}
              <div className="grid lg:grid-cols-4 gap-8 mb-12">
                {steps.map((step, index) => (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all duration-300 gagsty-lift-hover ${
                      activeStep === index 
                        ? 'border-[#A084FF] shadow-2xl shadow-[#A084FF]/30 scale-105' 
                        : 'hover:border-[#A084FF]/50'
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-4 text-white`}>
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-gagsty-primary">{step.title}</h3>
                      <p className="text-gagsty-secondary text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Active Step Details */}
              <Card className="border-[#A084FF]/30 bg-gradient-to-br from-[#181A20] to-[#1A1D23]">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${steps[activeStep].color} flex items-center justify-center text-white flex-shrink-0`}>
                      {steps[activeStep].icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-display font-bold mb-4 text-gagsty-primary">{steps[activeStep].title}</h3>
                      <p className="text-gagsty-secondary mb-4 leading-relaxed">{steps[activeStep].description}</p>
                      <div className="bg-[#121212]/50 rounded-lg p-4 border border-[#262A34]">
                        <p className="text-[#16FF6F] text-sm font-medium mb-2">Example:</p>
                        <p className="text-gagsty-secondary italic">{steps[activeStep].example}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Key Features */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Powerful Features</h2>
                <p className="text-xl text-gagsty-secondary">Everything you need to create amazing games</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="gagsty-lift-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-emerald-600 flex items-center justify-center text-white flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2 text-gagsty-primary">{feature.title}</h4>
                          <p className="text-gagsty-secondary text-sm leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Game Types & Earning Potential */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What Can You Create?</h2>
                <p className="text-xl text-gagsty-secondary">Explore different game genres and their earning potential</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {gameTypes.map((type, index) => (
                  <Card key={index} className="gagsty-lift-hover">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-3 text-gagsty-primary">{type.category}</h4>
                      
                      <div className="space-y-3 mb-4">
                        {type.examples.map((example, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-[#16FF6F] flex-shrink-0" />
                            <span className="text-sm text-gagsty-secondary">{example}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        <Badge className="gagsty-badge-primary text-xs">
                          {type.difficulty}
                        </Badge>
                        <div className="text-[#16FF6F] font-semibold text-sm">
                          {type.earnings}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive Demo Preview */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-[#A084FF]/30 bg-gradient-to-br from-[#181A20] to-[#1A1D23]">
                <CardContent className="p-8 text-center">
                  <Gamepad2 className="w-16 h-16 text-[#A084FF] mx-auto mb-6" />
                  <h3 className="text-2xl font-display font-bold mb-4 text-gagsty-primary">Ready to See It in Action?</h3>
                  <p className="text-gagsty-secondary mb-6 leading-relaxed">
                    Try our interactive demo to experience the full game creation process. 
                    Create a simple game in under 5 minutes and see how easy it really is.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="btn-gagsty-primary text-lg px-8 py-4">
                      <Play className="mr-2" size={20} />
                      Try Interactive Demo
                    </Button>
                    <Button className="btn-gagsty-secondary text-lg px-8 py-4">
                      <ArrowRight className="mr-2" size={20} />
                      Join Waitlist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Preview */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Common Questions</h2>
                <p className="text-xl text-gagsty-secondary">Quick answers to help you get started</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="gagsty-lift-hover">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-3 text-gagsty-primary">Do I need coding experience?</h4>
                    <p className="text-gagsty-secondary text-sm leading-relaxed">
                      Not at all! Our platform is designed for creators without technical backgrounds. 
                      Just describe your game idea in natural language.
                    </p>
                  </CardContent>
                </Card>

                <Card className="gagsty-lift-hover">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-3 text-gagsty-primary">How complex can my games be?</h4>
                    <p className="text-gagsty-secondary text-sm leading-relaxed">
                      From simple puzzles to complex RPGs - our AI can handle a wide range of game types 
                      and mechanics. The more detailed your description, the better.
                    </p>
                  </CardContent>
                </Card>

                <Card className="gagsty-lift-hover">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-3 text-gagsty-primary">How do I earn money?</h4>
                    <p className="text-gagsty-secondary text-sm leading-relaxed">
                      You earn 60% of all revenue from your published games through our G-Chips system. 
                      Players pay to play, and you get paid automatically.
                    </p>
                  </CardContent>
                </Card>

                <Card className="gagsty-lift-hover">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-3 text-gagsty-primary">Can I collaborate with others?</h4>
                    <p className="text-gagsty-secondary text-sm leading-relaxed">
                      Yes! You can invite other creators to collaborate on projects and share revenue 
                      based on contributions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
