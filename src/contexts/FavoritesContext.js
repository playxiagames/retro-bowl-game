'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { trackFavorite } from '../utils/analytics';

const FavoritesContext = createContext();

// 本地存储键名
const FAVORITES_STORAGE_KEY = 'geometry-dash-favorites';

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 从localStorage加载收藏数据
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          // 验证数据格式
          if (Array.isArray(parsedFavorites)) {
            setFavorites(parsedFavorites);
          }
        }
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
        // 如果数据损坏，清除localStorage
        localStorage.removeItem(FAVORITES_STORAGE_KEY);
      } finally {
        setIsLoaded(true);
      }
    };

    loadFavorites();
  }, []);

  // 保存收藏数据到localStorage
  const saveFavorites = (newFavorites) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  };

  // 添加游戏到收藏
  const addToFavorites = (game) => {
    if (!game || !game.id) return false;
    
    const isAlreadyFavorite = favorites.some(fav => fav.id === game.id);
    if (isAlreadyFavorite) return false;

    // 创建收藏项目，只保存必要信息
    const favoriteItem = {
      id: game.id,
      slug: game.slug,
      title: game.title,
      thumbnail: game.thumbnail,
      category: game.category,
      rating: game.rating,
      addedAt: new Date().toISOString()
    };

    const newFavorites = [...favorites, favoriteItem];
    saveFavorites(newFavorites);

    // 发送分析事件
    trackFavorite('add', game.title);

    return true;
  };

  // 从收藏中移除游戏
  const removeFromFavorites = (gameId) => {
    if (!gameId) return false;

    const gameToRemove = favorites.find(fav => fav.id === gameId);
    const newFavorites = favorites.filter(fav => fav.id !== gameId);
    saveFavorites(newFavorites);

    // 发送分析事件
    if (gameToRemove) {
      trackFavorite('remove', gameToRemove.title);
    }

    return true;
  };

  // 切换收藏状态
  const toggleFavorite = (game) => {
    if (!game || !game.id) return false;
    
    const isCurrentlyFavorite = isFavorite(game.id);
    
    if (isCurrentlyFavorite) {
      return removeFromFavorites(game.id);
    } else {
      return addToFavorites(game);
    }
  };

  // 检查游戏是否已收藏
  const isFavorite = (gameId) => {
    return favorites.some(fav => fav.id === gameId);
  };

  // 获取收藏数量
  const getFavoritesCount = () => {
    return favorites.length;
  };

  // 清除所有收藏
  const clearAllFavorites = () => {
    saveFavorites([]);
  };

  // 导出收藏数据
  const exportFavorites = () => {
    try {
      const dataStr = JSON.stringify(favorites, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `geometry-dash-favorites-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error('Error exporting favorites:', error);
      return false;
    }
  };

  // 导入收藏数据
  const importFavorites = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (Array.isArray(importedData)) {
            // 合并导入的数据和现有数据，避免重复
            const mergedFavorites = [...favorites];
            let addedCount = 0;

            importedData.forEach(item => {
              if (item.id && !mergedFavorites.some(fav => fav.id === item.id)) {
                mergedFavorites.push({
                  ...item,
                  addedAt: item.addedAt || new Date().toISOString()
                });
                addedCount++;
              }
            });

            saveFavorites(mergedFavorites);
            resolve({ success: true, addedCount, totalCount: mergedFavorites.length });
          } else {
            reject(new Error('Invalid file format'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  // 获取按分类分组的收藏
  const getFavoritesByCategory = () => {
    const grouped = {};
    favorites.forEach(game => {
      const category = game.category || 'other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(game);
    });
    return grouped;
  };

  // 搜索收藏的游戏
  const searchFavorites = (query) => {
    if (!query.trim()) return favorites;
    
    const searchTerm = query.toLowerCase().trim();
    return favorites.filter(game => 
      game.title.toLowerCase().includes(searchTerm) ||
      game.category?.toLowerCase().includes(searchTerm)
    );
  };

  const value = {
    // 状态
    favorites,
    isLoaded,
    
    // 操作方法
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    
    // 实用方法
    getFavoritesCount,
    clearAllFavorites,
    exportFavorites,
    importFavorites,
    getFavoritesByCategory,
    searchFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// 自定义Hook
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

// 导出Context供高级用法
export { FavoritesContext }; 