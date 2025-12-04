// components/Header.js
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

// Memoized logo component to prevent unnecessary re-renders
const LogoWithName = () => (
  <Link href="/" className="flex items-center space-x-2">
    <div className="relative w-10 h-10 flex-shrink-0">
      <Image
        src="/images/logo.webp"
        alt="HarambeeFund Logo"
        fill
        priority
        sizes="40px"
        className="object-contain"
      />
    </div>
    <span className="text-2xl font-bold text-green-700">harambeeFund</span>
  </Link>
);

// Navigation links data for maintainability
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/campaigns', label: 'Campaigns' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const userLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profile', label: 'Profile' },
  { href: '/my-campaigns', label: 'My Campaigns' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    setIsProfileMenuOpen(false);
    window.location.href = '/';
  };

  // Function to check if a link is active
  const isActiveLink = (path) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <LogoWithName />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`relative pb-1 transition-colors ${
                  isActiveLink(link.href) 
                    ? 'text-pink-600 font-medium' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
                prefetch={false}
              >
                {link.label}
                {isActiveLink(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500"></span>
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                  aria-expanded={isProfileMenuOpen}
                  aria-label="User menu"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-700 font-semibold">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <span className="text-gray-700">{currentUser.name || 'User'}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {userLinks.map((link) => (
                      <Link 
                        key={link.href}
                        href={link.href} 
                        className={`block px-4 py-2 text-sm ${
                          isActiveLink(link.href) 
                            ? 'bg-pink-50 text-pink-700' 
                            : 'text-gray-700 hover:bg-green-50'
                        }`}
                        onClick={() => setIsProfileMenuOpen(false)}
                        prefetch={false}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
             
                <Link 
                  href="/signup" 
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  prefetch={false}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M极 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`block py-2 ${
                  isActiveLink(link.href) 
                    ? 'text-pink-600 font-medium border-l-4 border-pink-500 pl-3' 
                    : 'text-gray-700 hover:text-green-600 pl-4'
                }`}
                onClick={() => setIsMenuOpen(false)}
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-4 space-y-2 border-t">
              {currentUser ? (
                <>
                  <div className="flex items-center space-x-3 pb-2 pl-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-semibold text-sm">
                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </div>
                    <span className="text-gray-700">{currentUser.name || 'User'}</span>
                  </div>
                  {userLinks.map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href} 
                      className={`block py-2 ${
                        isActiveLink(link.href) 
                          ? 'text-pink-600 font-medium border-l-4 border-pink-500 pl-3' 
                          : 'text-gray-700 hover:text-green-600 pl-4'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      prefetch={false}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-gray-700 hover:text-green-600 pl-4"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                
                  <Link 
                    href="/signup" 
                    className="block py-2 text-green-600 font-medium pl-4"
                    onClick={() => setIsMenuOpen(false)}
                    prefetch={false}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}