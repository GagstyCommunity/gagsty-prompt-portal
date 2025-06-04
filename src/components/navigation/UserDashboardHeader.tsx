
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, GamepadIcon, Shield, User, Coins, Calendar, Trophy, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DynamicChipsDisplay from '../dynamic/DynamicChipsDisplay';

const UserDashboardHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  // User dashboard specific navigation
  const userNavigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: User },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Submit Prompt', href: '/submit', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 via-violet-500 to-orange-500">
                <GamepadIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-white">GAGSTY</span>
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 via-violet-500 to-orange-500">
              <GamepadIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-white">GAGSTY</span>
          </Link>

          {/* Desktop Navigation - User Functions Only */}
          <nav className="hidden lg:flex items-center space-x-8">
            {userNavigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-blue-400 ${
                    isActive(item.href) ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side - Chips & User Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Chips Display */}
            <div className="flex items-center space-x-2 bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2">
              <DynamicChipsDisplay showLabel={false} />
            </div>

            {/* Admin Link */}
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" className="border-red-600 text-red-300 hover:bg-red-600/20 flex items-center space-x-2">
                  <Shield size={16} />
                  <span>Admin</span>
                </Button>
              </Link>
            )}

            {/* Sign Out */}
            <Button 
              onClick={handleSignOut}
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-600/20 flex items-center space-x-2"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </Button>
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800/50 animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {/* Chips Display */}
              <div className="flex justify-center bg-gray-800/50 rounded-lg p-4">
                <DynamicChipsDisplay showLabel={true} />
              </div>

              {/* Navigation Items */}
              {userNavigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 text-base font-medium transition-colors py-2 ${
                      isActive(item.href) ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="pt-4 space-y-3 border-t border-gray-800">
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
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-600/20 flex items-center justify-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default UserDashboardHeader;
