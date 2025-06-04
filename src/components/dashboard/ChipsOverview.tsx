
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Coins, Gift, Target, TrendingUp } from 'lucide-react';

interface ChipsOverviewProps {
  profile: any;
}

const ChipsOverview: React.FC<ChipsOverviewProps> = ({ profile }) => {
  const currentChips = profile?.gagsty_chips || 0;
  const nextRewardThreshold = 1000;
  const progressToNextReward = (currentChips / nextRewardThreshold) * 100;

  const chipsSources = [
    { source: 'Referrals', amount: 0, icon: '👥' },
    { source: 'Prompt Submissions', amount: 0, icon: '💡' },
    { source: 'Profile Completion', amount: 500, icon: '✅' },
    { source: 'Tasks & Events', amount: 0, icon: '🎯' },
  ];

  const upcomingTasks = [
    { task: 'Submit your first game prompt', reward: 100, completed: false },
    { task: 'Invite 3 friends to GAGSTY', reward: 300, completed: false },
    { task: 'Complete your profile', reward: 500, completed: true },
    { task: 'Vote on 5 prompts', reward: 50, completed: false },
  ];

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Coins className="mr-2 text-yellow-500" />
          My Chips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Balance */}
        <div className="text-center p-6 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-600/30">
          <div className="text-4xl font-bold text-yellow-500 mb-2">{currentChips}</div>
          <div className="text-gray-300">Chips Balance</div>
        </div>

        {/* Progress to Next Reward */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Progress to Next Reward</span>
            <span className="text-yellow-500 font-medium">{nextRewardThreshold} Chips</span>
          </div>
          <Progress value={progressToNextReward} className="mb-2" />
          <div className="text-sm text-gray-400">
            {nextRewardThreshold - currentChips} Chips to unlock exclusive tool access
          </div>
        </div>

        {/* Chips Sources */}
        <div>
          <h3 className="text-white font-medium mb-3">Chips Earned From:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {chipsSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{source.icon}</span>
                  <span className="text-gray-300">{source.source}</span>
                </div>
                <span className="text-yellow-500 font-medium">+{source.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <h3 className="text-white font-medium mb-3">Earn More Chips:</h3>
          <div className="space-y-2">
            {upcomingTasks.map((task, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded-lg ${
                  task.completed 
                    ? 'bg-green-900/30 border border-green-800/30' 
                    : 'bg-gray-800/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className={task.completed ? '✅' : '⭕'}>
                    {task.completed ? '✅' : '⭕'}
                  </span>
                  <span className={`${task.completed ? 'text-green-400' : 'text-gray-300'}`}>
                    {task.task}
                  </span>
                </div>
                <span className="text-yellow-500 font-medium">+{task.reward}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Gift className="mr-2" size={16} />
            View Rewards
          </Button>
          <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800">
            <Target className="mr-2" size={16} />
            More Tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChipsOverview;
