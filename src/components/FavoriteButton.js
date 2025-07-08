'use client';

import React, { useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { BUTTON_SIZES } from '../constants/styles';
import { isFeatureEnabled } from '../utils/templateConfig';

const FavoriteButton = ({ 
  game, 
  size = 'medium', 
  showText = true, 
  className = '' 
}) => {
  // Don't render if favorites feature is disabled
  if (!isFeatureEnabled('enableFavorites')) {
    return null;
  }

  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e) => {
    e.preventDefault(); // 防止触发父元素的点击事件
    e.stopPropagation();

    if (!isLoaded || !game) return;

    setIsAnimating(true);
    toggleFavorite(game);

    // 动画完成后重置状态
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // 如果数据还在加载中，显示占位符
  if (!isLoaded) {
    return (
      <div className={`animate-pulse bg-gray-200 dark:bg-slate-700 rounded ${getSizeClasses(size).container} ${className}`} />
    );
  }

  const isCurrentlyFavorite = isFavorite(game?.id);
  const sizeClasses = getSizeClasses(size);

  return (
    <button
      onClick={handleClick}
      className={`
        favorite-button
        inline-flex items-center justify-center
        ${sizeClasses.container}
        ${isCurrentlyFavorite 
          ? 'text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300' 
          : 'text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400'
        }
        transition-all duration-200 ease-in-out
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded
        ${isAnimating ? 'animate-bounce' : ''}
        ${className}
      `}
      title={isCurrentlyFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={isCurrentlyFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {/* 心形图标 */}
      <svg
        className={`${sizeClasses.icon} transition-all duration-200 ${
          isCurrentlyFavorite ? 'fill-current' : 'stroke-current fill-none'
        }`}
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>

      {/* 文本（可选） */}
      {showText && (
        <span className={`${sizeClasses.text} font-medium`}>
          {isCurrentlyFavorite ? 'Favorited' : 'Favorite'}
        </span>
      )}
    </button>
  );
};

// 根据尺寸获取CSS类
const getSizeClasses = (size) => {
  return BUTTON_SIZES[size] || BUTTON_SIZES.medium;
};

// 简化的图标版本
export const FavoriteIcon = ({ game, className = '' }) => {
  return (
    <FavoriteButton 
      game={game} 
      size="custom" 
      showText={false} 
      className={className} 
    />
  );
};

// 带计数的收藏按钮
export const FavoriteButtonWithCount = ({ game, className = '' }) => {
  const { getFavoritesCount } = useFavorites();
  const count = getFavoritesCount();

  return (
    <div className="relative">
      <FavoriteButton game={game} size="medium" showText={false} className={className} />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
};

export default FavoriteButton; 