import { getAllGames, getAllCategories } from '../utils/gameData';

export default function sitemap() {
  const baseUrl = 'https://geometry-dash-lite.org';
  const currentDate = new Date();
  
  // 获取所有游戏和分类数据
  const games = getAllGames();
  const categories = getAllCategories();
  
  // 计算内容最后更新时间的逻辑
  const getContentLastModified = (type, data = null) => {
    switch (type) {
      case 'homepage':
        // 首页：如果有新游戏或热门游戏更新，认为首页也更新了
        return currentDate;
        
      case 'all-games':
        // 游戏列表页：如果游戏数据有更新，这个页面也算更新
        return currentDate;
        
      case 'static-info':
        // 信息类静态页面：相对稳定，使用较早的日期但不是固定的
        // 使用当前时间往前推30天，模拟相对稳定的更新频率
        const thirtyDaysAgo = new Date(currentDate);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return thirtyDaysAgo;
        
      case 'legal':
        // 法律页面：更新频率较低，使用较早的日期
        const ninetyDaysAgo = new Date(currentDate);
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
        return ninetyDaysAgo;
        
      case 'sitemap':
        // 站点地图页面：每次构建都可能更新
        return currentDate;
        
      case 'game':
        // 游戏页面：优先使用游戏数据中的更新时间
        if (data && data.updatedAt) {
          return new Date(data.updatedAt);
        }
        // 如果游戏数据没有更新时间，使用相对较近的时间
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return sevenDaysAgo;
        
      case 'category':
        // 分类页面：如果该分类下有游戏更新，认为分类页面也更新了
        return currentDate;
        
      default:
        return currentDate;
    }
  };
  
  // 静态页面 - 按重要性和更新频率设置
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: getContentLastModified('homepage'),
      changeFrequency: 'daily',
      priority: 1.0, // 首页最高优先级
    },
    {
      url: `${baseUrl}/all-games/`,
      lastModified: getContentLastModified('all-games'),
      changeFrequency: 'daily',
      priority: 0.9, // 游戏列表页高优先级
    },
    {
      url: `${baseUrl}/favorites/`,
      lastModified: getContentLastModified('static-info'),
      changeFrequency: 'weekly',
      priority: 0.7, // 收藏页面较高优先级
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: getContentLastModified('static-info'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: getContentLastModified('static-info'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified: getContentLastModified('legal'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: getContentLastModified('legal'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/sitemap/`,
      lastModified: getContentLastModified('sitemap'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 动态游戏页面 - 基于游戏受欢迎程度和评分优化priority
  const gamePages = games.map((game) => {
    // 计算动态priority：基于评分、播放次数和是否为特色游戏
    let gamePriority = 0.7; // 基础priority
    
    // 根据评分调整 (4.5+ 高评分)
    if (game.rating >= 4.7) {
      gamePriority += 0.1;
    } else if (game.rating >= 4.5) {
      gamePriority += 0.05;
    }
    
    // 根据播放次数调整 (高人气游戏)
    if (game.playCount >= 1000000) {
      gamePriority += 0.1;
    } else if (game.playCount >= 500000) {
      gamePriority += 0.05;
    }
    
    // 主推游戏额外加权
    if (game.slug === 'geometry-dash-lite' || 
        game.slug === 'geometry-dash' || 
        game.slug === 'dinosaur-game') {
      gamePriority += 0.1;
    }
    
    // 确保priority不超过0.95 (保留首页的1.0)
    gamePriority = Math.min(gamePriority, 0.95);
    
    return {
      url: `${baseUrl}/games/${game.slug}/`,
      lastModified: getContentLastModified('game', game),
      changeFrequency: 'weekly', // 游戏页面可能会更新描述、添加新功能等
      priority: Number(gamePriority.toFixed(2)),
    };
  });

  // 动态分类页面 - 基于分类中的游戏数量和受欢迎程度
  const categoryPages = categories.map((category) => {
    // 获取该分类下的游戏数量
    const categoryGameCount = games.filter(game => game.category === category.id).length;
    
    // 基于游戏数量和分类重要性设置priority
    let categoryPriority = 0.6; // 基础priority
    
    // 根据游戏数量调整
    if (categoryGameCount >= 20) {
      categoryPriority += 0.2;
    } else if (categoryGameCount >= 10) {
      categoryPriority += 0.1;
    } else if (categoryGameCount >= 5) {
      categoryPriority += 0.05;
    }
    
    // 重要分类额外加权
    if (category.id === 'geometry-dash' || category.id === 'google-games') {
      categoryPriority += 0.1;
    }
    
    // 确保priority合理
    categoryPriority = Math.min(categoryPriority, 0.9);
    categoryPriority = Math.max(categoryPriority, 0.5);
    
    return {
      url: `${baseUrl}/category/${category.slug}/`,
      lastModified: getContentLastModified('category', category),
      changeFrequency: 'weekly',
      priority: Number(categoryPriority.toFixed(2)),
    };
  });

  // 合并所有页面并按priority排序
  const allPages = [
    ...staticPages,
    ...gamePages,
    ...categoryPages,
  ];

  // 按priority从高到低排序，相同priority按URL字母顺序
  return allPages.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority; // 降序
    }
    return a.url.localeCompare(b.url); // 字母顺序
  });
} 