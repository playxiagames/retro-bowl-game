import Layout from '../components/Layout';
import Link from 'next/link';
import { getFeaturedGames } from '../utils/gameData';
import { generatePageMetadata } from '../utils/seoUtils';

export const metadata = generatePageMetadata({
  title: 'Page Not Found - 404 Error',
  description: 'The page you are looking for could not be found. Browse our collection of free online games and discover new favorites to play.',
  path: '/404',
});

export default function NotFound() {
  const featuredGames = getFeaturedGames().slice(0, 6);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        
        {/* Error Message */}
        <div className="mb-8">
          <div className="text-8xl mb-4">🎮</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Game Not Found
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Oops! The game or page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500">
            It might have been moved, deleted, or you may have typed the URL incorrectly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            🏠 Back to Home
          </Link>
          <Link
            href="/category/geometry-dash/"
            className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            🎯 Browse All Games
          </Link>
        </div>

        {/* Suggested Games */}
        {featuredGames && featuredGames.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🌟 Try These Popular Games Instead
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {featuredGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.slug}/`}
                  className="group block"
                >
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎮</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {game.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Need Help?</h3>
          <p className="text-blue-700 text-sm">
            If you believe this is an error, please{' '}
            <Link href="/contact/" className="underline hover:text-blue-900">
              contact us
            </Link>
            {' '}and let us know what you were looking for.
          </p>
        </div>

      </div>
    </Layout>
  );
} 