'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { getSiteConfig, getNavigationConfig } from '../utils/gameData';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const siteConfig = getSiteConfig();
  const navigationConfig = getNavigationConfig();
  const { theme, setTheme } = useTheme();
  const { getFavoritesCount, isLoaded } = useFavorites();

  const favoritesCount = getFavoritesCount();

  const handleNavigationClick = (item) => {
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveItem = (item) => {
    if (item.url === '/' && pathname === '/') return true;
    if (item.url !== '/' && pathname === item.url) return true;
    return false;
  };

  return (
    <nav className="top-navigation bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Logo / Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                href="/"
                onClick={handleHomeClick}
                className="text-xl flex items-center font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <img src="/images/logo.png" alt="logo" className="w-9 h-9 mr-2" />
                {siteConfig.shortName}
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline">
              
              {/* Navigation Items */}
              {navigationConfig.topItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={() => handleNavigationClick(item)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveItem(item)
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.title}
                </Link>
              ))}

              {/* Theme Toggle */}
              <div className="flex items-center ml-5 space-x-3">
                <ThemeToggle />
              </div>

              {/* 收藏链接 */}
              <Link
                href="/favorites/"
                className="relative text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <span>Favorites</span>
                {isLoaded && favoritesCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {favoritesCount > 99 ? '99+' : favoritesCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button & theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
              


              {/* Navigation Items */}
              {navigationConfig.topItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={() => handleNavigationClick(item)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActiveItem(item)
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.title}
                </Link>
              ))}

              {/* 移动端收藏链接 */}
              <Link
                href="/favorites/"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Favorites</span>
                {isLoaded && favoritesCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {favoritesCount > 99 ? '99+' : favoritesCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// 导出拆分的组件供向后兼容
export { default as Breadcrumb } from './Breadcrumb';
export { default as CategoryBadge } from './CategoryBadge';

export default Navigation;