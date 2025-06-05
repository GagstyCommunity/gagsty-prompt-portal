
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Heart, MessageSquare, Share2, Flag, TrendingUp, Award } from 'lucide-react';

interface VotingSystemProps {
  promptId: string;
  initialVotes: number;
  initialComments: number;
  viralScore: number;
  onVoteChange?: (newVotes: number) => void;
}

const VotingSystem: React.FC<VotingSystemProps> = ({
  promptId,
  initialVotes,
  initialComments,
  viralScore,
  onVoteChange
}) => {
  const { user } = useAuth();
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleVote = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to vote on prompts",
        variant: "destructive",
      });
      return;
    }

    if (hasVoted) {
      toast({
        title: "Already voted",
        description: "You can only vote once per prompt",
        variant: "destructive",
      });
      return;
    }

    // Simulate voting API call
    const newVotes = votes + 1;
    setVotes(newVotes);
    setHasVoted(true);
    onVoteChange?.(newVotes);

    toast({
      title: "Vote recorded!",
      description: "Thanks for supporting this creator",
    });
  };

  const handleShare = () => {
    setIsSharing(true);
    const shareUrl = `${window.location.origin}/prompt/${promptId}`;
    const shareText = "Check out this amazing game concept on GAGSTY!";
    
    if (navigator.share) {
      navigator.share({
        title: shareText,
        url: shareUrl,
      }).catch(() => {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Share link copied to clipboard",
        });
      }).finally(() => {
        setIsSharing(false);
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share link copied to clipboard",
      });
      setIsSharing(false);
    }
  };

  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "Thank you for helping us maintain quality content",
    });
  };

  const getViralScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#16FF6F]';
    if (score >= 60) return 'text-[#FFB800]';
    if (score >= 40) return 'text-[#00C6FB]';
    return 'text-gagsty-secondary';
  };

  const getViralScoreLabel = (score: number) => {
    if (score >= 80) return 'Viral';
    if (score >= 60) return 'Hot';
    if (score >= 40) return 'Rising';
    return 'New';
  };

  return (
    <div className="flex items-center justify-between p-4 border-t border-[#262A34]">
      {/* Voting & Engagement */}
      <div className="flex items-center space-x-6">
        <button
          onClick={handleVote}
          className={`flex items-center space-x-2 transition-all hover:scale-105 ${
            hasVoted 
              ? 'text-[#FF61F6]' 
              : 'text-gagsty-secondary hover:text-[#FF61F6]'
          }`}
        >
          <Heart size={20} className={hasVoted ? 'fill-current' : ''} />
          <span className="font-medium">{votes}</span>
        </button>

        <div className="flex items-center space-x-2 text-gagsty-secondary">
          <MessageSquare size={20} />
          <span>{initialComments}</span>
        </div>

        <Badge className={`text-xs ${getViralScoreColor(viralScore)} bg-transparent border-current`}>
          <TrendingUp size={12} className="mr-1" />
          {getViralScoreLabel(viralScore)} {viralScore}
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <Button
          onClick={handleShare}
          variant="ghost"
          size="sm"
          disabled={isSharing}
          className="text-gagsty-secondary hover:text-[#00C6FB]"
        >
          <Share2 size={16} />
        </Button>

        <Button
          onClick={handleReport}
          variant="ghost"
          size="sm"
          className="text-gagsty-muted hover:text-[#FF3D5A]"
        >
          <Flag size={16} />
        </Button>

        {votes > 100 && (
          <Badge className="gagsty-badge-success text-xs">
            <Award size={12} className="mr-1" />
            Top Rated
          </Badge>
        )}
      </div>
    </div>
  );
};

export default VotingSystem;
