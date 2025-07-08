// 简化的SEO工具函数
const BASE_URL = 'https://geometry-dash-lite.org';

/**
 * 生成 canonical URL
 * @param {string} path - 页面路径
 * @returns {string} - 完整的 canonical URL
 */
export const generateCanonicalUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const cleanPath = normalizedPath.replace(/\/+/g, '/');
  const finalPath = cleanPath === '/' ? '/' : `${cleanPath}/`;
  
  return `${BASE_URL}${finalPath}`;
};

/**
 * 生成页面的基础 metadata
 * @param {Object} options - 页面元数据选项
 * @returns {Object} - Next.js metadata 对象
 */
export const generatePageMetadata = ({
  title,
  description,
  path,
  ogImage = '/images/og-geometry-dash-lite.jpg'
}) => {
  const canonicalUrl = generateCanonicalUrl(path);
  const fullTitle = title.includes('Geometry Dash Lite') 
    ? title
    : `${title} | Geometry Dash Lite`;
  
  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: 'Geometry Dash Lite',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

/**
 * 生成游戏页面的 metadata
 * @param {Object} game - 游戏对象
 * @returns {Object} - Next.js metadata 对象
 */
export const generateGamePageMetadata = (game) => {
  if (!game) {
    return generatePageMetadata({
      title: 'Game Not Found',
      description: 'The requested game could not be found.',
      path: '/404',
    });
  }

  const gameTitle = `Play ${game.title} Online Free`;
  const gameDescription = game.description || 
    `Play ${game.title} online for free! ${game.description} No download required.`;

  return generatePageMetadata({
    title: gameTitle,
    description: gameDescription,
    path: `/games/${game.slug}`,
  });
};

/**
 * 生成分类页面的 metadata
 * @param {Object} category - 分类对象
 * @returns {Object} - Next.js metadata 对象
 */
export const generateCategoryPageMetadata = (category) => {
  if (!category) {
    return generatePageMetadata({
      title: 'Category Not Found',
      description: 'The requested game category could not be found.',
      path: '/404',
    });
  }

  const categoryTitle = `${category.name} Games - Free Online`;
  const categoryDescription = `Play the best ${category.name.toLowerCase()} games online for free! ${category.description}`;

  return generatePageMetadata({
    title: categoryTitle,
    description: categoryDescription,
    path: `/category/${category.slug}`,
  });
};

/**
 * 生成游戏结构化数据
 * @param {Object} game - 游戏对象
 * @returns {Object} - Game schema JSON-LD结构化数据
 */
export const generateGameStructuredData = (game) => {
  if (!game) return null;

  const gameUrl = `${BASE_URL}/games/${game.slug}/`;
  const imageUrl = game.thumbnail?.startsWith('http') 
    ? game.thumbnail 
    : `${BASE_URL}${game.thumbnail}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: game.title,
    description: game.description,
    url: gameUrl,
    image: imageUrl,
    genre: game.category || 'Arcade',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: game.rating || 4.5,
      bestRating: 5,
      ratingCount: game.ratingCount || 3872,
      reviewCount: game.reviewCount || 245,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Geometry Dash Lite',
      url: BASE_URL
    },
  };
};

/**
 * 生成分类页面的结构化数据
 * @param {Object} category - 分类对象
 * @param {Array} games - 该分类下的游戏列表
 * @returns {Object} - CollectionPage schema JSON-LD结构化数据
 */
export const generateCategoryStructuredData = (category, games = []) => {
  if (!category) return null;

  const categoryUrl = `${BASE_URL}/category/${category.slug}/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} Games`,
    description: category.description,
    url: categoryUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: games.length,
      itemListElement: games.slice(0, 5).map((game, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Game',
          name: game.title,
          url: `${BASE_URL}/games/${game.slug}/`,
          image: game.thumbnail,
        }
      }))
    },
  };
}; 