import gamesData from '../data/games.json';
import categoriesData from '../data/categories.json';
import siteConfig from '../data/siteConfig.json';
import { getTemplateConfig } from './templateConfig';

// 获取所有游戏
export const getAllGames = () => {
  return sortGamesByPriority([...gamesData.games]);
};

// 根据ID获取游戏
export const getGameById = (id) => {
  return gamesData.games.find(game => game.id === id);
};

// 根据slug获取游戏
export const getGameBySlug = (slug) => {
  return gamesData.games.find(game => game.slug === slug);
};

// 根据分类获取游戏
export const getGamesByCategory = (category) => {
  const categoryGames = gamesData.games.filter(game => game.category === category);
  return sortGamesByPriority(categoryGames);
};

// 获取精选游戏 - 从 siteConfig.json 的 featuredGames 字段获取
export const getFeaturedGames = () => {
  const featuredGameIds = siteConfig.homepage.featuredGames || [];
  const featuredGames = gamesData.games.filter(game => featuredGameIds.includes(game.id));
  return sortGamesByPriority(featuredGames);
};

// 获取流行游戏 - 从 siteConfig.json 的 popularGames 字段获取
export const getPopularGames = () => {
  const popularGameIds = siteConfig.homepage.popularGames || [];
  const popularGames = gamesData.games.filter(game => popularGameIds.includes(game.id));
  return sortGamesByPriority(popularGames);
};

// 获取相关游戏 - 从 games.json 中每个游戏的 relatedGameIds 字段获取
export const getRelatedGames = (gameId, excludeId = null) => {
  const game = gamesData.games.find(g => g.id === gameId);
  if (!game || !game.relatedGameIds) {
    return [];
  }
  
  const relatedGames = gamesData.games.filter(g => 
    game.relatedGameIds.includes(g.id) && g.id !== excludeId
  );
  return sortGamesByPriority(relatedGames);
};

// 搜索游戏
export const searchGames = (query) => {
  const searchTerm = query.toLowerCase();
  const searchResults = gamesData.games.filter(game =>
    game.title.toLowerCase().includes(searchTerm) ||
    game.description.toLowerCase().includes(searchTerm) ||
    game.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
  return sortGamesByPriority(searchResults);
};

// 获取推荐游戏 - 使用简单的确定性排序
export const getRandomGames = (count = 6, excludeId = null) => {
  const games = gamesData.games.filter(game => game.id !== excludeId);
  
  // 简单的确定性排序，按ID排序后取前几个，避免复杂的哈希计算
  const sorted = games.sort((a, b) => a.id.localeCompare(b.id));
  
  return sorted.slice(0, count);
};

// 分类相关函数
export const getAllCategories = () => {
  return categoriesData.categories;
};

export const getCategoryById = (id) => {
  return categoriesData.categories.find(category => category.id === id);
};

export const getCategoryBySlug = (slug) => {
  return categoriesData.categories.find(category => category.slug === slug);
};

export const getTopLevelCategories = () => {
  return categoriesData.categories.filter(category => category.isTopLevel);
};

// 站点配置 - 使用模板配置系统
export const getSiteConfig = () => {
  const templateConfig = getTemplateConfig();
  return {
    ...siteConfig.site,
    name: templateConfig.site.name,
    shortName: templateConfig.site.shortName,
    description: templateConfig.site.description,
    url: templateConfig.site.url,
    ogImage: templateConfig.branding.ogImage,
    contactEmail: templateConfig.site.contactEmail
  };
};

export const getHomepageConfig = () => {
  const templateConfig = getTemplateConfig();
  return {
    ...siteConfig.homepage,
    mainGame: templateConfig.site.mainGameId
  };
};

export const getNavigationConfig = () => {
  return siteConfig.navigation;
};

export const getSEOConfig = () => {
  const templateConfig = getTemplateConfig();
  return {
    googleAnalyticsId: templateConfig.seo.googleAnalyticsId
  };
};

export const getFooterConfig = () => {
  return siteConfig.footer;
};

// 生成游戏页面的元数据
export const generateGameMetadata = (game) => {
  const seoConfig = getSEOConfig();
  return {
    title: `${game.title} - Play ${game.title} Online Free`,
    description: game.description,
    openGraph: {
      title: game.title,
      description: game.description,
      type: 'website',
      images: [
        {
          url: game.thumbnail,
          width: 800,
          height: 600,
          alt: `${game.title} thumbnail`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: game.title,
      description: game.description,
      images: [game.thumbnail]
    }
  };
};

// 生成分类页面的元数据
export const generateCategoryMetadata = (category) => {
  return {
    title: `${category.name} - Free Online ${category.name}`,
    description: category.description,
    openGraph: {
      title: category.name,
      description: category.description,
      type: 'website'
    }
  };
};

// 格式化播放次数
export const formatPlayCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

// 格式化评分
export const formatRating = (rating) => {
  return rating.toFixed(1);
};

// 生成星级评分
export const generateStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    full: fullStars,
    half: hasHalfStar ? 1 : 0,
    empty: emptyStars
  };
};

// 简化的游戏排序函数
export const sortGamesByPriority = (games) => {
  const hotGames = siteConfig.homepage.hotGames || [];
  const newGames = siteConfig.homepage.newGames || [];
  
  return games.sort((a, b) => {
    // 优先级：先Hot游戏，再New游戏，最后按播放次数排序
    const aIsSpecial = hotGames.includes(a.id) || newGames.includes(a.id);
    const bIsSpecial = hotGames.includes(b.id) || newGames.includes(b.id);
    
    if (aIsSpecial !== bIsSpecial) {
      return bIsSpecial - aIsSpecial;
    }
    
    // 按播放次数排序
    return b.playCount - a.playCount;
  });
};

// 获取 Geometry Dash 系列游戏
export const getGeometryDashGames = () => {
  const geometryDashGames = gamesData.games.filter(game => game.category === 'geometry-dash');
  return sortGamesByPriority(geometryDashGames);
};

// 获取侧边栏推荐游戏 - 同系列游戏 + 热门游戏的组合
export const getSidebarRecommendedGames = (mainGameId, count = 8) => {
  const mainGame = getGameById(mainGameId);
  if (!mainGame) return getRandomGames(count);

  // 先获取同系列游戏（相关游戏）
  const relatedGames = getRelatedGames(mainGameId, mainGameId);
  
  // 如果同系列游戏不够，补充热门游戏
  if (relatedGames.length >= count) {
    return relatedGames.slice(0, count);
  }
  
  // 获取热门游戏来补充，排除已有的游戏
  const hotGameIds = siteConfig.homepage.hotGames || [];
  const existingIds = [mainGameId, ...relatedGames.map(g => g.id)];
  const additionalHotGames = gamesData.games
    .filter(game => hotGameIds.includes(game.id) && !existingIds.includes(game.id))
    .slice(0, count - relatedGames.length);
  
  return [...relatedGames, ...additionalHotGames];
};

// 获取分类游戏预览 - 每个顶级分类显示几个代表游戏
export const getCategoryPreviewGames = (categoryId, count = 4) => {
  const categoryGames = getGamesByCategory(categoryId);
  return categoryGames.slice(0, count);
};

// 获取首页"更多游戏"区域的游戏 - 简化排序逻辑
export const getMoreGamesForHomepage = (excludeGameIds = [], count = 12) => {
  // 排除指定的游戏ID
  const availableGames = gamesData.games.filter(game => !excludeGameIds.includes(game.id));
  
  // 按播放次数降序排序，简单且有意义
  const sorted = availableGames.sort((a, b) => b.playCount - a.playCount);
  
  return sorted.slice(0, count);
}; 