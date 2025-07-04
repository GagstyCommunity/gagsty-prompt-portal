
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, GamepadIcon, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DynamicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isAdmin, signOut, loading } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  // Navigation items based on authentication status
  const getNavigationItems = () => {
    const baseItems = [
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Prompt Battle', href: '/prompt-battle' },
    ];

    if (user) {
      return [
        ...baseItems,
        { name: 'Submit Prompt', href: '/submit' },
        { name: 'Dashboard', href: '/dashboard' },
      ];
    }

    return [
      ...baseItems,
      { name: 'Submit Prompt', href: '/submit' },
    ];
  };

  const earnDropdownItems = [
    { name: 'Events & Challenges', href: '/events', description: 'Join competitions and earn rewards' },
    { name: 'Gigs Marketplace', href: '/jobs', description: 'Find freelance opportunities' },
    { name: 'Referral Program', href: '/referral', description: 'Earn by inviting friends' },
  ];

  const communityDropdownItems = [
    { name: 'Leaderboard', href: '/leaderboard', description: 'Top creators and earners' },
    { name: 'Community Hub', href: '/community', description: 'Connect with other creators' },
    { name: 'Success Stories', href: '/stories', description: 'Creator spotlights and achievements' },
  ];

  const moreDropdownItems = [
    { name: 'About Us', href: '/about', description: 'Our mission and team' },
    { name: 'Codex', href: '/codex', description: 'Learning resources and guides' },
    { name: 'Contact', href: '/contact', description: 'Get in touch with us' },
  ];

  const navigationItems = getNavigationItems();
  const isActive = (path: string) => location.pathname === path;

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const DropdownMenu = ({ items, isOpen }: { items: typeof earnDropdownItems; isOpen: boolean }) => {
    if (!isOpen) return null;
    
    return (
      <div className="absolute top-full left-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-lg border border-gray-700 rounded-xl shadow-2xl z-50 animate-fade-in">
        <div className="p-2">
          {items.map((item, index) => (
            <Link
              key={item.name}
              to={item.href}
              className="block p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
              onClick={() => setOpenDropdown(null)}
            >
              <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                {item.name}
              </div>
              <div className="text-sm text-gray-400 mt-1">
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 via-violet-500 to-orange-500">
                <GamepadIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-white">GAGSTY</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="animate-pulse bg-gray-700 h-8 w-16 rounded"></div>
              <div className="animate-pulse bg-gray-700 h-8 w-20 rounded"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 via-violet-500 to-orange-500">
              <GamepadIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-white">GAGSTY</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" ref={dropdownRef}>
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  isActive(item.href) ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Earn Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('earn')}
                className="flex items-center text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
              >
                Earn
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${openDropdown === 'earn' ? 'rotate-180' : ''}`} />
              </button>
              <DropdownMenu items={earnDropdownItems} isOpen={openDropdown === 'earn'} />
            </div>

            {/* Community Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('community')}
                className="flex items-center text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
              >
                Community
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${openDropdown === 'community' ? 'rotate-180' : ''}`} />
              </button>
              <DropdownMenu items={communityDropdownItems} isOpen={openDropdown === 'community'} />
            </div>
            
            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('more')}
                className="flex items-center text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
              >
                More
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${openDropdown === 'more' ? 'rotate-180' : ''}`} />
              </button>
              <DropdownMenu items={moreDropdownItems} isOpen={openDropdown === 'more'} />
            </div>
          </nav>

          {/* Authentication & Admin CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" className="border-red-600 text-red-300 hover:bg-red-600/20 flex items-center space-x-2">
                      <Shield size={16} />
                      <span>Admin</span>
                    </Button>
                  </Link>
                )}
                <Button 
                  onClick={handleSignOut}
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-600/20"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" className="border-blue-600 text-blue-300 hover:bg-blue-600/20">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Join Waitlist
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800/50 animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-base font-medium transition-colors ${
                    isActive(item.href) ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-800">
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Earn</div>
                  {earnDropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block py-2 text-sm text-gray-400 hover:text-blue-400 transition-colors ml-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Community</div>
                  {communityDropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block py-2 text-sm text-gray-400 hover:text-blue-400 transition-colors ml-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">More</div>
                  {moreDropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block py-2 text-sm text-gray-400 hover:text-blue-400 transition-colors ml-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 space-y-3 border-t border-gray-800">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin" className="block" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full border-red-600 text-red-300 hover:bg-red-600/20 flex items-center justify-center space-x-2">
                          <Shield size={16} />
                          <span>Admin Panel</span>
                        </Button>
                      </Link>
                    )}
                    <Button 
                      onClick={handleSignOut}
                      variant="outline" 
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-600/20"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" className="block" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-blue-600 text-blue-300 hover:bg-blue-600/20">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth" className="block" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
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

export default DynamicHeader;
