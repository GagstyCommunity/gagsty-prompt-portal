
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GamepadIcon, 
  Menu, 
  X, 
  Users, 
  Trophy, 
  BookOpen,
  Zap,
  User,
  LogOut,
  Settings,
  Crown
} from 'lucide-react';

const EnhancedHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { 
      name: 'Community', 
      path: '/community', 
      icon: Users,
      description: 'Join creators worldwide',
      isNew: true
    },
    { 
      name: 'Submit', 
      path: '/submit', 
      icon: Zap,
      description: 'Share your game idea'
    },
    { 
      name: 'Leaderboard', 
      path: '/leaderboard', 
      icon: Trophy,
      description: 'Top creators & prompts'
    },
    { 
      name: 'Insights', 
      path: '/insights', 
      icon: BookOpen,
      description: 'Guides & resources',
      isNew: true
    }
  ];

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gagsty-deep/95 backdrop-blur-md border-b border-[#262A34]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="p-2 rounded-lg bg-gradient-to-r from-[#A084FF] via-[#00C6FB] to-[#16FF6F] group-hover:scale-105 transition-transform">
              <GamepadIcon className="w-6 h-6 text-[#121212]" />
            </div>
            <div>
              <span className="text-xl font-bold text-gagsty-gradient">GAGSTY</span>
              <div className="text-xs text-gagsty-secondary">AI Game Creator</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => navigate(item.path)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all hover:bg-[#262A34] group ${
                      isActivePath(item.path) 
                        ? 'bg-[#262A34] text-[#00C6FB]' 
                        : 'text-gagsty-secondary hover:text-gagsty-primary'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{item.name}</span>
                    {item.isNew && (
                      <Badge className="gagsty-badge-success text-xs ml-1">New</Badge>
                    )}
                  </button>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-[#1A1D24] text-gagsty-secondary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {item.description}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#262A34] transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[#A084FF] to-[#00C6FB] rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-gagsty-primary">
                      {user.user_metadata?.full_name || 'Creator'}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gagsty-secondary">1,250 G-Chips</div>
                      <Crown className="w-3 h-3 text-[#FFB800]" />
                    </div>
                  </div>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-[#1A1D24] border border-[#262A34] rounded-lg shadow-xl z-50">
                    <div className="p-4 border-b border-[#262A34]">
                      <div className="text-sm font-medium text-gagsty-primary mb-1">
                        {user.user_metadata?.full_name || 'Creator'}
                      </div>
                      <div className="text-xs text-gagsty-secondary">{user.email}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gagsty-secondary">Waitlist Position:</span>
                        <Badge className="gagsty-badge-primary text-xs">#124</Badge>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <button
                        onClick={() => {
                          navigate('/dashboard');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 p-2 rounded hover:bg-[#262A34] transition-colors"
                      >
                        <User size={16} className="text-gagsty-secondary" />
                        <span className="text-gagsty-primary">Dashboard</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate('/welcome');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 p-2 rounded hover:bg-[#262A34] transition-colors"
                      >
                        <Crown size={16} className="text-[#FFB800]" />
                        <span className="text-gagsty-primary">Referrals</span>
                      </button>
                      
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-3 p-2 rounded hover:bg-[#262A34] transition-colors"
                      >
                        <LogOut size={16} className="text-gagsty-secondary" />
                        <span className="text-gagsty-primary">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => navigate('/auth')}
                  className="btn-gagsty-secondary"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/submit')}
                  className="btn-gagsty-primary hidden sm:inline-flex"
                >
                  Get Early Access
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#262A34] transition-colors"
            >
              {isMenuOpen ? (
                <X size={24} className="text-gagsty-primary" />
              ) : (
                <Menu size={24} className="text-gagsty-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#262A34]">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isActivePath(item.path)
                        ? 'bg-[#262A34] text-[#00C6FB]'
                        : 'text-gagsty-secondary hover:bg-[#262A34] hover:text-gagsty-primary'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                    {item.isNew && (
                      <Badge className="gagsty-badge-success text-xs ml-auto">New</Badge>
                    )}
                  </button>
                );
              })}
            </nav>
            
            {!user && (
              <div className="mt-4 pt-4 border-t border-[#262A34] space-y-2">
                <Button
                  onClick={() => {
                    navigate('/auth');
                    setIsMenuOpen(false);
                  }}
                  className="btn-gagsty-secondary w-full"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    navigate('/submit');
                    setIsMenuOpen(false);
                  }}
                  className="btn-gagsty-primary w-full"
                >
                  Get Early Access
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default EnhancedHeader;
