'use client';

// 基础骨架屏组件
export const Skeleton = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4',
  rounded = 'rounded',
  animate = true
}) => {
  return (
    <div 
      className={`${width} ${height} ${rounded} ${animate ? 'skeleton' : 'bg-gray-200 dark:bg-slate-700'} ${className}`}
    />
  );
};

// 游戏卡片骨架屏
export const GameCardSkeleton = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden ${className}`}>
      {/* 游戏图片骨架屏 */}
      <div className="relative">
        <Skeleton 
          width="w-full" 
          height={size === 'small' ? 'h-24' : size === 'large' ? 'h-48' : 'h-36'} 
          rounded="rounded-t-lg" 
        />
        {/* 评分徽章骨架屏 */}
        <div className="absolute top-2 right-2">
          <Skeleton width="w-12" height="h-5" rounded="rounded-full" />
        </div>
      </div>
      
      {/* 游戏信息骨架屏 */}
      <div className="p-3 space-y-2">
        {/* 标题 */}
        <Skeleton width="w-4/5" height="h-4" />
        {/* 描述 */}
        <Skeleton width="w-full" height="h-3" />
        <Skeleton width="w-2/3" height="h-3" />
        
        {/* 标签 */}
        {size !== 'small' && (
          <div className="flex gap-2 mt-2">
            <Skeleton width="w-16" height="h-5" rounded="rounded-full" />
            <Skeleton width="w-12" height="h-5" rounded="rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

// 游戏播放器骨架屏
export const GamePlayerSkeleton = ({ className = '' }) => {
  return (
    <div className={`game-player-container ${className}`}>
      {/* 游戏标题头部骨架屏 */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Skeleton width="w-48" height="h-6" />
            <div className="flex items-center space-x-2">
              <Skeleton width="w-12" height="h-4" />
              <Skeleton width="w-16" height="h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 游戏播放器区域骨架屏 */}
      <div className="relative">
        <Skeleton 
          width="w-full" 
          height="h-80 sm:h-96" 
          rounded="rounded-lg"
          className="relative overflow-hidden"
        >
          {/* 添加闪光效果 */}
          <div className="absolute inset-0 skeleton-shimmer" />
          
          {/* 播放按钮骨架屏 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton width="w-16" height="h-16" rounded="rounded-full" />
          </div>
          
          {/* 加载文本骨架屏 */}
          <div className="absolute bottom-4 left-4">
            <Skeleton width="w-24" height="h-4" />
          </div>
        </Skeleton>

        {/* 控制栏骨架屏 */}
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-b-lg px-4 py-3 mt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton width="w-20" height="h-4" />
              <div className="flex items-center space-x-2">
                <Skeleton width="w-16" height="h-3" />
                <Skeleton width="w-16" height="h-3" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Skeleton width="w-8" height="h-8" rounded="rounded" />
              <Skeleton width="w-8" height="h-8" rounded="rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 侧边栏游戏项目骨架屏
export const SidebarGameItemSkeleton = ({ className = '' }) => {
  return (
    <div className={`flex items-center space-x-3 p-2 ${className}`}>
      {/* 游戏图片骨架屏 */}
      <Skeleton width="w-20 sm:w-24 lg:w-32" height="h-12 sm:h-16 lg:h-20" rounded="rounded-md" />
      
      {/* 游戏信息骨架屏 */}
      <div className="flex-1 min-w-0 space-y-1">
        <Skeleton width="w-4/5" height="h-4" />
        <div className="flex items-center space-x-2">
          <Skeleton width="w-8" height="h-3" />
          <Skeleton width="w-12" height="h-3" />
        </div>
      </div>
    </div>
  );
};

// 游戏网格骨架屏
export const GameGridSkeleton = ({ 
  count = 6, 
  title = true,
  gridCols = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  className = '' 
}) => {
  return (
    <div className={`games-grid ${className}`}>
      {/* 标题骨架屏 */}
      {title && (
        <div className="flex items-center justify-between mb-6">
          <Skeleton width="w-48" height="h-8" />
          <Skeleton width="w-20" height="h-6" />
        </div>
      )}
      
      {/* 游戏卡片网格骨架屏 */}
      <div className={`grid ${gridCols} gap-4`}>
        {Array.from({ length: count }, (_, index) => (
          <GameCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

// 游戏描述骨架屏
export const GameDescriptionSkeleton = ({ hideTitle = false, className = '' }) => {
  return (
    <div className={`game-description bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 ${className}`}>
      <div className="w-full mx-auto space-y-4">
        
        {/* 游戏标题骨架屏 */}
        {!hideTitle && (
          <div className="mb-4 space-y-2">
            <Skeleton width="w-3/5" height="h-8" />
            <Skeleton width="w-full" height="h-4" />
            <Skeleton width="w-4/5" height="h-4" />
          </div>
        )}

        {/* 游戏统计骨架屏 */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton width="w-24" height="h-6" rounded="rounded-full" />
          <Skeleton width="w-28" height="h-6" rounded="rounded-full" />
          <Skeleton width="w-20" height="h-6" rounded="rounded-full" />
        </div>

        {/* 游戏标签骨架屏 */}
        <div className="space-y-2">
          <Skeleton width="w-16" height="h-4" />
          <div className="flex flex-wrap gap-2">
            <Skeleton width="w-12" height="h-5" rounded="rounded-full" />
            <Skeleton width="w-16" height="h-5" rounded="rounded-full" />
            <Skeleton width="w-14" height="h-5" rounded="rounded-full" />
            <Skeleton width="w-18" height="h-5" rounded="rounded-full" />
          </div>
        </div>

        {/* 操作说明骨架屏 */}
        <div className="space-y-2">
          <Skeleton width="w-20" height="h-4" />
          <div className="space-y-1">
            <Skeleton width="w-full" height="h-3" />
            <Skeleton width="w-5/6" height="h-3" />
            <Skeleton width="w-4/5" height="h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}; 