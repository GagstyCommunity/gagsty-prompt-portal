
import React from 'react';
import { Coins } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';

interface DynamicChipsDisplayProps {
  showLabel?: boolean;
  className?: string;
}

const DynamicChipsDisplay: React.FC<DynamicChipsDisplayProps> = ({ 
  showLabel = true, 
  className = "" 
}) => {
  const { profile, loading } = useUserData();

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Coins className="text-yellow-500 animate-pulse" size={20} />
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }

  const chips = profile?.gagsty_chips || 0;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Coins className="text-yellow-500" size={20} />
      <span className="text-white font-semibold">
        {chips.toLocaleString()}
        {showLabel && <span className="text-gray-400 ml-1">Chips</span>}
      </span>
    </div>
  );
};

export default DynamicChipsDisplay;
