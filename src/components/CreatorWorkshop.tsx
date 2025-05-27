import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Trophy, 
  Star, 
  Users, 
  Clock, 
  Zap, 
  Target,
  Award,
  Crown,
  Flame,
  TrendingUp
} from 'lucide-react';

const CreatorWorkshop = () => {
  const [activeChallenge, setActiveChallenge] = useState(0);

  const creatorLevels = [
    { level: 'Apprentice', prompts: 0, maxPrompts: 3, color: 'bg-gray-600' },
    { level: 'Creator', prompts: 3, maxPrompts: 10, color: 'bg-blue-600' },
    { level: 'Architect', prompts: 10, maxPrompts: 25, color: 'bg-purple-600' },
    { level: 'Master', prompts: 25, maxPrompts: 50, color: 'bg-emerald-600' },
    { level: 'Legend', prompts: 50, maxPrompts: 100, color: 'bg-yellow-600' }
  ];

  const weeklyChallenge = {
    title: "Time Travel & Cooking Fusion",
    description: "Create a game that combines time travel mechanics with cooking gameplay",
    timeLeft: "3 days, 14 hours",
    participants: 347,
    submissions: 89,
    reward: "500 G-Chips + Temporal Chef Badge"
  };

  const skillTrees = [
    {
      name: 'Adventure Creator',
      icon: '🗺️',
      progress: 60,
      unlocked: ['Character Design', 'World Building'],
      locked: ['Quest Systems', 'Dialogue Trees']
    },
    {
      name: 'Puzzle Master',
      icon: '🧩',
      progress: 30,
      unlocked: ['Logic Patterns'],
      locked: ['Difficulty Scaling', 'Hint Systems', 'Meta Puzzles']
    },
    {
      name: 'Strategy Architect',
      icon: '⚔️',
      progress: 0,
      unlocked: [],
      locked: ['Resource Management', 'Unit Design', 'Economy Systems']
    }
  ];

  const achievements = [
    { name: 'First Concept', description: 'Submit your first game concept', earned: true, icon: '🌟' },
    { name: 'Genre Pioneer', description: 'Create concepts in 3 different genres', earned: true, icon: '🏆' },
    { name: 'Community Favorite', description: 'Get 10 votes on a single concept', earned: false, icon: '❤️' },
    { name: 'Prolific Creator', description: 'Submit 10 game concepts', earned: false, icon: '🚀' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Creator Workshop
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            From spectator to creator - Start building your game empire today
          </p>
          <Badge className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-4 py-2">
            <Flame className="mr-2" size={16} />
            2,847 Creators Already Building
          </Badge>
        </div>

        {/* Creator Level Progress */}
        <Card className="bg-gray-900/50 border-purple-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Crown className="mr-2 text-yellow-500" size={24} />
              Creator Level: Apprentice (Level 1)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Progress to Creator (Level 2)</span>
                <span className="text-purple-300">1/3 concepts submitted</span>
              </div>
              <Progress value={33} className="h-3" />
              <div className="flex justify-between text-sm text-gray-400">
                <span>Submit 2 more concepts to level up</span>
                <span>+200 G-Chips reward</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Challenge */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 border-purple-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="mr-2 text-emerald-400" size={24} />
              Weekly Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{weeklyChallenge.title}</h3>
                <p className="text-gray-300 mb-4">{weeklyChallenge.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="mr-1" size={16} />
                    {weeklyChallenge.timeLeft}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1" size={16} />
                    {weeklyChallenge.participants} participating
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="bg-emerald-900/30 p-4 rounded-lg border border-emerald-700/50 mb-4">
                  <div className="text-emerald-300 font-semibold mb-1">Challenge Reward:</div>
                  <div className="text-emerald-200">{weeklyChallenge.reward}</div>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700">
                  <Zap className="mr-2" size={16} />
                  Accept Challenge
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skill Trees */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-center">Skill Specializations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillTrees.map((tree, index) => (
                  <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{tree.icon}</span>
                        <span className="text-white font-semibold">{tree.name}</span>
                      </div>
                      <span className="text-purple-300 text-sm">{tree.progress}%</span>
                    </div>
                    <Progress value={tree.progress} className="h-2 mb-2" />
                    <div className="text-sm">
                      <div className="text-green-400">Unlocked: {tree.unlocked.join(', ') || 'None'}</div>
                      <div className="text-gray-500">Next: {tree.locked[0] || 'Mastered'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-center">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${achievement.earned ? 'bg-yellow-900/30 border-yellow-700/50' : 'bg-gray-800/50 border-gray-700'}`}>
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{achievement.icon}</span>
                      <div className="flex-1">
                        <div className={`font-semibold ${achievement.earned ? 'text-yellow-300' : 'text-gray-400'}`}>
                          {achievement.name}
                        </div>
                        <div className="text-sm text-gray-500">{achievement.description}</div>
                      </div>
                      {achievement.earned && (
                        <Badge className="bg-yellow-600 text-white">
                          <Star size={12} />
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Creator Stats */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-center">Your Creator Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">1</div>
                  <div className="text-gray-300">Concepts Created</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-emerald-400">247</div>
                    <div className="text-xs text-gray-400">Community Votes</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-400">12</div>
                    <div className="text-xs text-gray-400">Shares</div>
                  </div>
                </div>

                <div className="bg-purple-900/30 p-3 rounded-lg border border-purple-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300 text-sm">Creator Rank</span>
                    <div className="flex items-center">
                      <TrendingUp className="mr-1 text-purple-400" size={14} />
                      <span className="text-purple-400 font-bold">#432</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700">
                  <Award className="mr-2" size={16} />
                  View Full Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-16 text-lg">
            <Zap className="mr-2" size={20} />
            Submit New Concept
          </Button>
          <Button variant="outline" className="border-emerald-600 text-emerald-300 hover:bg-emerald-600/20 h-16 text-lg">
            <Users className="mr-2" size={20} />
            Browse Community
          </Button>
          <Button variant="outline" className="border-yellow-600 text-yellow-300 hover:bg-yellow-600/20 h-16 text-lg">
            <Trophy className="mr-2" size={20} />
            Leaderboard
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CreatorWorkshop;
