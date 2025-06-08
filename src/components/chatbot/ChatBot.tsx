
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import { PremiumCard } from '@/components/ui/premium-card';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Gagsty assistant. I can help you with creating games, understanding our platform, or answering any questions about Web3 gaming. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    "How do I create a game?",
    "What are Gagsty chips?",
    "Tell me about prompt battles",
    "How does the platform work?",
    "What's the difference between free and premium?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('create') || lowerMessage.includes('game') || lowerMessage.includes('prompt')) {
      return "Creating games on Gagsty is simple! Just use our AI-powered prompt system. Type your game idea in natural language, and our AI will generate a playable Web3 game. You can then share it with the community, earn chips through votes, and even monetize your creations!";
    } else if (lowerMessage.includes('chip') || lowerMessage.includes('earn') || lowerMessage.includes('reward')) {
      return "Gagsty chips are our platform currency! You earn them by: 1) Creating popular games that get votes, 2) Participating in prompt battles, 3) Completing community challenges, 4) Referring friends. Use chips to unlock premium features, enter exclusive events, and trade in our marketplace!";
    } else if (lowerMessage.includes('battle') || lowerMessage.includes('competition') || lowerMessage.includes('vs')) {
      return "Prompt battles are exciting competitions where creators submit game prompts around a theme, and the community votes for winners! Battles happen weekly with different themes like 'Retro Arcade', 'Space Adventure', or 'Puzzle Challenge'. Winners earn bonus chips and exclusive badges!";
    } else if (lowerMessage.includes('platform') || lowerMessage.includes('work') || lowerMessage.includes('how')) {
      return "Gagsty combines AI and Web3 to democratize game creation! Our platform uses advanced AI to turn text prompts into playable games. Every game is tokenized as an NFT, creators maintain ownership, and the community governs through voting. It's gaming, creativity, and blockchain combined!";
    } else if (lowerMessage.includes('premium') || lowerMessage.includes('free') || lowerMessage.includes('plan') || lowerMessage.includes('difference')) {
      return "Free users can create up to 5 games/month and participate in all community features. Premium unlocks unlimited game creation, advanced AI models, priority support, exclusive events, marketplace access, and revenue sharing from your popular games. Perfect for serious creators!";
    } else if (lowerMessage.includes('nft') || lowerMessage.includes('blockchain') || lowerMessage.includes('web3')) {
      return "Every game created on Gagsty is automatically minted as an NFT on our eco-friendly blockchain. This means you truly own your creations! You can trade them, sell them, or use them as collateral. We handle all the technical complexity - you just focus on creating amazing games!";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('stuck')) {
      return "I'm here to help! You can also: 1) Check our comprehensive documentation, 2) Join our Discord community for peer support, 3) Watch our tutorial videos, 4) Contact our support team for technical issues. What specific area do you need help with?";
    } else {
      return "That's a great question! I'm continuously learning to better assist you. For now, I can help you with game creation, platform features, earning chips, prompt battles, and general platform questions. Is there something specific about Gagsty you'd like to know more about?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setInputText(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <PremiumCard 
        variant="glass" 
        className={`transition-all duration-500 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Gagsty Assistant</h3>
              <p className="text-xs text-white/60">
                {isTyping ? 'Typing...' : 'Online'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMinimized ? <Maximize2 size={16} className="text-white/70" /> : <Minimize2 size={16} className="text-white/70" />}
            </button>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={16} className="text-white/70" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isBot 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                        : 'bg-gradient-to-r from-green-500 to-teal-500'
                    }`}>
                      {message.isBot ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
                    </div>
                    <div className={`rounded-2xl p-3 ${
                      message.isBot 
                        ? 'bg-white/10 text-white' 
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-white/10">
                <p className="text-xs text-white/60 mb-3">Quick questions:</p>
                <div className="space-y-2">
                  {quickActions.slice(0, 3).map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      className="w-full text-left p-2 text-xs bg-white/5 hover:bg-white/10 rounded-lg text-white/80 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <PremiumButton
                  variant="premium"
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="w-10 h-10"
                >
                  <Send size={16} />
                </PremiumButton>
              </div>
            </div>
          </>
        )}
      </PremiumCard>
    </div>
  );
};

export default ChatBot;
