
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EnhancedButton } from './enhanced-button';
import { CheckCircle, Share2, Trophy } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  showShare?: boolean;
  type?: 'success' | 'achievement' | 'info';
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  actionText,
  onAction,
  showShare,
  type = 'success'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />;
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />;
      default:
        return <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        <DialogHeader>
          <div className="text-center">
            {getIcon()}
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              {title}
            </DialogTitle>
            <p className="text-gray-300 mb-6">{message}</p>
          </div>
        </DialogHeader>
        
        <div className="flex flex-col gap-3">
          {actionText && onAction && (
            <EnhancedButton
              variant="primary"
              size="lg"
              onClick={onAction}
              className="w-full"
            >
              {actionText}
            </EnhancedButton>
          )}
          
          {showShare && (
            <EnhancedButton
              variant="secondary"
              size="default"
              onClick={() => {
                // Implement share functionality
                if (navigator.share) {
                  navigator.share({
                    title: title,
                    text: message,
                    url: window.location.href
                  });
                }
              }}
              className="w-full"
            >
              <Share2 className="mr-2" size={16} />
              Share Achievement
            </EnhancedButton>
          )}
          
          <EnhancedButton
            variant="ghost"
            onClick={onClose}
            className="w-full text-gray-400 hover:text-white"
          >
            Close
          </EnhancedButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
