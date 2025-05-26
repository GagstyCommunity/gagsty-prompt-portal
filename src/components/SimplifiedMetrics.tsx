
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Star, Calendar, TrendingUp } from 'lucide-react';

const SimplifiedMetrics = () => {
  const metrics = [
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      value: '2,847',
      label: 'Creators Waiting',
      subtext: '+156 this week'
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      value: '8.4K',
      label: 'Game Concepts',
      subtext: 'Created in demo'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
      value: '95%',
      label: 'Satisfaction Rate',
      subtext: 'From beta users'
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-400" />,
      value: '247',
      label: 'Days Until Launch',
      subtext: 'August 30, 2025'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Join the Growing Community
          </h2>
          <p className="text-gray-300">
            Thousands of creators are already building the future of gaming with Gagsty
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-gray-900/50 border-purple-700/50 text-center hover:border-purple-500 transition-colors">
              <CardContent className="p-6">
                <div className="flex justify-center mb-3">
                  {metric.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-gray-300 font-medium mb-1">{metric.label}</div>
                <div className="text-sm text-gray-400">{metric.subtext}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimplifiedMetrics;
