
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatBotTriggerProps {
  onClick: () => void;
}

const ChatBotTrigger: React.FC<ChatBotTriggerProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 active:scale-95 group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <MessageCircle size={24} className="text-white group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      {/* Pulse animation rings */}
      <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping opacity-75" />
      <div className="absolute inset-2 rounded-full border border-pink-400 animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
    </button>
  );
};

export default ChatBotTrigger;
