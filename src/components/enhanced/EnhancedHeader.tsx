
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PremiumButton } from '@/components/ui/premium-button';
import { Menu, X, Search, Bell, User, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const EnhancedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navigationItems = [
    { name: 'Create', path: '/submit', highlight: true },
    { name: 'Battle', path: '/battle' },
    { name: 'Explore', path: '/codex' },
    { name: 'Earn', path: '/events' },
    { name: 'Community', path: '/community' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
                to={item.path}
                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
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

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games, creators..."
                className="w-64 pl-10 pr-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>
          </div>

          {/* User Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button className="relative p-2 text-white/70 hover:text-white transition-colors">
                  <Bell size={20} />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </button>
                
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <ChevronDown size={16} className="text-white/70" />
                </div>
                
                <PremiumButton 
                  onClick={handleSignOut}
                  variant="glass" 
                  size="sm"
                >
                  Logout
                </PremiumButton>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth">
                  <PremiumButton variant="glass" size="sm">
                    Login
                  </PremiumButton>
                </Link>
                <Link to="/auth">
                  <PremiumButton variant="premium" size="sm" glow>
                    Start Creating
                  </PremiumButton>
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
                  to={item.path}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(item.path)
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
                  <PremiumButton 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    variant="glass"
                    className="justify-start"
                  >
                    Logout
                  </PremiumButton>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <PremiumButton variant="glass" className="w-full justify-start">
                        Login
                      </PremiumButton>
                    </Link>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <PremiumButton variant="premium" className="w-full justify-start">
                        Start Creating
                      </PremiumButton>
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

export default EnhancedHeader;
