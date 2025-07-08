'use client';

import { Suspense } from 'react';
import { GameGrid } from './GameCard';
import { GameGridSkeleton } from './Skeleton';

// 游戏网格的骨架屏
const GameGridSuspense = ({ children, gridCols = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6", skeletonCount = 6 }) => (
  <Suspense fallback={<GameGridSkeleton count={skeletonCount} gridCols={gridCols} />}>
    {children}
  </Suspense>
);

// 懒加载的游戏区域组件
const LazyGameSection = ({ 
  geometryDashGames,
  popularGames,
  googleGamesPreview,
  js13kGamesPreview,
  moreGames,
  allGamesCount
}) => {
  return (
    <>
      {/* Geometry Dash 系列专区 - 核心产品展示 */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-left">
            🎮 Complete Geometry Dash Collection
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {geometryDashGames.length} games
          </span>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-4">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            🚀 Experience all versions of the legendary rhythm-based platformer! From the classic Geometry Dash Lite to advanced versions with unique challenges.
          </p>
        </div>
        <GameGridSuspense>
          <GameGrid games={geometryDashGames} />
        </GameGridSuspense>
      </div>

      {/* Popular Games Grid */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-left">🔥 Trending Now</h2>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-4">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            📈 The most popular games right now - see what everyone else is playing!
          </p>
        </div>
        <GameGridSuspense>
          <GameGrid games={popularGames} />
        </GameGridSuspense>
      </div>

      {/* Category Previews - 引导用户探索更多分类 */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-left">🎯 Explore More Game Categories</h2>
        
        {/* Google Games Preview */}
        {googleGamesPreview.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">🎲 Classic Google Games</h3>
              <a 
                href="/category/google-games/"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition-colors"
              >
                View All Google Games →
              </a>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                🕹️ Timeless arcade classics reimagined by Google - Pac-Man, Snake, Minesweeper and more!
              </p>
            </div>
            <GameGridSuspense gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <GameGrid games={googleGamesPreview} gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" />
            </GameGridSuspense>
          </div>
        )}

        {/* JS13K Games Preview */}
        {js13kGamesPreview.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">⚡ Minimalist JS13K Games</h3>
              <a 
                href="/category/js13k-games/"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition-colors"
              >
                View All JS13K Games →
              </a>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 mb-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                💎 Incredible games built in just 13KB of code - showcasing creativity and technical mastery!
              </p>
            </div>
            <GameGridSuspense gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" skeletonCount={4}>
              <GameGrid games={js13kGamesPreview} gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" />
            </GameGridSuspense>
          </div>
        )}
      </div>

      {/* More Games Discovery Section */}
      {moreGames.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-left">🎲 Discover More Games</h2>
            <a 
              href="/all-games/"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
            >
              🔍 Search All Games →
            </a>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-3 mb-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              🔍 Looking for something specific? Visit our <strong>All Games</strong> page to search by name, browse by category, or filter by rating. Over {allGamesCount}+ games to explore!
            </p>
          </div>
          <GameGridSuspense gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" skeletonCount={12}>
            <GameGrid games={moreGames} gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" />
          </GameGridSuspense>
        </div>
      )}

      {/* SEO Content Section - 主要H1标签 */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-left">
          Play Geometry Dash Lite - Free Online Game
        </h2>
        
        <div className="prose prose-lg max-w-none text-left">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Welcome to the ultimate <strong>Geometry Dash Lite</strong> online experience! Our platform offers you the chance to play 
            this addictive rhythm-based platformer directly in your browser - no downloads required! 
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            <strong>Geometry Dash Lite</strong> is the perfect introduction to the world of geometric challenges. Navigate your way through 
            a series of obstacle courses, each perfectly synchronized to an energetic soundtrack. With simple one-touch gameplay 
            that's easy to learn but hard to master, you'll find yourself coming back for "just one more try" again and again.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-left">🎮 Why Play Geometry Dash Lite Online?</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
            <li><strong>Instant Play:</strong> No downloads or installations needed</li>
            <li><strong>Free Access:</strong> Play the full game completely free</li>
            <li><strong>Mobile Friendly:</strong> Works perfectly on phones, tablets, and computers</li>
            <li><strong>Regular Updates:</strong> Access to the latest versions and bug fixes</li>
            <li><strong>Safe & Secure:</strong> Play safely in your browser without security concerns</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-left">🌟 Game Features</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
            <li><strong>Rhythm-Based Gameplay:</strong> Every jump and move syncs perfectly with the music</li>
            <li><strong>Challenging Levels:</strong> Multiple difficulty levels from beginner to expert</li>
            <li><strong>Unique Visual Style:</strong> Distinctive geometric art style with smooth animations</li>
            <li><strong>Addictive Mechanics:</strong> Simple controls with complex, rewarding gameplay</li>
            <li><strong>Achievement System:</strong> Unlock achievements as you progress</li>
          </ul>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Ready to test your reflexes and rhythm? Click the play button above and dive into the world of 
            <strong> Geometry Dash Lite</strong>. Whether you're a newcomer to the series or a veteran player, 
            this online version provides the perfect platform to enjoy this beloved indie game sensation.
          </p>
        </div>
      </div>
    </>
  );
};

export default LazyGameSection; 