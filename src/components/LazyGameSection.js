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
      {/* Sports Games 系列专区 - 核心产品展示 */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-left">
            🏈 Complete Sports Games Collection
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {geometryDashGames.length} games
          </span>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-4 mb-4">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            🚀 Experience all versions of classic sports games! From Retro Bowl to doodle baseball - relive the golden era of sports gaming.
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
            📈 The most popular sports games right now - see what everyone else is playing!
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
                🕹️ Timeless arcade classics including doodle baseball - reimagined by Google for modern browsers!
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
          Play Retro Bowl Online Free - Classic Football Gaming Experience
        </h2>
        
        <div className="prose prose-lg max-w-none text-left">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Welcome to the ultimate <strong>Retro Bowl</strong> online gaming destination! Our platform brings you the nostalgic charm of classic American football gaming, featuring not only Retro Bowl but also popular favorites like <strong>doodle baseball</strong> and many other retro-style sports games. Experience the golden era of sports gaming directly in your browser - no downloads required!
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            <strong>Retro Bowl</strong> captures the essence of classic 8-bit football games with modern gameplay mechanics. Whether you're managing your team's roster, calling plays, or throwing perfect passes, every aspect of the game is designed to provide an authentic retro gaming experience. Just like how <strong>doodle baseball</strong> brings back memories of simple yet addictive sports gameplay, Retro Bowl delivers that same nostalgic satisfaction with enhanced depth and strategy.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-left">🏈 Why Play Retro Bowl Online?</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
            <li><strong>Instant Access:</strong> Play immediately without downloads or installations</li>
            <li><strong>Free Gaming:</strong> Enjoy the complete Retro Bowl experience at no cost</li>
            <li><strong>Cross-Platform:</strong> Works perfectly on phones, tablets, and computers</li>
            <li><strong>Nostalgic Collection:</strong> Access to games like <strong>doodle baseball</strong> and other retro classics</li>
            <li><strong>Safe & Secure:</strong> Browser-based gaming with no security concerns</li>
            <li><strong>Regular Updates:</strong> Latest versions and improvements always available</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-left">⚡ Game Features & Experience</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Retro Bowl combines team management with arcade-style gameplay, creating an experience that's both strategic and immediately satisfying. The game features pixel-perfect graphics reminiscent of classic 8-bit era, similar to how <strong>doodle baseball</strong> captures the charm of simple line-art aesthetics. You'll find yourself managing everything from player trades and training to calling plays and executing perfect throws on the field.
          </p>

          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
            <li><strong>Team Management:</strong> Draft players, manage salary caps, and build your dynasty</li>
            <li><strong>Arcade Gameplay:</strong> Simple controls with deep strategic elements</li>
            <li><strong>Retro Aesthetics:</strong> Authentic 8-bit graphics and sound design</li>
            <li><strong>Season Mode:</strong> Play through multiple seasons building your legacy</li>
            <li><strong>Achievement System:</strong> Unlock rewards as you progress</li>
            <li><strong>Statistics Tracking:</strong> Detailed player and team performance metrics</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-left">🎮 Expanding Your Gaming Experience</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            While Retro Bowl serves as our flagship football experience, our platform offers a comprehensive collection of retro-style sports games. <strong>Doodle baseball</strong> represents another cornerstone of our collection, providing that same pick-up-and-play accessibility that made classic sports games so beloved. The beauty of <strong>doodle baseball</strong> lies in its simplicity - just like Retro Bowl, it proves that great gameplay doesn't require complex graphics or mechanics.
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Our collection includes various iterations and spiritual successors to classic games. From the strategic depth of Retro Bowl to the immediate fun of <strong>doodle baseball</strong>, each game in our catalog has been carefully selected to provide that authentic retro gaming experience. The charm of <strong>doodle baseball</strong> and similar titles lies in their ability to transport players back to simpler times when gameplay innovation mattered more than photorealistic graphics.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-left">🌟 The Retro Gaming Renaissance</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Today's gaming landscape has seen a remarkable resurgence in retro-style games, with titles like Retro Bowl and <strong>doodle baseball</strong> leading the charge. These games prove that pixel art aesthetics and straightforward gameplay can be just as engaging as modern AAA productions. <strong>Doodle baseball</strong> exemplifies this trend with its hand-drawn aesthetic and intuitive mechanics that anyone can pick up but take time to master.
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The success of games like <strong>doodle baseball</strong> and Retro Bowl demonstrates that players are hungry for experiences that prioritize fun over flashy graphics. Whether you're throwing touchdown passes in Retro Bowl or hitting home runs in <strong>doodle baseball</strong>, these games capture the essence of what made classic arcade sports games so addictive and memorable.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-left">🎯 Perfect for All Skill Levels</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            One of the greatest strengths of retro-style games like Retro Bowl and <strong>doodle baseball</strong> is their accessibility. <strong>Doodle baseball</strong> can be enjoyed by complete beginners who just want to swing for the fences, while also offering enough depth to keep experienced players engaged for hours. Similarly, Retro Bowl welcomes casual football fans while providing the strategic depth that hardcore sports gaming enthusiasts crave.
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Ready to experience the best of retro sports gaming? Start with our flagship Retro Bowl experience, then explore classics like <strong>doodle baseball</strong> and discover why these timeless games continue to captivate players of all ages. Whether you're looking for the strategic depth of football management or the simple joy of swinging for the fences in <strong>doodle baseball</strong>, our collection offers the perfect retro gaming experience for every sports fan.
          </p>
        </div>
      </div>
    </>
  );
};

export default LazyGameSection; 