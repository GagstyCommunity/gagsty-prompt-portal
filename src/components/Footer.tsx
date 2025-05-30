
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { name: 'Submit Game', href: '/submit', internal: true },
    { name: 'Prompt Battle', href: '/prompt-battle', internal: true },
    { name: 'Events', href: '/events', internal: true },
    { name: 'Gigs', href: '/jobs', internal: true },
  ];

  const resourceLinks = [
    { name: 'Codex', href: '/codex', internal: true },
    { name: 'About Us', href: '/about', internal: true },
    { name: 'Privacy Policy', href: '/privacy', internal: true },
    { name: 'Terms of Service', href: '/terms', internal: true },
  ];

  const businessLinks = [
    { name: 'For Investors', href: '/investors', internal: true },
    { name: 'Partnerships', href: '/partnerships', internal: true },
    { name: 'Press Kit', href: '/press', internal: true },
    { name: 'Contact Us', href: '/contact', internal: true },
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/gagsty',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/gagsty',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      )
    },
    {
      name: 'Telegram',
      href: 'https://t.me/gagsty',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      )
    }
  ];

  const LinkComponent = ({ item }: { item: { name: string; href: string; internal: boolean } }) => {
    if (item.internal) {
      return (
        <Link 
          to={item.href} 
          className="hover:text-blue-400 transition-colors duration-200 hover-lift"
        >
          {item.name}
        </Link>
      );
    }
    return (
      <a 
        href={item.href} 
        className="hover:text-blue-400 transition-colors duration-200 hover-lift flex items-center"
        target="_blank" 
        rel="noopener noreferrer"
      >
        {item.name}
        <ExternalLink className="ml-1 w-3 h-3" />
      </a>
    );
  };

  return (
    <footer className="py-16 px-4 border-t border-gray-800 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 mb-6 hover:scale-105 transition-transform">
              <span className="text-xl font-bold text-white">GAGSTY</span>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6 text-lg">
              The future of game creation is here. Join thousands of creators building the next generation of games with AI and Web3.
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Built by gamers, developers, and dreamers. Powered by the Gagsty community.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800/50"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Platform</h3>
            <ul className="space-y-3 text-gray-300">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <LinkComponent item={link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Resources</h3>
            <ul className="space-y-3 text-gray-300">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <LinkComponent item={link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Business</h3>
            <ul className="space-y-3 text-gray-300">
              {businessLinks.map((link) => (
                <li key={link.name}>
                  <LinkComponent item={link} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Gagsty. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="status-live mr-2" />
              <span>Platform Status: Online</span>
            </div>
            <span>•</span>
            <span>Version 2.0.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
