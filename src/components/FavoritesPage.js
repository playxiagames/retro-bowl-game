'use client';

import React, { useState, useMemo } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { GameGrid } from './GameCard';
import FavoriteButton from './FavoriteButton';
import { GameGridSkeleton } from './Skeleton';

const FavoritesPage = () => {
  const { 
    favorites, 
    isLoaded, 
    getFavoritesCount, 
    clearAllFavorites,
    getFavoritesByCategory,
    searchFavorites
  } = useFavorites();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' 或 'list'
  const [sortBy, setSortBy] = useState('addedAt'); // 'addedAt', 'title', 'rating'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' 或 'desc'



  // 获取分类数据
  const favoritesByCategory = getFavoritesByCategory();
  const categories = Object.keys(favoritesByCategory);

  // 过滤和排序收藏
  const filteredAndSortedFavorites = useMemo(() => {
    let filtered = searchFavorites(searchQuery);

    // 按分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(game => game.category === selectedCategory);
    }

    // 排序
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'rating':
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case 'addedAt':
        default:
          aValue = new Date(a.addedAt || 0);
          bValue = new Date(b.addedAt || 0);
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [favorites, searchQuery, selectedCategory, sortBy, sortOrder]);

  // 如果还在加载
  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 页面标题骨架屏 */}
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-24 animate-pulse"></div>
        </div>
        
        {/* 搜索和筛选工具栏骨架屏 */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
        </div>
        
        {/* 游戏网格骨架屏 */}
        <GameGridSkeleton 
          count={6}
          title={false}
          gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 页面标题和统计 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Favorite Games
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {getFavoritesCount()} games in your collection
          </p>
        </div>
        
        {/* 操作按钮 */}
        <div className="flex gap-2">
          {favorites.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all favorites?')) {
                  clearAllFavorites();
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* 如果没有收藏的游戏 */}
      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">💔</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No favorite games yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Start exploring and add your favorite games to this collection!
          </p>
          <a
            href="/all-games/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Games
          </a>
        </div>
      ) : (
        <>
          {/* 搜索和筛选工具栏 */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* 搜索框 */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search your favorites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 分类筛选 */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category} ({favoritesByCategory[category].length})
                  </option>
                ))}
              </select>

              {/* 排序选择 */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="addedAt-desc">Newest First</option>
                <option value="addedAt-asc">Oldest First</option>
                <option value="title-asc">Name A-Z</option>
                <option value="title-desc">Name Z-A</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="rating-asc">Lowest Rated</option>
              </select>

              {/* 视图模式切换 */}
              <div className="flex rounded-lg border border-gray-300 dark:border-slate-600 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* 搜索结果统计 */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Showing {filteredAndSortedFavorites.length} of {favorites.length} favorites
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </div>
          )}

          {/* 游戏网格 */}
          {filteredAndSortedFavorites.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No games found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <GameGrid 
              games={filteredAndSortedFavorites}
              gridCols={viewMode === 'list' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesPage; 