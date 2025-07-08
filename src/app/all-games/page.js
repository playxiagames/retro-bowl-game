'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { GameGrid } from '../../components/GameCard';
import { Breadcrumb, CategoryBadge } from '../../components/Navigation';
import { 
  getAllGames, 
  getAllCategories,
  getGamesByCategory,
  searchGames,
  getSiteConfig 
} from '../../utils/gameData';

export default function AllGamesPage() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity'); // popularity, name, rating
  const [isLoading, setIsLoading] = useState(true);

  const allGames = getAllGames();
  const categories = getAllCategories();
  const siteConfig = getSiteConfig();

  // 初始化游戏数据
  useEffect(() => {
    setGames(allGames);
    setFilteredGames(allGames);
    setIsLoading(false);
  }, []);

  // 处理搜索和过滤
  useEffect(() => {
    let result = games;

    // 搜索过滤
    if (searchQuery.trim()) {
      result = searchGames(searchQuery);
    }

    // 分类过滤
    if (selectedCategory !== 'all') {
      result = result.filter(game => game.category === selectedCategory);
    }

    // 排序
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
        default:
          return b.playCount - a.playCount;
      }
    });

    setFilteredGames(result);
  }, [searchQuery, selectedCategory, sortBy, games]);

  // 面包屑导航
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'All Games' }
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Loading Games...</h1>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔍 Search & Browse All Games
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Search, filter, and discover your perfect game! Use our powerful search tools to find games by name, 
            category, or rating from our complete collection.
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {allGames.length} games available to search
            </span>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>

          {/* Category Badges */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Filters:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                All Games ({allGames.length})
              </button>
              {categories.map((category) => {
                const categoryGameCount = allGames.filter(game => game.category === category.id).length;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {category.name} ({categoryGameCount})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600 dark:text-gray-300">
            {searchQuery ? (
              <span>
                Found <strong>{filteredGames.length}</strong> games for "<strong>{searchQuery}</strong>"
              </span>
            ) : selectedCategory !== 'all' ? (
              <span>
                Showing <strong>{filteredGames.length}</strong> games in{' '}
                <strong>{categories.find(c => c.id === selectedCategory)?.name}</strong>
              </span>
            ) : (
              <span>
                Showing all <strong>{filteredGames.length}</strong> games
              </span>
            )}
          </div>
          
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <GameGrid 
            games={filteredGames} 
            gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          />
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No games found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {searchQuery 
                ? `No games match your search "${searchQuery}"`
                : `No games found in the selected category`
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Show All Games
            </button>
          </div>
        )}

        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mt-8" />

        {/* SEO Content */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Free Online Games - Complete Collection
          </h2>
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Welcome to our comprehensive collection of free online games! With over {allGames.length} games spanning 
              multiple categories, you'll find everything from classic arcade games to modern puzzle challenges. 
              All games are playable directly in your browser without any downloads required.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-6">Game Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {categories.map((category) => {
                const categoryGameCount = allGames.filter(game => game.category === category.id).length;
                return (
                  <div key={category.id} className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {category.name} ({categoryGameCount} games)
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {category.description}
                    </p>
                  </div>
                );
              })}
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Whether you're looking for quick entertainment during a break or want to dive into more challenging gameplay, 
              our collection has something for everyone. Use the search and filter options above to find exactly what you're looking for, 
              or browse by category to discover new favorites.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 