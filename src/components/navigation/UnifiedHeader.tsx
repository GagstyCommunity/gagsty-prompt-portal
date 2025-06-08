
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  ChevronDown, 
  GamepadIcon, 
  Shield, 
  User,
  LogOut,
  Crown,
  Bell,
  Search,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DynamicChipsDisplay from '../dynamic/DynamicChipsDisplay';

const UnifiedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut, loading } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  const getNavigationItems = () => {
    if (user) {
      return [
        { name: 'Home', href: '/', highlight: false },
        { name: 'Dashboard', href: '/dashboard', highlight: false },
        { name: 'Submit Prompt', href: '/submit', highlight: true },
        { name: 'Events', href: '/events', highlight: false },
        { name: 'Leaderboard', href: '/leaderboard', highlight: false },
        { name: 'Community', href: '/community', highlight: false },
        { name: 'Codex', href: '/codex', highlight: false },
      ];
    }

    return [
      { name: 'How It Works', href: '/how-it-works', highlight: false },
      { name: 'Prompt Battle', href: '/prompt-battle', highlight: false },
      { name: 'Community', href: '/community', highlight: false },
      { name: 'About', href: '/about', highlight: false },
    ];
  };

  const navigationItems = getNavigationItems();
  const isActive = (path: string) => location.pathname === path;

  if (loading) {
    return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center">
                <GamepadIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  GAGSTY
                </span>
                <div className="text-xs text-white/60 -mt-1">AI Gaming Platform</div>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="animate-pulse bg-gray-700 h-8 w-24 rounded"></div>
              <div className="animate-pulse bg-gray-700 h-8 w-16 rounded"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Premium Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                <Sparkles className="w-6 h-6 text-white group-hover:animate-spin" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                GAGSTY
              </span>
              <div className="text-xs text-white/60 -mt-1">AI Gaming Platform</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-white bg-white/10 shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                } ${item.highlight ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30' : ''}`}
              >
                {item.name}
                {item.highlight && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse" />
                )}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Chips Display */}
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2">
                  <DynamicChipsDisplay showLabel={false} />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/5">
                  <Bell size={20} />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </button>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-white">
                        {user.user_metadata?.full_name || 'Creator'}
                      </div>
                    </div>
                    <ChevronDown size={16} className="text-white/70" />
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl z-50">
                      <div className="p-4 border-b border-white/10">
                        <div className="text-sm font-medium text-white mb-1">
                          {user.user_metadata?.full_name || 'Creator'}
                        </div>
                        <div className="text-xs text-white/60">{user.email}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-white/60">Waitlist Position:</span>
                          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs">#124</Badge>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        <Link
                          to="/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <User size={16} className="text-white/70" />
                          <span className="text-white">Dashboard</span>
                        </Link>
                        
                        <Link
                          to="/welcome"
                          onClick={() => setShowUserMenu(false)}
                          className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <Crown size={16} className="text-yellow-400" />
                          <span className="text-white">Referrals</span>
                        </Link>

                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setShowUserMenu(false)}
                            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-600/20 transition-colors"
                          >
                            <Shield size={16} className="text-red-400" />
                            <span className="text-white">Admin Panel</span>
                          </Link>
                        )}
                        
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <LogOut size={16} className="text-white/70" />
                          <span className="text-white">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth">
                  <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                    Join Waitlist
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/10 bg-black/50 backdrop-blur-xl">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-white bg-white/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                {user ? (
                  <>
                    <div className="flex justify-center bg-white/5 rounded-xl p-4">
                      <DynamicChipsDisplay showLabel={true} />
                    </div>
                    
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-600/30 flex items-center justify-center space-x-2">
                          <Shield size={16} />
                          <span>Admin Panel</span>
                        </Button>
                      </Link>
                    )}
                    
                    <Button 
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                        Join Waitlist
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default UnifiedHeader;
