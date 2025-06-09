
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, GamepadIcon, Shield, Sparkles, Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ProfessionalHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Prompt Battle', href: '/prompt-battle' },
  ];

  const authenticatedItems = user ? [
    { name: 'Submit Prompt', href: '/submit' },
    { name: 'Dashboard', href: '/dashboard' },
  ] : [];

  const communityDropdown = [
    { name: 'Leaderboard', href: '/leaderboard', description: 'Top creators and earners' },
    { name: 'Community Hub', href: '/community', description: 'Connect with other creators' },
    { name: 'Events', href: '/events', description: 'Join competitions and earn rewards' },
  ];

  const moreDropdown = [
    { name: 'About Us', href: '/about', description: 'Our mission and team' },
    { name: 'Codex', href: '/codex', description: 'Learning resources and guides' },
    { name: 'Jobs', href: '/jobs', description: 'Freelance opportunities' },
  ];

  const DropdownMenu = ({ items, isOpen }: { items: typeof communityDropdown; isOpen: boolean }) => {
    if (!isOpen) return null;
    
    return (
      <div className="absolute top-full left-0 mt-2 w-80 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
        <div className="p-2">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group"
              onClick={() => setOpenDropdown(null)}
            >
              <div className="text-white font-semibold group-hover:text-purple-400 transition-colors text-lg">
                {item.name}
              </div>
              <div className="text-sm text-white/60 mt-1">
                {item.description}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                <GamepadIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">GAGSTY</span>
            </div>
            <div className="animate-pulse flex space-x-2">
              <div className="bg-white/10 h-10 w-20 rounded-xl"></div>
              <div className="bg-white/10 h-10 w-24 rounded-xl"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
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
            {[...navigationItems, ...authenticatedItems].map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-white bg-white/10 shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Community Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'community' ? null : 'community')}
                className="flex items-center px-6 py-3 rounded-full text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                Community
                <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${openDropdown === 'community' ? 'rotate-180' : ''}`} />
              </button>
              <DropdownMenu items={communityDropdown} isOpen={openDropdown === 'community'} />
            </div>
            
            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'more' ? null : 'more')}
                className="flex items-center px-6 py-3 rounded-full text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                More
                <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${openDropdown === 'more' ? 'rotate-180' : ''}`} />
              </button>
              <DropdownMenu items={moreDropdown} isOpen={openDropdown === 'more'} />
            </div>
          </nav>

          {/* User Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button className="relative p-3 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10">
                  <Bell size={20} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </button>
                
                {isAdmin && (
                  <Link to="/admin">
                    <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl px-6 py-2 flex items-center space-x-2">
                      <Shield size={16} />
                      <span>Admin</span>
                    </Button>
                  </Link>
                )}
                
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-white font-medium">{user.email?.split('@')[0]}</span>
                </div>
                
                <Button 
                  onClick={handleSignOut}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white rounded-xl px-6 py-2"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth">
                  <Button className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white rounded-xl px-6 py-2">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-8 py-2 shadow-xl">
                    Join Waitlist
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 text-white/70 hover:text-white transition-colors rounded-xl hover:bg-white/10"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10 rounded-b-2xl overflow-hidden">
            <div className="px-4 py-6 space-y-4">
              {[...navigationItems, ...authenticatedItems].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300 ${
                    isActive(item.href) ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-white/10">
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-white/60 uppercase tracking-wider px-4">Community</div>
                  {communityDropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block py-3 px-6 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 space-y-3 border-t border-white/10">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl py-3 flex items-center justify-center space-x-2">
                          <Shield size={16} />
                          <span>Admin Panel</span>
                        </Button>
                      </Link>
                    )}
                    <Button 
                      onClick={handleSignOut}
                      className="w-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white rounded-xl py-3"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white rounded-xl py-3">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl py-3">
                        Join Waitlist
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ProfessionalHeader;
