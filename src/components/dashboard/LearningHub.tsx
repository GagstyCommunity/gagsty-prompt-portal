
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, Clock, Star, Bookmark, TrendingUp } from 'lucide-react';

const LearningHub: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: 'AI Game Development Fundamentals',
      description: 'Learn the basics of creating games with AI assistance',
      duration: '2 hours',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolled: 1240,
      image: '/placeholder.svg',
      progress: 75,
      bookmarked: true
    },
    {
      id: 2,
      title: 'Advanced Prompt Engineering',
      description: 'Master the art of crafting effective AI prompts',
      duration: '3 hours',
      difficulty: 'Advanced',
      rating: 4.9,
      enrolled: 856,
      image: '/placeholder.svg',
      progress: 0,
      bookmarked: false
    },
    {
      id: 3,
      title: 'Game Monetization Strategies',
      description: 'Unlock revenue streams for your games',
      duration: '1.5 hours',
      difficulty: 'Intermediate',
      rating: 4.7,
      enrolled: 642,
      image: '/placeholder.svg',
      progress: 100,
      bookmarked: true
    }
  ];

  const recentlyViewed = [
    { title: 'Unity Integration Guide', time: '2 hours ago' },
    { title: 'Unreal Engine Basics', time: '1 day ago' },
    { title: 'Mobile Game Optimization', time: '3 days ago' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600';
      case 'Intermediate': return 'bg-yellow-600';
      case 'Advanced': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Learning Hub</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <BookOpen className="mr-2" size={16} />
          Browse All Courses
        </Button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="text-blue-500" size={24} />
              <div>
                <h3 className="text-white font-semibold">Courses Enrolled</h3>
                <p className="text-2xl font-bold text-blue-500">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="text-green-500" size={24} />
              <div>
                <h3 className="text-white font-semibold">Completion Rate</h3>
                <p className="text-2xl font-bold text-green-500">67%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Star className="text-yellow-500" size={24} />
              <div>
                <h3 className="text-white font-semibold">Certificates</h3>
                <p className="text-2xl font-bold text-yellow-500">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Courses */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {course.bookmarked && (
                  <Bookmark className="absolute top-2 right-2 text-yellow-500 fill-current" size={20} />
                )}
                {course.progress > 0 && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/50 rounded p-2">
                      <div className="flex justify-between text-xs text-white mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1">
                        <div 
                          className="bg-blue-500 h-1 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={`${getDifficultyColor(course.difficulty)} text-white text-xs`}>
                    {course.difficulty}
                  </Badge>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <Star size={14} className="mr-1" />
                    {course.rating}
                  </div>
                </div>
                
                <h3 className="text-white font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{course.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    {course.duration}
                  </div>
                  <span>{course.enrolled} enrolled</span>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Play size={14} className="mr-2" />
                  {course.progress > 0 ? 'Continue' : 'Start Course'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recently Viewed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentlyViewed.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">{item.title}</span>
                <span className="text-gray-500 text-sm">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningHub;
