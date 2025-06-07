
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Coins, Gift, Target, TrendingUp, Calendar, Trophy, Star, Zap } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';

interface ChipsOverviewProps {
  profile: any;
}

const ChipsOverview: React.FC<ChipsOverviewProps> = ({ profile }) => {
  const [currentChips, setCurrentChips] = useState(profile?.gagsty_chips || 0);
  const [chipsTrend, setChipsTrend] = useState({ direction: 'up', percentage: 15 });
  const [nextReward, setNextReward] = useState({ threshold: 1000, reward: 'Premium Tool Access' });
  
  useEffect(() => {
    setCurrentChips(profile?.gagsty_chips || 0);
  }, [profile?.gagsty_chips]);

  // Calculate progress and projections
  const progressToNextReward = Math.min((currentChips / nextReward.threshold) * 100, 100);
  const chipsToNext = Math.max(0, nextReward.threshold - currentChips);
  const weeklyEarning = 50; // Estimated weekly earning
  const weeksToGoal = chipsToNext > 0 ? Math.ceil(chipsToNext / weeklyEarning) : 0;

  const chipsSources = [
    { source: 'Profile Completion', amount: 500, icon: '✅', status: 'completed', color: 'bg-green-600' },
    { source: 'First Prompt Submission', amount: 100, icon: '💡', status: 'available', color: 'bg-blue-600' },
    { source: 'Referral Bonuses', amount: 0, icon: '👥', status: 'pending', color: 'bg-purple-600' },
    { source: 'Event Participation', amount: 0, icon: '🎯', status: 'available', color: 'bg-orange-600' },
    { source: 'Daily Login Streak', amount: 25, icon: '🔥', status: 'available', color: 'bg-red-600' },
    { source: 'Community Votes', amount: 0, icon: '👍', status: 'available', color: 'bg-yellow-600' },
  ];

  const upcomingTasks = [
    { 
      task: 'Submit your first game prompt', 
      reward: 100, 
      completed: false, 
      difficulty: 'Easy',
      timeEstimate: '10 min',
      priority: 'high'
    },
    { 
      task: 'Invite 3 friends to GAGSTY', 
      reward: 300, 
      completed: false, 
      difficulty: 'Medium',
      timeEstimate: '1 day',
      priority: 'medium'
    },
    { 
      task: 'Complete your profile', 
      reward: 500, 
      completed: true, 
      difficulty: 'Easy',
      timeEstimate: '5 min',
      priority: 'high'
    },
    { 
      task: 'Vote on 5 community prompts', 
      reward: 50, 
      completed: false, 
      difficulty: 'Easy',
      timeEstimate: '15 min',
      priority: 'low'
    },
    { 
      task: 'Complete learning module', 
      reward: 150, 
      completed: false, 
      difficulty: 'Medium',
      timeEstimate: '30 min',
      priority: 'medium'
    },
  ];

  const milestones = [
    { chips: 1000, reward: 'Premium Tools Access', unlocked: currentChips >= 1000 },
    { chips: 2500, reward: 'Beta Features', unlocked: currentChips >= 2500 },
    { chips: 5000, reward: 'VIP Status', unlocked: currentChips >= 5000 },
    { chips: 10000, reward: 'Founder Badge', unlocked: currentChips >= 10000 },
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <Coins className="mr-2 text-yellow-500" />
            Chip Balance & Earnings
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className={`w-4 h-4 ${chipsTrend.direction === 'up' ? 'text-green-400' : 'text-red-400'}`} />
            <span className={`text-sm ${chipsTrend.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              +{chipsTrend.percentage}%
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enhanced Current Balance */}
        <div className="text-center p-6 bg-gradient-to-r from-yellow-600/20 via-orange-600/20 to-yellow-600/20 rounded-xl border border-yellow-600/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 animate-pulse"></div>
          <div className="relative">
            <div className="text-5xl font-bold text-yellow-500 mb-2 font-mono">
              {currentChips.toLocaleString()}
            </div>
            <div className="text-gray-300 mb-2">Gagsty Chips</div>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center text-green-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                Weekly: +{weeklyEarning}
              </div>
              <div className="text-gray-400">
                Rank: #42
              </div>
            </div>
          </div>
        </div>

        {/* Progress to Next Milestone */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-300 font-medium">Next Milestone Progress</span>
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-500 font-medium">{nextReward.reward}</span>
            </div>
          </div>
          <Progress value={progressToNextReward} className="mb-3 h-3" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">
              {chipsToNext > 0 ? `${chipsToNext.toLocaleString()} chips to go` : 'Milestone reached!'}
            </span>
            <span className="text-gray-400">
              {weeksToGoal > 0 ? `~${weeksToGoal} weeks` : 'Unlocked!'}
            </span>
          </div>
        </div>

        {/* Milestone Track */}
        <div>
          <h3 className="text-white font-medium mb-3 flex items-center">
            <Star className="w-4 h-4 mr-2 text-purple-400" />
            Milestone Track
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border text-center transition-all ${
                  milestone.unlocked 
                    ? 'bg-green-900/30 border-green-600/50 text-green-400' 
                    : currentChips >= milestone.chips * 0.8
                    ? 'bg-yellow-900/30 border-yellow-600/50 text-yellow-400'
                    : 'bg-gray-800/30 border-gray-700/50 text-gray-400'
                }`}
              >
                <div className="text-xs font-bold">{milestone.chips.toLocaleString()}</div>
                <div className="text-xs">{milestone.reward}</div>
                {milestone.unlocked && <div className="text-xs">✅</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Earning Sources */}
        <div>
          <h3 className="text-white font-medium mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-blue-400" />
            Earning Sources
          </h3>
          <div className="space-y-2">
            {chipsSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{source.icon}</span>
                  <div>
                    <span className={`text-sm ${source.status === 'completed' ? 'text-green-400' : 'text-gray-300'}`}>
                      {source.source}
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        className={`text-xs ${source.color} text-white`}
                        variant="secondary"
                      >
                        {source.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <span className={`font-medium ${source.amount > 0 ? 'text-yellow-500' : 'text-gray-500'}`}>
                  +{source.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Task List */}
        <div>
          <h3 className="text-white font-medium mb-3 flex items-center justify-between">
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-2 text-orange-400" />
              Earning Opportunities
            </div>
            <span className="text-xs text-gray-400">Sorted by Priority</span>
          </h3>
          <div className="space-y-3">
            {upcomingTasks
              .sort((a, b) => {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
              })
              .map((task, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border transition-all ${
                  task.completed 
                    ? 'bg-green-900/20 border-green-800/30' 
                    : task.priority === 'high'
                    ? 'bg-red-900/20 border-red-800/30'
                    : task.priority === 'medium'
                    ? 'bg-yellow-900/20 border-yellow-800/30'
                    : 'bg-gray-800/50 border-gray-700/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-lg">
                      {task.completed ? '✅' : '⭕'}
                    </span>
                    <div className="flex-1">
                      <span className={`font-medium ${task.completed ? 'text-green-400 line-through' : 'text-gray-300'}`}>
                        {task.task}
                      </span>
                      <div className="flex items-center space-x-3 mt-2 text-xs">
                        <Badge variant="secondary" className={`${
                          task.priority === 'high' ? 'bg-red-600' :
                          task.priority === 'medium' ? 'bg-yellow-600' : 'bg-gray-600'
                        } text-white`}>
                          {task.priority}
                        </Badge>
                        <span className="text-gray-400">⏱️ {task.timeEstimate}</span>
                        <span className="text-gray-400">📊 {task.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-yellow-500 font-bold">+{task.reward}</span>
                    {!task.completed && (
                      <Button 
                        size="sm" 
                        className="ml-3 bg-blue-600 hover:bg-blue-700"
                      >
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="flex flex-col space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <EnhancedButton 
              variant="primary" 
              size="default"
              className="flex-1"
            >
              <Gift className="mr-2" size={16} />
              View Rewards
            </EnhancedButton>
            <EnhancedButton 
              variant="secondary" 
              size="default"
              className="flex-1"
            >
              <Calendar className="mr-2" size={16} />
              Earning Calendar
            </EnhancedButton>
          </div>
          <EnhancedButton 
            variant="tertiary" 
            size="default"
            className="w-full"
          >
            <Target className="mr-2" size={16} />
            Explore More Tasks
          </EnhancedButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChipsOverview;
