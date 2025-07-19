import { notFound } from 'next/navigation';
import Layout from '../../../components/Layout';
import { GameGrid } from '../../../components/GameCard';
import { Breadcrumb, CategoryBadge } from '../../../components/Navigation';
import { 
  getCategoryBySlug, 
  getGamesByCategory,
  getAllCategories,
  generateCategoryMetadata 
} from '../../../utils/gameData';
import { generateCategoryPageMetadata, generateCategoryStructuredData } from '../../../utils/seoUtils';

// 生成元数据
export async function generateMetadata({ params }) {
  const category = getCategoryBySlug(params.categorySlug);
  
  // 使用新的 SEO 工具函数生成 metadata
  return generateCategoryPageMetadata(category);
}

// 生成静态参数
export async function generateStaticParams() {
  // 导入分类数据
  const categoriesData = await import('../../../data/categories.json');
  const categories = categoriesData.categories || [];
  
  // 返回所有分类的slug参数
  return categories.map((category) => ({
    categorySlug: category.slug
  }));
}

export default function CategoryPage({ params }) {
  const category = getCategoryBySlug(params.categorySlug);

  if (!category) {
    notFound();
  }

  // 获取该分类的游戏
  const categoryGames = getGamesByCategory(category.id);
  const allCategories = getAllCategories();

  // 面包屑导航
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: category.name }
  ];

  // 生成增强的结构化数据
  const categoryStructuredData = generateCategoryStructuredData(category, categoryGames);

  return (
    <Layout>
      {/* 增强的分类结构化数据 */}
      {categoryStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(categoryStructuredData)
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Category Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{category.description}</p>
          {/* <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {categoryGames.length} games available
            </span>
          </div> */}
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Browse Categories</h2>
          <div className="flex flex-wrap gap-3">
            {allCategories.map((cat) => (
              <CategoryBadge
                key={cat.id}
                category={cat}
                isActive={cat.id === category.id}
              />
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              All {category.name}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {categoryGames.length} games
            </div>
          </div>
          
          {categoryGames.length > 0 ? (
            <GameGrid games={categoryGames} />
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No games found</h3>
              <p className="text-gray-600 dark:text-gray-300">There are no games in this category yet. Check back later!</p>
            </div>
          )}
        </div>

        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="my-6" />

        {/* Category Description */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About {category.name}</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {category.longDescription || category.description}
            </p>
            
            {/* Games List */}
            {categoryGames.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Featured Games in This Category:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryGames.map((game) => (
                    <div key={game.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex-shrink-0">
                        <img 
                          src={game.thumbnail} 
                          alt={game.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {game.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                          {game.description}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-xs text-yellow-600">⭐ {game.rating}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {game.playCount >= 1000000 
                              ? `${(game.playCount / 1000000).toFixed(1)}M plays`
                              : `${Math.round(game.playCount / 1000)}K plays`
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional SEO Content */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Why Play {category.name} Games?</h3>
              {category.id === 'geometry-dash' && (
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    Geometry Dash games offer a unique blend of platforming action and musical rhythm that creates an unparalleled gaming experience. 
                    These games are perfect for players who enjoy challenging themselves with precise timing and coordination skills.
                  </p>
                  <p>
                    The series has become a phenomenon in the gaming world due to its simple yet addictive gameplay mechanics. 
                    Each level is carefully crafted to sync with electronic music, making every jump, flip, and dash feel like part of a musical performance.
                  </p>
                  <p>
                    From the accessible Geometry Dash Lite to the intense challenges of advanced versions, 
                    these games provide endless entertainment and the satisfaction of mastering increasingly difficult obstacles.
                  </p>
                </div>
              )}
              {category.id === 'google-games' && (
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    Google Games represent the pinnacle of classic arcade gaming, bringing timeless entertainment to modern browsers. 
                    These games have stood the test of time because they focus on pure, engaging gameplay without unnecessary complexity.
                  </p>
                  <p>
                    Each game in this collection has been carefully optimized for web browsers, ensuring smooth performance and instant accessibility. 
                    Whether you're looking for a quick gaming break or want to experience gaming history, these classics deliver immediate fun.
                  </p>
                  <p>
                    The beauty of Google Games lies in their simplicity and universal appeal. 
                    From the strategic thinking required in Minesweeper to the quick reflexes needed in Pac-Man, 
                    these games offer something for every type of player.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 