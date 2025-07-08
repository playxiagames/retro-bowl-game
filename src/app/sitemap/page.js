import Link from 'next/link';
import { getAllGames, getAllCategories } from '../../utils/gameData';
import { generatePageMetadata } from '../../utils/seoUtils';

// Generate page metadata
export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Sitemap - All Pages Navigation',
    description: 'View the complete page structure of Geometry Dash Lite gaming website, including all games, categories and important page navigation links.',
    path: '/sitemap'
  });
}

export default function SitemapPage() {
  const games = getAllGames();
  const categories = getAllCategories();

  // Static pages
  const staticPages = [
    { title: 'Home', url: '/', description: 'Explore the best online games', icon: '🏠' },
    { title: 'About Us', url: '/about/', description: 'Learn about our mission and team', icon: 'ℹ️' },
    { title: 'Contact Us', url: '/contact/', description: 'Get in touch with us', icon: '📧' },
    { title: 'Privacy Policy', url: '/privacy/', description: 'Learn how we protect your privacy', icon: '🔒' },
    { title: 'Terms of Service', url: '/terms/', description: 'View our terms of service', icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-2xl">🗺️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Sitemap</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore all content on our website and quickly find the games and information you're looking for
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{staticPages.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Main Pages</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{categories.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Game Categories</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{games.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Featured Games</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{staticPages.length + categories.length + games.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Total Pages</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Pages */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="mr-3">🏠</span>
                Main Pages
              </h2>
              <div className="space-y-4">
                {staticPages.map((page, index) => (
                  <Link
                    key={index}
                    href={page.url}
                    className="block p-4 border border-gray-200 dark:border-slate-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                        {page.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {page.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Game Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="mr-3">🎮</span>
                Game Categories
              </h2>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/category/${category.slug}/`}
                    className="block p-4 border border-gray-200 dark:border-slate-600 rounded-lg hover:border-green-300 dark:hover:border-green-500 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                        {category.icon || '🎯'}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {category.description || `Explore ${category.name} games`}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Games */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="mr-3">🌟</span>
                Featured Games
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {games.map((game, index) => (
                  <Link
                    key={index}
                    href={`/games/${game.slug}/`}
                    className="block p-3 border border-gray-200 dark:border-slate-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                        <span className="text-white font-bold text-sm">
                          {game.title.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                          {game.title}
                        </h3>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500 text-sm mr-1">⭐</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{game.rating}</span>
                          <span className="text-gray-400 dark:text-gray-500 mx-2">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{game.category}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Can't Find What You're Looking For?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            We're constantly adding new games and content. If you have any suggestions or can't find a specific game, feel free to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              📧 Contact Us
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-slate-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>

        {/* SEO Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Last updated: {new Date().toLocaleDateString('en-US')}</p>
        </div>
      </div>
    </div>
  );
} 