
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';

const EnhancedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const primaryNavItems = [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Creator Showcase', href: '/showcase' },
    { name: 'Prompt Battle', href: '/battle' },
    { name: 'Earn', href: '/earn' },
    { name: 'Community', href: '/community' },
    { name: 'Blog', href: '/blog' },
  ];

  const secondaryNavItems = [
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-lift">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-emerald-600">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-white">GAGSTY</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {primaryNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                  isActive(item.href) ? 'text-purple-400' : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors"
              >
                More
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50">
                  {secondaryNavItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-purple-400 hover:bg-gray-800/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-600/20">
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="btn-primary btn-medium">
                Join Waitlist
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800/50 animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-base font-medium transition-colors ${
                    isActive(item.href) ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-800">
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <div className="pt-4 space-y-3">
                <Link to="/auth" className="block" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-purple-600 text-purple-300 hover:bg-purple-600/20">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth" className="block" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full btn-primary btn-medium">
                    Join Waitlist
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default EnhancedHeader;
